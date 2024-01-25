import React from 'react'
import Commodities from '../components/displayApi/Commodities'
import Corn from '../components/calcuations/Corn'
import NavBarLoggedIn from '../components/navbar/NavBarLoggedIn'

const Dashboard:React.FC = () => {

  return (
    <div className="h-screen w-auto"> 
      <NavBarLoggedIn />
      
      <div className="flex md:flex-row flex-col justify-center mt-20">
      <Commodities />
      <Corn />

      </div>
      </div>

  )
}
export default Dashboard