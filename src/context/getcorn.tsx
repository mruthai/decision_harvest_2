// import { AuthContext } from "./AuthProvider";
// import { getFirestore, collection, query, getDocs, DocumentSnapshot } from "@firebase/firestore";
// import { Firestore } from "firebase/firestore";


 // const [corn, setCorn] = useState<number[]>([]);
  // const { user, userId } = useContext(AuthContext);
  // const db = getFirestore();

  // useEffect(() => {
  //   async function getCorn() {
  //     try {
  //       if (!user) {
  //         console.error('User not logged in. Cannot fetch corn data.');
  //         return;
  //       }
  //       const postQuery = query(collection(db as Firestore, 'users', userId || '', 'corns'));
  //       const querySnapshot = await getDocs(postQuery);
  //       const loadedCorn: number[] = [];

  //       querySnapshot.forEach((doc: DocumentSnapshot) => {
  //         loadedCorn.push({
  //           id: doc.id,
  //           uid: doc.ref.parent.parent?.id || '',
  //           ...doc.data(),
  //         } as unknown as number);
  //       });

  //       setCorn(loadedCorn);
  //       console.log(loadedCorn);
  //     } catch (error) {
  //       console.error('Error fetching corn from Firestore:', error);
  //     }
  //   }

  //   if (user) {
  //     getCorn();
  //   } else {
  //     console.error('User not logged in. Cannot fetch corn data.');
  //   }
  // }, [userId, user, setCorn]);


  // const getStockData = async (API_KEY: string): Promise<void> => {
  //   try {
  //     const response = await fetch(`https://www.alphavantage.co/query?function=Corn&interval=monthly&apikey=${API_KEY}`);
    
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
    
  //     const { data } = await response.json();
      
  //     // Assuming "value" is a property in your CornData
  //     const firstDataItem = data.length > 0 ? data[0] : null;
  //     const stockValue = firstDataItem ? parseFloat(firstDataItem.value) : null;
  
  //     // Update only the "data" property in the stockData
  //     setStockData((prevData) => ({
  //       ...prevData,
  //       data: [
  //         {
  //           date: firstDataItem?.date || "", // Provide the appropriate date here
  //           value: stockValue !== null ? stockValue.toString() : "", // Convert to string or provide a default
  //         },
  //       ],
  //     }));
  //   } catch (error) {
  //     console.error("Error getting stock data from API: ", error);
  //     throw error;
  //   }
  // };
  

//   useEffect(() => {
//     async function fetchData() {
//         try {
//             const data = await getStockData(API_KEY)
//             setStockData(data)
//             console.log(data)
//             setLoading("LOADED")
//         } catch (err) {
//             console.error(err)
//         }
//     }
//     fetchData()
// }, [])

// useEffect(() => {
//   setLoading(true);
//   const url = `https://www.alphavantage.co/query?function=Corn&interval=monthly&apikey=${API_KEY}`;
//   axios.get(url).then((response) => {
//     const dataWithNumberValues: CommodityData = {
//       ...response.data,
//       data: response.data.data.map((item: CommodityDataItem) => ({
//         ...item,
//         value: parseFloat(item.value), 
//       })),
//     };
//     setCommodityData(dataWithNumberValues);
//     setLoading(false);
//   });
// }, []);

    // const handleCornSubmit = async (e: React.FormEvent) => {
    //   e.preventDefault();
  
    //   if (cornInput === undefined) {
    //     console.error('Error: Corn input is undefined.');
    //     return;
    //   }
  
    //   const newCorn = await addCorn(
    //     cornInput,
    //     Math.round((parseFloat(cornData.data[0].value) * 0.0254 * cornInput + Number.EPSILON) * 100) / 100,

    //     Math.round(parseFloat(cornData.data[0].value) * 0.0254 * 100) / 100

    //   );
  
    //   setCornInput(undefined);
    //   console.log(newCorn, "added corn value");
    // };


    /* 
    import React, { createContext, ReactNode, useState, useEffect } from "react";
// useContext
// import { AuthContext } from "./AuthProvider";
// import { getFirestore, collection, query, getDocs, addDoc, DocumentSnapshot, Timestamp } from "@firebase/firestore";
// import { Firestore } from "firebase/firestore";
import axios from "axios";
// import { User } from "firebase/auth";

export type CommodityDataItem = {
  date: string;
  value: string;
};

export type CommodityData = {
  data: CommodityDataItem[];
};

// export interface CornItem {
//   id?: string; // assuming id is string
//   cornValue: number;
//   cornBushel: number;
//   dateCreated: Timestamp;
//   cornStock: number;
// }

type DataContextValue = {
  cornData: CommodityData | null;
  loading: boolean;
  currentDate: Date;
  storedDate: Date;

  // corn: CornItem[];
  // setCorn: React.Dispatch<React.SetStateAction<CornItem[]>>;
  // addCorn: (cornBushel: number, cornValue: number, cornStock: number, user: User) => Promise<CornItem | null>;
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
  // const [corn, setCorn] = useState<CornItem[]>([]);
  // const db = getFirestore();
  // const { user, userId } = useContext(AuthContext)

  const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

  useEffect(() => {
    setLoading(true);
    const url = `https://www.alphavantage.co/query?function=Corn&interval=monthly&apikey=${API_KEY}`;
    axios.get(url).then((response) => {
      const data = response.data;
      // Convert string values to numbers
      const numericData: CommodityData = {
        data:
          data?.data.map((item: CommodityDataItem) => ({
            date: item.date,
            value: parseFloat(item.value),
          })) || [],
      };

      setCornData(numericData);
      setLoading(false);
    });
  }, []);

  async function fetchOrUpdateData() {
    // Check if data is already stored in local storage
    const storedData = localStorage.getItem("apiData");
    const storedTimestamp = localStorage.getItem("apiDataTimestamp");

    if (storedData && storedTimestamp) {
      // Calculate the difference in days between the current date and the stored timestamp
      const currentDate: Date = new Date();
      const storedDate: Date = new Date(storedTimestamp);
      const daysSinceLastUpdate = Math.floor(
        (currentDate - storedDate) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLastUpdate < 30) {
        // Use the stored data if it's less than 30 days old
        return JSON.parse(storedData);
      }
    }

    // Fetch fresh data from the API
    const url = `https://www.alphavantage.co/query?function=Corn&interval=monthly&apikey=${API_KEY}`;
    const response = await axios.get(url);
    const newData = response.data;

    // Store the new data in local storage with the current timestamp
    localStorage.setItem("apiData", JSON.stringify(newData));
    localStorage.setItem("apiDataTimestamp", new Date().toISOString());

    // Return the new data
    return newData;
  }

  const addCorn = async (cornBushel: number, cornValue: number, cornStock: number) => {
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

      setCorn((prevCorn) => [...(prevCorn || []), newCorn.cornValue]);

      window.location.reload();

      return newCorn;
    } catch (error) {
      console.error('Error adding corn:', error);
      throw error;
    }
  };
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
    corn,
    setCorn
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

    
    */