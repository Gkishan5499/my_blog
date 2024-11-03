import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi'
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { Link } from 'react-router-dom';

const DashboardComp = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [totalUsers, setTotalUsers] = useState([]);
    const [totalPost, setTotalPost] = useState([]);
    const [totalComments, setTotalComments] = useState([]);
    const [lastMonthUser, setLastMonthUser] = useState([]);
    const [lastMonthPost, setLastMonthPost] = useState([]);
    const [commentsInLastMonth, setCommentsInLastMonth] = useState([]);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/user/getusers?limit=5`);
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    setTotalUsers(data.totalUsers);
                    setLastMonthUser(data.lastMonthUser);
                }
            } catch (error) {
                console.log(error.message);
            }

        }
        const fetchPosts = async () => {

            try {

                const res = await fetch(`/api/post/getposts?limit=5`);
                const data = await res.json();
                if (res.ok) {
                    setPosts(data.posts);
                    setTotalPost(data.totalPost);
                    setLastMonthPost(data.lastMonthPost);
                }


            } catch (error) {
                console.log(error.message);
            }

        }
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comment/getcomments?limit=5`);
                const data = await res.json();
                if (res.ok) {
                    setComments(data.comments);
                    setTotalComments(data.totalComments);
                     setCommentsInLastMonth(data.commentsInLastMonth)
                }
            } catch (error) {
                console.log(error.message);
            }


        }

        if (currentUser.isAdmin) {
            fetchUsers();
            fetchPosts();
            fetchComments();
        }



    }, [currentUser])

return (
  <div className='p-3 md:mx-auto'>
    <div className='flex-wrap flex gap-4'>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 shadow-md md:w-72 w-full rounded-md'>
                <div className='flex justify-between '>
                    <div className=''>
                        <h1 className='text-gray-500 text-md uppercase font-medium'>Total User</h1>
                        <p className='text-3xl'>{totalUsers}</p>

                    </div>

                    <HiOutlineUserGroup className='bg-teal-500 text-white text-5xl
                   rounded-full p-2 shadow-md'/>
                </div>
                <div className='flex gap-2 text-sm'>
                    <span className='text-green-300 flex items-center'>
                        <HiArrowNarrowUp />
                        {lastMonthUser.length}
                    </span>
                    <div className='text-gray-500'>Last Month</div>
                </div>

            </div>

            <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 shadow-md md:w-72 w-full rounded-md'>
                <div className='flex justify-between '>
                    <div className=''>
                        <h1 className='text-gray-500 text-md uppercase font-medium'>Total Posts</h1>
                        <p className='text-3xl'>{totalPost}</p>

                    </div>

                    <HiDocumentText className='bg-green-600 text-white text-5xl
                   rounded-full p-2 shadow-md'/>
                </div>
                <div className='flex gap-2 text-sm'>
                    <span className='text-green-300 flex items-center'>
                        <HiArrowNarrowUp />
                        {lastMonthPost}
                    </span>
                    <div className='text-gray-500'>Last Month</div>
                </div>

            </div>

            <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 shadow-md md:w-72 w-full rounded-md'>
                <div className='flex justify-between '>
                    <div className=''>
                        <h1 className='text-gray-500 text-md uppercase font-medium'>Total Comments</h1>
                        <p className='text-3xl'>{totalComments}</p>

                    </div>

                    <HiAnnotation className='bg-purple-600 text-white text-5xl
                   rounded-full p-2 shadow-md'/>
                </div>
                <div className='flex gap-2 text-sm'>
                    <span className='text-green-300 flex items-center'>
                        <HiArrowNarrowUp />
                        {commentsInLastMonth.length }
                    </span>
                    <div className='text-gray-500'>Last Month</div>
                </div>

            </div>
        </div>
            
        <div className='flex flex-wrap py-4 gap-4 mx-auto'>
                <div className='flex flex-col w-full md:w-auto p-2 rounded shadow-md dark:bg-gray-800'>
                    <div className='flex justify-between p-3 text-sm font-semibold'>
                       <h1>Recent Users</h1>
                       <Button outline gradientDuoTone='purpleToPink'>
                        <Link to={'/dashboard?tab=users'}>See More</Link>
                       </Button>
                    </div>
                    <Table hoverable>
                        <TableHead>
                            <TableHeadCell> User Image</TableHeadCell>
                            <TableHeadCell> User Name</TableHeadCell>

                        </TableHead>
                        {
                            users && users.map((user)=>(
                                <TableBody key={user._id} className='divide-y'>
                                    <TableRow className='bg-white dark:bg-gray-800 dark:border-gray-700'>
                                        <TableCell><img src={user.profilePictures}
                                            alt={user.username}
                                            className='w-10 h-10 rounded-full shadow-sm object-cover bg-gray-500'
                                        />

                                        </TableCell>
                                        <TableCell>
                                            <Link to={`/dashboard?tab=users&user=${user._id}`} className='text-lg'>{user.username}</Link>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ))
                        }

                        
                    </Table>
                      
                </div>

                <div className='flex flex-col w-full md:w-auto p-2 rounded shadow-md dark:bg-gray-800'>
                    <div className='flex justify-between p-3 text-sm font-semibold'>
                       <h1>Recent Comments</h1>
                       <Button outline gradientDuoTone='purpleToPink'>
                        <Link to={'/dashboard?tab=comments'}>See More</Link>
                       </Button>
                    </div>
                    <Table hoverable>
                        <TableHead>
                            <TableHeadCell>Comment Content </TableHeadCell>
                            <TableHeadCell> Likes</TableHeadCell>

                        </TableHead>
                        {
                            comments && comments.map((comment)=>(
                                <TableBody key={comment._id} className='divide-y'>
                                    <TableRow className='bg-white dark:bg-gray-800 dark:border-gray-700'>
                                        <TableCell className='w-96'>
                                         <p className='line-clamp-2'>{comment.content}</p>
                                        </TableCell>
                                        <TableCell>
                                            {comment.numberOfLikes}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ))
                        }

                        
                    </Table>
                      
                </div>

                <div className='flex flex-col w-full md:w-auto p-2 rounded shadow-md dark:bg-gray-800'>
                    <div className='flex justify-between p-3 text-sm font-semibold'>
                       <h1>Recent Posts</h1>
                       <Button outline gradientDuoTone='purpleToPink'>
                        <Link to={'/dashboard?tab=posts'}>See More</Link>
                       </Button>
                    </div>
                    <Table hoverable>
                        <TableHead>
                            <TableHeadCell>Post Image</TableHeadCell>
                            <TableHeadCell>Post Title</TableHeadCell>
                            <TableHeadCell>Post Category</TableHeadCell>


                        </TableHead>
                        {
                            posts && posts.map((post)=>(
                                <TableBody key={post._id} className='divide-y'>
                                    <TableRow className='bg-white dark:bg-gray-800 dark:border-gray-700'>
                                        <TableCell><img src={post.image}
                                            alt='post-image'
                                            className='w-14 h-14 rounded-full shadow-sm object-cover bg-gray-500'
                                        />

                                        </TableCell>
                                        <TableCell className='w-96'>
                                           <p className='text-lg line-clamp-2'>{post.title}</p> 
                                        </TableCell>

                                        <TableCell>
                                           <p className='text-sm '>{post.category}</p> 
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ))
                        }

                        
                    </Table>
                      
                </div>
            </div>
             
        </div>
    )
}

export default DashboardComp