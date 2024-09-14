import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';

const Signin = () => {
  const [formData, SetFormData] = useState({});
  const {loading ,error:errorMessage} = useSelector(state=>state.user);
  const navigate= useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    SetFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all fields'));
    }

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),

      });
      const data = await res.json();
      if(data.success===false){
        dispatch(signInFailure(data.message));
      }
      
      if(res.ok){
        dispatch(signInSuccess(data));
        return navigate('/');
      }

    } catch (err) {
      dispatch(signInFailure(err.message));
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
              <Label value='Your Email' />
              <TextInput type='email' placeholder='name@domain.com' id='email' onChange={handleChange} />

            </div>

            <div>
              <Label value='Your Password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
            </div>

            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
             {
              loading? <><Spinner/><span className='pl-3'>Loading..</span></>:'Sign-In'
             }
              
            </Button>

          </form>

          <div>
            <p className='text-sm mt-5'>
              <span>Don't have an account? </span><Link to='/sign-up' className='text-blue-600'>Sign-up</Link></p>
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

export default Signin