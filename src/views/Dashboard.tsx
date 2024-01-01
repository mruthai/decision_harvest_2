import React, {useContext} from 'react'
import { AuthContext } from '../context/AuthProvider'
import Commodities from '../components/displayApi/Commodities'
import Corn from '../components/calcuations/Corn'

import NavBarLoggedIn from '../components/navbar/NavBarLoggedIn'

const Dashboard:React.FC = () => {
  const {  user } = useContext(AuthContext)





  return (
    <div className="h-screen w-auto"> 
      <NavBarLoggedIn />
      <p>{user && user.email}</p>
      <Commodities />
      <Corn />
      </div>

  )
}
export default Dashboard