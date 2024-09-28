import { Button, Textarea, TextInput } from 'flowbite-react';
import React from 'react'
import { useSelector } from 'react-redux'

const ProfileSidebar = () => {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className='max-w-lg mx-auto p-3 w-ful'>
         <h1 className='my-6 text-3xl text-center font-semibold'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <div className='w-32 h-32 self-center shadow-md rounded-full overflow-hidden cursor-pointer'>
                    <img src={currentUser.profilePicter} alt="user"
                        className='rounded-full w-full h-full border-8 border-[lightgray] object-cover' />
                </div>

                <TextInput 
                type="text" 
                id='username'
                placeholder='username'
                defaultValue={currentUser.username}
                />

               <TextInput 
                type="email" 
                id='email'
                placeholder='email'
                defaultValue={currentUser.email}
                />

               <TextInput 
                type="password" 
                id='password'
                placeholder='Password'
                
                />
              <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>

            </form>
            <div className='text-red-500 flex justify-between mt-3'>
                 <span className='cursor-pointer'>Delete Account</span>
                 <span className='cursor-pointer'>Logout</span>

            </div>

        </div>
    )
};

export default ProfileSidebar