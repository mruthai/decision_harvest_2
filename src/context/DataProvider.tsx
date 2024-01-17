import React, { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { getFirestore, collection, query, getDocs, addDoc, DocumentSnapshot, Timestamp } from "@firebase/firestore";
import { Firestore, doc, deleteDoc } from "firebase/firestore";
import axios from "axios";

import { User } from "firebase/auth";

export type CommodityDataItem = {
  date: string;
  value: string;
};

export type CommodityData = {
  data: CommodityDataItem[];
};


export interface CornItem {
  id?: string; // This assumes 'id' is a string, adjust as needed
  cornValue: number;
  cornBushel: number;
  dateCreated: Timestamp;
  cornStock: number;
}

type DataContextValue = {
  cornData: CommodityData | null;
  loading: boolean;
  corn: CornItem[];
  setCorn: React.Dispatch<React.SetStateAction<CornItem[]>>;
  addCorn: (cornBushel: number, cornValue: number, cornStock: number, user: User) => Promise<CornItem | null>;
  deleteCorn: (
    userUid: string,
    cornUid: string,
    corns: CornItem[],
    setCorns: React.Dispatch<React.SetStateAction<CornItem[]>>
  ) => Promise<void>;
  user: User | null; // Add the 'user' property to DataContextValue
};



export const DataContext = createContext<DataContextValue | undefined>(
  undefined
);

type DataProviderProps = {
  children: ReactNode;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [cornData, setCornData] = useState<CommodityData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [corn, setCorn] = useState<CornItem[]>([]);
  const db = getFirestore();
  const { user, userId } = useContext(AuthContext)
  const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

  async function fetchOrUpdateData() {
    // Check if data is already stored in local storage
    const storedData = localStorage.getItem("apiData");
    const storedTimestamp = localStorage.getItem("apiDataTimestamp");

    if (storedData && storedTimestamp) {
      // Calculate the difference in days between the current date and the stored timestamp
      const currentDate: Date = new Date();
      const storedDate: Date = new Date(storedTimestamp);
      const daysSinceLastUpdate = Math.floor(
        (currentDate.getTime() - storedDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLastUpdate < 1) {
        // Use the stored data if it's less than 1 day old
        return JSON.parse(storedData);
      }
    }

    // Fetch fresh data from the API
    const url = `https://www.alphavantage.co/query?function=Corn&interval=monthly&apikey=${API_KEY}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      // Convert string values to numbers
      const numericData: CommodityData = {
        data:
          data?.data.map((item: CommodityDataItem) => ({
            date: item.date,
            value: parseFloat(item.value),
          })) || [],
      };

      // Store the new data in local storage with the current timestamp
      localStorage.setItem("apiData", JSON.stringify(numericData));
      localStorage.setItem("apiDataTimestamp", new Date().toISOString());

      // Return the new data
      return numericData;
    } catch (error) {
      console.error("Error fetching data from the API:", error);
      throw error;
    }
  }

  useEffect(() => {
    setLoading(true);

    // Call the fetchOrUpdateData function when the component mounts
    fetchOrUpdateData()
      .then((data) => {
        setCornData(data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addCorn: DataContextValue['addCorn'] = async (cornBushel, cornValue, cornStock, user) => {
    try {
      if (!user || !user.uid) {
        console.error('User not logged in or missing user ID. Cannot add corn.');
        return null;
      }
  
      const newCorn: CornItem = {
        cornValue,
        cornBushel,
        dateCreated: Timestamp.now(),
        cornStock,
      };
  
      const docRef = await addDoc(collection(db, 'users', user.uid, 'corns'), newCorn);
  
      newCorn.id = docRef.id;
  
      setCorn((prevCorn) => [...prevCorn, newCorn]);

  
      window.location.reload();
  
      return newCorn;
    } catch (error) {
      console.error('Error adding corn:', error);
      throw error;
    }
  };
  

  useEffect(() => {
    async function getCorn() {
      try {
        if (!user || !user.uid) {
          console.error('User not logged in or missing user ID. Cannot fetch corn data.');
          return;
        }
  
        const postQuery = query(collection(db as Firestore, 'users', userId || '', 'corns'));
        const querySnapshot = await getDocs(postQuery);
        const loadedCorn: CornItem[] = [];
  
        querySnapshot.forEach((doc: DocumentSnapshot) => {
          const cornItem = doc.data() as CornItem; // Adjust the type based on your actual data type
          loadedCorn.push(cornItem);
        });
  
        setCorn(loadedCorn);
        console.log(loadedCorn);
      } catch (error) {
        console.error('Error fetching corn from Firestore:', error);
      }
    }
  
    // Check if the user is logged in before trying to fetch corn data
    if (user && user.uid) {
      getCorn();
    } else {
      console.warn('User not logged in. Cannot fetch corn data.');
    }
  }, [userId, user, setCorn]);

  async function deleteCorn(
    userUid: string,
    cornUid: string,
    corns: CornItem[], 
    setCorns: React.Dispatch<React.SetStateAction<CornItem[]>>
  ): Promise<void> {
    try {
      if (!user || !user.uid) {
        console.error('User not logged in or missing user ID. Cannot delete corn data.');
        return;
      }
      const docRef = doc(db, `users/${userUid}/corns/${cornUid}`);
      await deleteDoc(docRef);
  
     
      const updatedCorns = corns.filter(corn => corn.id !== cornUid);
      setCorns(updatedCorns);
  
      console.log('Document successfully deleted.');
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  }
  
  

  const value: DataContextValue = {
    cornData,
    loading,
    addCorn,
    corn,
    setCorn,
    deleteCorn,
    user
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
