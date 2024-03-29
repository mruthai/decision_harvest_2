import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Link } from 'react-router-dom'
import GoogleAutoSignIn from './GoogleAutoSignIn'

const Login:React.FC = () => {
  const { 
    handleSubmitSignIn,
    setEmail,
    setPassword,
    error
  
  } = useContext(AuthContext)
  
  return (
    <form className="max-w-[700px] md:mx-auto mx-3 my-16 md:p-4 p-6 border rounded-lg " onSubmit={handleSubmitSignIn}>
        <div className="flex flex-col justify-center items-center">
        <h2 className="font-semibold text-lg">
          Login to your account
        </h2>
        <p>Don't have an account?<Link to='/signup' className="underline text-blue-500"> Sign up</Link> </p>
      </div>
    <div className='flex flex-col py-2'>
      <label className='py-2 font-medium'>Email Address</label>
      <input
        id="email address"
        onChange={(e) => setEmail(e.target.value)}
        className='border p-3'
        type='email'
        placeholder="email address"
        autoComplete="email address"
      />
    </div>
    <div className='flex flex-col py-2'>
      <label className='py-2 font-medium'>Password</label>
      <input
        id= "password" 
        onChange={(e) => setPassword(e.target.value)}
        className='border p-3'
        type="password"
        placeholder="Password required"
        autoComplete="current-password"
      />
     {error && <p className="text-center text-red-600">{error}</p>}
    </div>
    <button className='rounded-lg bg-red-600 hover:bg-gray-500 w-full p-4 my-7 text-white'>
      Sign In
    </button>
    <GoogleAutoSignIn
    signInGoogle='Login with' />
  </form>
    
  )
}

export default Login