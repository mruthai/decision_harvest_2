import React from 'react'
import NavBarLoggedIn from '../components/navbar/NavBarLoggedIn'
import CornPost from "../components/calcuations/CornPost"

const CornHistory:React.FC = () => {
  return (
    <div>
      <NavBarLoggedIn /> 
      <CornPost />
    </div>
  )
}

export default CornHistory