import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Modal, ModalBody, ModalHeader, Textarea } from 'flowbite-react';
import Comment from './Comment.jsx';
import { TbAlertSquare } from 'react-icons/tb';

const CommentSection = ({ postId }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [showModel,setShowModel] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentToDelete , setCommentToDelete] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {

      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);

      }

    } catch (error) {
      setCommentError(error.message);
    }

  }

  useEffect(() => {
    const getComments = async () => {
      try {

        const res = await fetch(`/api/comment/getpostComment/${postId}`);
        const data = await res.json();
        if (res.ok) {
          setComments(data);
        }

      } catch (error) {
        console.log(error);
      }

    }
    getComments();
  },[postId]);

  const handleLike = async(commentId)=>{
    try{
      if(!currentUser){
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likesComment/${commentId}`, {
        method:'PUT',
      })
      const data = await res.json();
      if(res.ok){
         setComments(comments.map((comment) =>
          comment._id === commentId ? {
            ...comment, 
            likes: data.likes,
            numberOfLikes : data.likes.length
          } : comment

         ));
      }

   }
    catch(error){
      console.log(error.message);
    }
  }
const handleEdit = async(comment, editedContent)=>{
         setComments(
           comments.map((c)=>{
             c._id === comment._id ? {...c , content: editedContent} : c 
           })
         );
       }

const handleDeleteComment = async(commentId)=>{
  setShowModel(false);
  try {
    if(!currentUser){
          navigate('/sign-in');
          return;
    }
    const res = await fetch(`/api/comment/deleteComment/${commentId}`,{
      method:'DELETE'
    });
    if(res.ok){
      const data = await res.json();
      setComments(comments.filter((comment)=>comment._id !== commentId));
    }
    
    
  } catch (error) {
    console.log(error.message);
  }
}

  return (
    <div className='max-w-4xl mx-auto w-full'>
      {
        currentUser ? (
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
            <div className='flex gap-4'>
              <p>You must to sign in to comment </p>
                <span><Link to={'/sign-in'} className='text-blue-500'>Sign-in</Link></span> 
            </div>
          )
      },


      {
        currentUser && (
          <form className='p-3 border border-teal-500 rounded-md mt-3' onSubmit={handleSubmit}>
            <Textarea
              row='3'
              placeholder='Write a comment'
              maxLength='200'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className='mt-2 flex justify-between '>
              <p className='text-gray-500 text-sm'>{200 - comment.length} character remaining</p>
              <Button type='submit' gradientDuoTone='purpleToBlue' outline >
                Submit
              </Button>
            </div>
            {
              commentError && <Alert color='failure' className='mt-5'>{commentError}</Alert>
            }

          </form>
        )
      }
      
        {
          (comments.length === 0) ?(
           <div>
             No Comments yet
           </div>
          ): 
          (
           <div className='mt-5'>
           <div className='text-sm flex gap-2 items-center'>
           <p>Comments</p>
           <div className='py-1 px-2 border border-gray-300'>{comments.length}</div>
           </div>
            {
              comments.map((comment)=>(
                
                   <Comment 
                   key={comment._id} 
                   comment={comment}
                   onLike={handleLike}
                   onEdit={handleEdit} 
                   onDelete={(commentId)=>{
                    setShowModel(true);
                    setCommentToDelete(commentId);
                   }}
                   /> 
                 
              ))

            }
          
          </div>
          )
        }

        <Modal
        show={showModel}
        onClose={() => setShowModel(false)}
        popup
        size='md'
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <TbAlertSquare className='w-14 h-14 text-gray-400
                     dark:text-gray-200 mb-5 mx-auto'/>
            <p
              className='text-lg text-center
                         text-gray-500
                         dark:text-gray-100 mb-5'>Are you sure you want to delete your comment</p>

            <div className='flex justify-center gap-5'>
              <Button color='failure' onClick={()=>handleDeleteComment(commentToDelete)}>
                Yes, I'm Sure
              </Button>

              <Button color='gray' onClick={() => setShowModel(false)}>No, Cancel</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>



    </div>
  )
};
  
export default CommentSection
