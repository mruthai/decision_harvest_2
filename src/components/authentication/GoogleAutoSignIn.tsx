import React, {useContext} from 'react'
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../context/AuthProvider'

interface GoogleAutoSignInProps {
    signInGoogle: string;
}

const GoogleAutoSignIn:React.FC<GoogleAutoSignInProps> = ({signInGoogle}) => {
    const { 
          signInWithGoogle
        
        } = useContext(AuthContext)

  return (
    <div className="border-blue-500 rounded-lg border-2 flex justify-center">
    <button className="flex flex-row justify-center items-center gap-3 px-3 py-4" onClick={signInWithGoogle}>{signInGoogle} <FcGoogle /></button>

  </div>
  )
}

export default GoogleAutoSignIn