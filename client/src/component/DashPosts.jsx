import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react'

const DashPosts = () => {
  const {currentUser} = useSelector((state)=>state.user);
  const [userPost, setUserPost]= useState([]);
  console.log(userPost);
    useEffect (()=>{
      const fetchPosts= async()=>{
        try{
        const res= await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if(res.ok){
             setUserPost(data.posts);
        }
        }
        catch(error){
               console.log(error.message);
        }
      } 
      if(currentUser.isAdmin){
        fetchPosts();
      }
    },[currentUser._id])
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-4 scrollbar
     scrollbar-track-slate-50 scrollbar-thumb-slate-200 dark:scrollbar-track-slate-700
      dark:scrollbar-thumb-slate-500'>
        {
          currentUser.isAdmin && userPost.length > 0 ? 
          (
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
                  userPost.map((post)=>(
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
                                <span className='text-red-500 font-medium hover:underline cursor-pointer'>Delete</span>
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
          ):
          (<p>You have no post</p>)

        }
    </div>
  )
}

export default DashPosts