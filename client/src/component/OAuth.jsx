import React from 'react'
import {Button} from 'flowbite-react'
import { AiFillGoogleCircle } from "react-icons/ai";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase.js'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
   const auth = getAuth(app);
   const dispatch = useDispatch();
   const navigate = useNavigate();


   const handleGoogleClick = async()=>{
    const provider= new GoogleAuthProvider();
      provider.setCustomParameters({prompt:'select_account'});

      try {
     
        const result= await signInWithPopup(auth, provider);
        const res = await fetch('/api/auth/google', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            name:result.user.displayName,
            email:result.user.email,
            photo:result.user.photoURL,
          })
        });
        const data= await res.json();
        if(res.ok){
          dispatch(signInSuccess(data));
          navigate('/');
        }

        console.log(result);        
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <>
        <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>Continue with Google
        </Button>
    </>
  )
}

export default OAuth