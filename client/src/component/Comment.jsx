import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';
import { TbAlertSquare } from 'react-icons/tb';

const Comment = ({comment, onLike, onEdit, onDelete }) => {
    const {currentUser } = useSelector((state) => state.user);
    const [user, setUser] = useState({});
    const [editedContent, setEditedContent] = useState(comment.content);
    // const [deleteComment, setDeleteComment] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

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
        getUser();
    }, [comment]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    }

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: editedContent,
                }),

            });

            if (res.ok) {
                setIsEditing(false);
                onEdit(comment, editedContent);

            }

        } catch (error) {
            console.log(error.message);
        }
    }




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
                {
                    isEditing ? (
                        <>
                            <Textarea
                                className='mb-4'
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                            />
                            <div className='flex gap-2 justify-end text-xs'>
                                <Button
                                    type='submit'
                                    size='sm'
                                    gradientDuoTone='purpleToBlue'
                                    onClick={handleSave}>
                                    Save
                                </Button>

                                <Button
                                    type='submit'
                                    size='sm'
                                    gradientDuoTone='purpleToBlue'
                                    outline
                                    onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </>

                    ) :

                        (
                            <>
                                <p className='text-sm  pb-2 text-gray-500 dark:text-gray-400 '>
                                    {comment.content}</p>

                                <div className='flex items-center gap-3 border-t dark:border-gray-600 max-w-fit pt-2 '>
                                    <button type='submit' onClick={() => onLike(comment._id)}
                                        className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'
                                            }`}>

                                        <FaThumbsUp className='text-sm' />
                                    </button>

                                    <p className='text-xs text-gray-400'>
                                        {
                                            comment.numberOfLikes > 0 && comment.numberOfLikes + " " +
                                            (comment.numberOfLikes === 1 ? 'like' : 'likes')
                                        }
                                    </p>
                                    {
                                        currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                            <button onClick={handleEdit} className='text-gray-400 text-sm hover:text-blue-500'>
                                                Edit
                                            </button>

                                        )
                                    }
                                    {
                                        currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                            <button onClick={() =>onDelete(comment._id)} className='text-gray-400 text-sm hover:text-red-800'>
                                                Delete
                                            </button>
                                        )
                                    }

                                </div>
                            </>

                        )
                }


            </div>


        </div>
    )
}

export default Comment