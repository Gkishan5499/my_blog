import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {Button, Textarea} from 'flowbite-react';

const CommentSection = ({postId}) => {
    const{currentUser} = useSelector((state)=>state.user);
    const [comment, setComment] = useState('');
    console.log(comment);

  return (
    <div className='max-w-4xl mx-auto w-full'>
        {
         currentUser? (
                 <div className='flex gap-2 items-center text-gray-500 text-sm '>
                    <p>Signed in as :</p>
                    <img src={currentUser.profilePictures} alt={currentUser.username}
                        className='w-8 h-8 rounded-full object-cover'
                    />
                    <Link to={'/dashboard?tab=profile'} className=' font-medium
                     text-teal-500 hover:underline'>
                        @{currentUser.username}
                    </Link>
                 </div>
         ) :
         (
            <div>
                <p>You must to sign in to comment 
                <Link to={'/sign-in'} className='text-blue-500'>Sign-in</Link></p> 
            </div>
         )
        }
        {
          currentUser && (
            <form className='p-3 border border-teal-500 rounded-md mt-3'>
              <Textarea
               row='3'
               placeholder='Write a comment'
               maxLength='200'
               value={comment}
               onChange={(e)=>setComment(e.target.value)}
              />
              <div className='mt-2 flex justify-between '>
                <p className='text-gray-500 text-sm'>{200-comment.length} character remaining</p>
                <Button gradientDuoTone='purpleToBlue' outline>
                  Submit
                </Button>
              </div>
            </form>
          )
        }
    </div>
  )
}

export default CommentSection
