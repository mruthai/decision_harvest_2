import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider";



const CornPost: React.FC = () => {
  const contextValue = useContext(DataContext);

  if (!contextValue || contextValue.cornData === null) {
    return (
      <p>Error: Data context is not available or commodityData is null.</p>
    );
  }
  const { corn, deleteCorn } = contextValue;

const handleDeleteCorn = (cornUid: string) => {
  console.log("Attempting to delete corn with Corn ID:", cornUid); 
    if (contextValue && contextValue.user) {
      console.log("Deleting corn with IDs - User ID:", contextValue.user.uid, "Corn ID:", cornUid); // Debugging line
      deleteCorn(
        contextValue.user.uid,
        cornUid,
        contextValue.corn,
        contextValue.setCorn
      );
    }
};


  return (
    <div className="cornPost_Table flex items-center justify-center">
     
        <table className="hidden md:table w-full mx-20 rounded-lg overflow-hidden shadow-lg my-5">
          <thead className="text-white">
            <tr className="bg-gray-900 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
              <th className="p-3 text-left">$ Stock Value</th>
              <th className="p-3 text-left">Bushel Amount</th>
              <th className="p-3 text-left">Corn value</th>
              <th className="p-3 text-left">Date of Submission</th>
              <th className="p-3 text-left">Remove Submission</th>
            </tr>
          </thead>
          <tbody className="flex-1 sm:flex-none">
            {corn.map((cornItem, index) => (
             
              <tr
                key={index}
                className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                <td className="border px-4 py-2">{cornItem.cornStock}</td>
                <td className="border px-4 py-2">{cornItem.cornBushel}</td>
                <td className="border px-4 py-2">{cornItem.cornValue}</td>
                <td className="border px-4 py-2">
                  {cornItem.dateCreated.toDate().toString()}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                    onClick={() => handleDeleteCorn(cornItem.id || "")}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    
      <div className="md:hidden">
        {corn.map((cornItem, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg my-5">
            <div className="font-bold text-lg mb-2">Corn Details</div>
            <p>
              <strong>Stock Value:</strong> {cornItem.cornStock}
            </p>
            <p>
              <strong>Bushel Amount:</strong> {cornItem.cornBushel}
            </p>
            <p>
              <strong>Corn Value:</strong> {cornItem.cornValue}
            </p>
            <p>
              <strong>Date of Submission:</strong>{" "}
              {cornItem.dateCreated.toDate().toString()}
            </p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
              onClick={() => handleDeleteCorn(cornItem.id || "")}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CornPost;
