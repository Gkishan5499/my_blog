import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'

const Signup = () => {
  const [formData, SetFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate= useNavigate();

  const handleChange = (e) => {
    SetFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill all the fields');
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),

      });
      const data = await res.json();
      if(data.success===false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        return navigate('/sign-in');
      }

    } catch (err) {
      setErrorMessage(err.message);
      setLoading(false);
    }

  }
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
          <form className='flex flex-col gap-5'  onSubmit={handleSubmit}>
            <div>
              <Label value='Your Username' />
              <TextInput type='text' placeholder='Username' id='username' onChange={handleChange} />

            </div>

            <div>
              <Label value='Your Email' />
              <TextInput type='email' placeholder='name@domain.com' id='email' onChange={handleChange} />

            </div>

            <div>
              <Label value='Your Password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
            </div>

            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
             {
              loading? <><Spinner/><span className='pl-3'>Loading..</span></>:'Sign-Up'
             }
              
            </Button>

          </form>

          <div>
            <p className='text-sm mt-5'>
              <span>Already have an account? </span><Link to='/sign-in' className='text-blue-600'>Sign-in</Link></p>
          </div>
        
           <div>
            {
              errorMessage && (<Alert className='mt-5' color='failure'>{errorMessage}</Alert>)
            }
           </div>
        </div>


      </div>

    </div>

  )
}

export default Signup