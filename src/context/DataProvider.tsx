import React, { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { getFirestore, collection, query, getDocs, addDoc, DocumentSnapshot, Timestamp } from "@firebase/firestore";
import { Firestore } from "firebase/firestore";
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
};

export const DataContext = createContext<DataContextValue | undefined>(undefined);

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
  
  useEffect(() => {
    setLoading(true);
    const url = `https://www.alphavantage.co/query?function=Corn&interval=monthly&apikey=${API_KEY}`;
    axios.get(url).then((response) => {
      const data = response.data;
      // Convert string values to numbers
      const numericData: CommodityData = {
        data: data?.data.map((item: CommodityDataItem) => ({ 
          date: item.date,
          value: parseFloat(item.value),
        })) || [],
      };

      setCornData(numericData);
      setLoading(false);
    });
  }, []); 

  // const addCorn = async (cornBushel: number, cornValue: number, cornStock: number) => {
  //   try {
  //     if (!user || !user.uid) {
  //       console.error('User not logged in or missing user ID. Cannot add corn.');
  //       return null;
  //     }

  //     const newCorn: CornItem = {
  //       cornValue,
  //       cornBushel,
  //       dateCreated: Timestamp.now(),
  //       cornStock,
  //     };

  //     const docRef = await addDoc(collection(db, 'users', user.uid, 'corns'), newCorn);

  //     newCorn.id = docRef.id;

  //     setCorn((prevCorn) => [...(prevCorn || []), newCorn.cornValue]);

  //     window.location.reload();

  //     return newCorn;
  //   } catch (error) {
  //     console.error('Error adding corn:', error);
  //     throw error;
  //   }
  // };
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
  


  const value: DataContextValue = {
    cornData,
    loading,
    addCorn,
    corn,
    setCorn
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
