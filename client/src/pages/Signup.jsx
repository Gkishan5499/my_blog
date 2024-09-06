import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Label, TextInput} from 'flowbite-react'

const Signup = () => {
  return (
    <div className='min-h-screen mt-20'>

    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
      {/* left */}
      <div className='flex-1'>
      <Link to='/' className='text-4xl font-bold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded' >Gautam's</span>
                Blog
            </Link>

            <p className='text-sm mt-5'>This is a blog website where you can signin with email or google account.   </p>
      </div>
      {/* right */}
      <div className='flex-1'>
      <form className='flex flex-col gap-5'>
        <div>
          <Label value='Your Username'/>
            <TextInput type='text' placeholder='Username' id='username'/>
          
        </div>

       <div>
          <Label value='Your Email'/>
            <TextInput type='text' placeholder='name@domain.com' id='email'/>
         
        </div>

        <div>
          <Label value='Your Password'/>
            <TextInput type='text' placeholder='Password' id='password'/>         
        </div>
           
           <Button gradientDuoTone='purpleToPink' type='submit'>Sign-up</Button>

     </form>
     
       <div>
        <p className='text-sm mt-5'>
        <span>Already have an account? </span><Link to='/sign-in' className='text-blue-600'>Sign-in</Link></p>
       </div>

      </div>
    </div>
    
    </div>

  )
}

export default Signup