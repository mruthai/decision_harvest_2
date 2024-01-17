import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider";

const Commodities: React.FC = () => {
  const contextValue = useContext(DataContext);

  if (!contextValue || contextValue.cornData === null) {
    return (
      <p>Error: Data context is not available or commodityData is null.</p>
    );
  }
// pulling props from DataProvider
  const { cornData, loading } = contextValue;

  return (
    <div className="flex flex-col justify-center items-center">
      {loading ? (
        <p>Fetching commodity data...</p>
      ) : (
        <div className="border rounded-lg max-w-screen-md mx-auto p-4">
          <h2 className="text-center md:text-xl text-base font-bold p-2">
            Past Month Average Commodity Price
          </h2>
          {cornData.data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded shadow-md ">
                <tbody>
                  <tr className="border-b">
                    <th className="text-start px-6 py-4 whitespace-nowrap bg-slate-600 text-slate-50">
                      Commodity Type
                    </th>
                    <td className="text-start px-6 py-4 whitespace-nowrap">
                      Corn
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="text-start px-6 py-4 whitespace-nowrap bg-slate-600 text-slate-50">
                      Past Market Value
                    </th>
                    <td className="text-start px-6 py-4 whitespace-nowrap">
                      ${" "}
                      {/* dollar amount of corn per metric ton divided by () */}
                      {Math.round(
                        parseFloat(cornData.data[0].value) * 0.0254
                      ).toFixed(2)}
                    </td>
                  </tr>

                  <tr>
                    <th className="text-start px-6 py-4 whitespace-nowrap bg-slate-600 text-slate-50">
                      Units
                    </th>
                    <td className="text-start px-6 py-4 whitespace-nowrap">
                      Per Bushel
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p>No commodity data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Commodities;
