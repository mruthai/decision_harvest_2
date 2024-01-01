import React, {useContext} from 'react'
import { DataContext } from '../../context/DataProvider'

const CornPost:React.FC = () => {
    const contextValue = useContext(DataContext);
  
    if (!contextValue || contextValue.cornData === null) {
      return <p>Error: Data context is not available or commodityData is null.</p>;
    }
  
    const { corn } = contextValue;
  return (
    <div>
         <table>
                <thead>
                    <tr>
                        <th>Stock Value</th>
                        <th>Bushel Amount</th>
                        <th>Corn value</th>
                        <th>Date of Submission</th>
                        <th>Remove Submission</th>
                    </tr>
                </thead>
                <tbody>
                    {corn.map((cornItem, index) => (
                        <tr key={index}>
                            <td>{cornItem.cornStock}</td>
                            <td>{cornItem.cornBushel}</td>
                            <td>{cornItem.cornValue}</td>
                            <td>{cornItem.dateCreated.toDate().toString()}</td>
                         
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

export default CornPost