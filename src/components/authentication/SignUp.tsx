import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Link } from 'react-router-dom'

const SignUp:React.FC = () => {
    const { 
      handleSubmitNewUser,
        setEmail,
        setPassword,
        error
      
      } = useContext(AuthContext)

  return (
    <form className="max-w-[700px] md:mx-auto mx-3 my-16 md:p-4 p-6 border rounded-lg " onSubmit={handleSubmitNewUser}>
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-semibold text-lg">
          Sign up to create an account
        </h2>
        <p>Already have an account?<Link to='/login' className="underline text-blue-500"> Login</Link> </p>
      </div>
        <div className='flex flex-col justify-center  py-2'>
          <label className='py-2 font-medium'>Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className='border p-3 rounded-lg'
            type='email'
            placeholder="Enter your email address"
          />
        </div>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='border p-3 rounded-lg'
            type='password'
            placeholder="Minimum 6 characters"
          />
          {error && <p className="text-center text-red-600">{error}</p>}
        </div>
        <button className='rounded-lg bg-gray-600 hover:bg-gray-500 w-full p-4 my-7 text-white'>
          Sign Up
        </button>
      </form>
  )
}

export default SignUp