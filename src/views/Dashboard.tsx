import React from 'react'
import Commodities from '../components/displayApi/Commodities'
import Corn from '../components/calcuations/Corn'
import NavBarLoggedIn from '../components/navbar/NavBarLoggedIn'
import USCornGraph from '../components/graph/USCornGraph'

const Dashboard:React.FC = () => {

  return (
    <div className="h-screen w-auto"> 
      <NavBarLoggedIn />
      
      <div className="flex md:flex-row flex-col justify-center mt-20">
      <Commodities />
      <Corn />

      </div>
      <div className="flex justify-center mx-auto md:w-3/5 w-auto my-20 p-10">

      <USCornGraph/>
      </div>
      </div>

  )
}
export default Dashboard