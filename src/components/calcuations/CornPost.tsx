import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { AuthContext } from "../../context/AuthProvider";

const CornPost: React.FC = () => {
  const contextValue = useContext(DataContext);
  const { user } = useContext(AuthContext);

  if (!contextValue || contextValue.cornData === null) {
    return (
      <p>Error: Data context is not available or commodityData is null.</p>
    );
  }

  const { corn, deleteCorn } = contextValue;
  const handleDeleteCorn = (cornUid: string) => {
    if (contextValue && contextValue.user) {
      deleteCorn(contextValue.user.uid, cornUid, contextValue.corn, contextValue.setCorn);
    }
  };
  

  return (
    <div>
      <p>{user && user.email}</p>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Stock Value</th>
              <th className="px-4 py-2">Bushel Amount</th>
              <th className="px-4 py-2">Corn value</th>
              <th className="px-4 py-2">Date of Submission</th>
              <th className="px-4 py-2">Remove Submission</th>
            </tr>
          </thead>
          <tbody>
            {corn.map((cornItem, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{cornItem.cornStock}</td>
                <td className="border px-4 py-2">{cornItem.cornBushel}</td>
                <td className="border px-4 py-2">{cornItem.cornValue}</td>
                <td className="border px-4 py-2">
                  {cornItem.dateCreated.toDate().toString()}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                    onClick={() => handleDeleteCorn(cornItem.id || "")}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CornPost;
