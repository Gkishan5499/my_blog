import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal, ModalBody, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import { TbAlertSquare } from 'react-icons/tb'

const Dashcomments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [commentToIdDelete, setCommentToIdDelete] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          console.log(data.comments);
          if (data.comments.id > 5) {
            setShowMore(false);
          }
        }
      }
      catch (error) {
        console.log(error.message);
      }
    }
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowmore = async () => {
    const startIndex = comments.length;

    try {

      const res = await fetch(`/api/comment/getcomments?&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 8) {
          setShowMore(false);
        }
      }

    } catch (error) {
      next(error);
    }
  }

   const handleDeleteComment = async()=>{
     setShowModel(false);
     try{
        const res = await fetch(`/api/comment/deleteComment/${commentToIdDelete}`,{
          method:'DELETE',

        },
      );
        const data = await res.json();
        if(!res.ok){
           console.log(data.message);
        }
        else{
            setComments((prev)=> prev.filter((comment)=>comment._id !== commentToIdDelete));

        }
     }
     catch(error){
      console.log(error.message);
     }
   }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-4 scrollbar
     scrollbar-track-slate-50 scrollbar-thumb-slate-200 dark:scrollbar-track-slate-700
      dark:scrollbar-thumb-slate-500'>
      {
        currentUser.isAdmin && comments.length > 0 ?
          (
            <>
              <Table hoverable className='shadow-md'>
                <TableHead>
                  <TableHeadCell>Date Created</TableHeadCell>
                  <TableHeadCell>Comment Content</TableHeadCell>
                  <TableHeadCell>Number of likes</TableHeadCell>
                  <TableHeadCell>Post Id </TableHeadCell>
                  <TableHeadCell>User Id</TableHeadCell>

                  <TableHeadCell>Delete</TableHeadCell>

                </TableHead>

                {
                  comments.map((comment) => (
                    <TableBody className='divide-y' key={comment._id}>
                      <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-900'>
                        <TableCell>
                          {new Date(comment.updatedAt).toLocaleDateString()}
                        </TableCell>

                        <TableCell>
                          {comment.content}
                        </TableCell>
                        <TableCell>
                          {comment.numberOfLikes}
                        </TableCell>

                        <TableCell>
                          {comment.postId}
                        </TableCell>

                        <TableCell>
                          {comment.userId}
                        </TableCell>
 
                        <TableCell>
                          <span onClick={()=>{
                            setShowModel(true); 
                            setCommentToIdDelete(comment._id);
                            }}
                            className='text-red-500 
                                font-medium 
                                hover:underline 
                                cursor-pointer'>
                            Delete
                          </span>
                        </TableCell>

                       

                      </TableRow>

                    </TableBody>

                  ))
                }
              </Table>
              {
                showMore && (
                  <button onClick={handleShowmore} className='w-full text-teal-500  self-center py-7'>
                    Show More
                  </button>
                )
              }
            </>
          ) :
          (<p>You have no post</p>)

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
              <Button color='failure' onClick={handleDeleteComment}>
                Yes, I'm Sure
              </Button>

              <Button color='gray' onClick={() => setShowModel(false)}>No, Cancel</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>



    </div>
  )
}

export default Dashcomments