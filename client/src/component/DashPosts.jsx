import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal, ModalBody, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import { TbAlertSquare } from 'react-icons/tb'

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPost, setUserPost] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [postToIdDelete, setPostToIdDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPost(data.posts);
          if (data.posts.id > 5) {
            setShowMore(false);
          }
        }
      }
      catch (error) {
        console.log(error.message);
      }
    }
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowmore = async () => {
    const startIndex = userPost.length;

    try {

      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserPost((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 8) {
          setShowMore(false);
        }
      }

    } catch (error) {
      next(error);
    }
  }

   const handleDeletePost = async()=>{
     setShowModel(false);
     try{
        const res = await fetch(`/api/post/deletepost/${postToIdDelete}/${currentUser._id}`,{
          method:'DELETE',

        },
      );
        const data = await res.json();
        if(!res.ok){
           console.log(data.message);
        }
        else{
            setUserPost((prev)=> prev.filter((post)=>post._id !== postToIdDelete));

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
        currentUser.isAdmin && userPost.length > 0 ?
          (
            <>
              <Table hoverable className='shadow-md'>
                <TableHead>
                  <TableHeadCell>Date Update</TableHeadCell>
                  <TableHeadCell>Post Title</TableHeadCell>
                  <TableHeadCell>Post Image</TableHeadCell>
                  <TableHeadCell>Category</TableHeadCell>
                  <TableHeadCell>Delete</TableHeadCell>
                  <TableHeadCell>
                    <span>Edit</span>
                  </TableHeadCell>

                </TableHead>

                {
                  userPost.map((post) => (
                    <TableBody>
                      <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-900'>
                        <TableCell>
                          {new Date(post.updatedAt).toLocaleDateString()}
                        </TableCell>

                        <TableCell>
                          <Link className='font-medium text-gray-800 dark:text-white' to={`/post/${post.slug}`}>{post.title} </Link>
                        </TableCell>

                        <TableCell>
                          <Link to={`/post/${post.slug}`}>
                            <img
                              src={post.image}
                              alt={post.title}
                              className='w-20 h-20 object-cover'
                            />
                          </Link>
                        </TableCell>

                        <TableCell>
                          {post.category}
                        </TableCell>

                        <TableCell>
                          <span onClick={()=>{
                            setShowModel(true); 
                            setPostToIdDelete(post._id);
                            }}
                            className='text-red-500 
                                font-medium 
                                hover:underline 
                                cursor-pointer'>
                            Delete
                          </span>
                        </TableCell>

                        <TableCell>
                          <Link className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
                            <span>Edit</span>
                          </Link>
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
                         dark:text-gray-100 mb-5'>Are you sure you want to delete your post</p>

            <div className='flex justify-center gap-5'>
              <Button color='failure' onClick={handleDeletePost}>
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

export default DashPosts