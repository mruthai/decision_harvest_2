import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Link } from 'react-router-dom'

const Login:React.FC = () => {
  const { 
    handleSignIn,
    setEmail,
    setPassword,
  
  } = useContext(AuthContext)
  
  return (
    <form className="max-w-[700px] md:mx-auto mx-3 my-16 md:p-4 p-6 border rounded-lg " onSubmit={handleSignIn}>
        <div className="flex flex-col justify-center items-center">
        <h2 className="font-semibold text-lg">
          Login to your account
        </h2>
        <p>Don't have an account?<Link to='/signup' className="underline text-blue-500"> Sign up</Link> </p>
      </div>
    <div className='flex flex-col py-2'>
      <label className='py-2 font-medium'>Email Address</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        className='border p-3'
        type='email'
        placeholder="email address"
      />
    </div>
    <div className='flex flex-col py-2'>
      <label className='py-2 font-medium'>Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        className='border p-3'
        type='password'
        placeholder="Password"
      />
    </div>
    <button className='rounded-lg bg-red-600 hover:bg-gray-500 w-full p-4 my-7 text-white'>
      Sign In
    </button>
  </form>
    
  )
}

export default Login