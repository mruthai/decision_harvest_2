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