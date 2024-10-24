import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from 'react-redux';



const Comment = ({ comment, onLike}) => {
    const { currentUser } = useSelector((state) => state.user);
    const [user, setUser] = useState({});
    console.log(user);
    useEffect(() => {
        const getUser = async () => {

            try {

                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }


            } catch (error) {
                console.log(error.message);
            }
        }
        getUser()


    }, [comment])



    return (
        <div className='flex p-4 border-b dark:border-gray-100 shadow-sm '>
            <div className='flex-shrink-0 mr-3'>
                <img src={user.profilePictures} alt={user.username}
                    className='w-10 h-10 bg-gray-400 rounded-full object-cover' />
            </div>

            <div className='flex-1'>
                <div className='flex items-center mb-1'>
                    <span className='text-xs font-bold mr-2 truncate '>
                        {user ? '@' + (user.username) : "anonumas"}
                    </span>
                    <span className='text-xs'>{moment(comment.createdAt).fromNow()}</span>
                </div>

                <p className='text-sm  pb-2 text-gray-500 dark:text-gray-400 '>
                {comment.content}</p>

                 <div className='flex items-center gap-3 border-t dark:border-gray-600 max-w-fit pt-2 '>
                    <button type='submit' onClick={()=>onLike(comment._id)}  
                    className={`text-gray-400 hover:text-blue-500 ${
                       currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'
                         }`}>
                        
                     <FaThumbsUp className='text-sm'/>
                    </button>

                    <p className='text-xs text-gray-400'>
                        {
                            comment.numberOfLikes > 0 && comment.numberOfLikes+ " "+
                            (comment.numberOfLikes === 1 ? 'like':'likes')
                        }
                    </p>
                 </div>
            </div>

        </div>
    )
}

export default Comment