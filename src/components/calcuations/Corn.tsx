import React, {useContext, useState} from "react";
import { DataContext } from "../../context/DataProvider";
import { AuthContext } from "../../context/AuthProvider";



const Corn: React.FC = () => {
    const { user } = useContext(AuthContext)
    const contextValue = useContext(DataContext);
  
    if (!contextValue || contextValue.cornData === null) {
      return <p>Error: Data context is not available or commodityData is null.</p>;
    }
  
    const { cornData, addCorn } = contextValue;
    const [cornInput, setCornInput] = useState<number | undefined>(undefined);
  

  
    const handleCornSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (cornInput === undefined) {
        console.error('Error: Corn input is undefined.');
        return;
      }
  
      if (!user || !user.uid) {
        console.error('User not logged in or missing user ID. Cannot submit corn.');
        return;
      }
  
      const newCorn = await addCorn(
        cornInput,
        Math.round((parseFloat(cornData.data[0].value) * 0.0254 * cornInput + Number.EPSILON) * 100) / 100,
        Math.round(parseFloat(cornData.data[0].value) * 0.0254 * 100) / 100,
        user
      );
  
      setCornInput(undefined);
      console.log(newCorn, "added corn value");
    };

    return (
      <div className="p-10 flex flex-col justify-center items-center">
        <form className="p-4 border rounded-lg bg-slate-400" onSubmit={handleCornSubmit}>
          <h3 className="mb-5">Calculate Value of your Corn in Bushels</h3>
          <input
            type="number"
            onChange={(e) => setCornInput(parseFloat(e.target.value) || undefined)}
            value={cornInput || ''}
            />
          <button className="bg-red-400 px-4 rounded-lg ml-4" type="submit">Submit</button>
        </form>
      </div>
    );
  };
  
  export default Corn;
  