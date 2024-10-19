import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal, ModalBody, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import { TbAlertSquare } from 'react-icons/tb'
import { FaCheck, FaTimes } from "react-icons/fa"

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [userToIdDelete, setUserToIdDelete] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUserData(data.users);
          console.log(data.users);
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
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowmore = async () => {
    const startIndex = userData.length;

    try {

      const res = await fetch(`/api/user/getusers?&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserData((prev) => [...prev, ...data.users]);
        if (data.users.length < 8) {
          setShowMore(false);
        }
      }

    } catch (error) {
      next(error);
    }
  }

   const handleDeleteUser = async()=>{
     setShowModel(false);
     try{
        const res = await fetch(`/api/user/delete/${userToIdDelete}`,{
          method:'DELETE',

        },
      );
        const data = await res.json();
        if(!res.ok){
           console.log(data.message);
        }
        else{
            setUserData((prev)=> prev.filter((user)=>user._id !== userToIdDelete));

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
        currentUser.isAdmin && userData.length > 0 ?
          (
            <>
              <Table hoverable className='shadow-md'>
                <TableHead>
                  <TableHeadCell>Date Created</TableHeadCell>
                  <TableHeadCell>User Name</TableHeadCell>
                  <TableHeadCell>User Image</TableHeadCell>
                  <TableHeadCell>Email</TableHeadCell>
                  <TableHeadCell>Admin</TableHeadCell>

                  <TableHeadCell>Delete</TableHeadCell>

                </TableHead>

                {
                  userData.map((user) => (
                    <TableBody className='divide-y' key={user._id}>
                      <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-900'>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>

                        <TableCell>
                          <Link className='font-medium text-gray-800 dark:text-white' to={`/user/${user.slug}`}>{user.username} </Link>
                        </TableCell>

                        <TableCell>
                          <Link to={`/user/${user.slug}`}>
                            <img
                              src={user.profilePictures}
                              alt={user.username}
                              className='w-20 h-20 object-cover rounded-full shadow-sm border-black'
                            />
                          </Link>
                        </TableCell>

                        <TableCell>
                          {user.email}
                        </TableCell>

                        <TableCell>
                          {user.isAdmin ? <FaCheck className='text-green-500'/>:<FaTimes className='text-red-500'/>}
                        </TableCell>
 
                        <TableCell>
                          <span onClick={()=>{
                            setShowModel(true); 
                            setUserToIdDelete(user._id);
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
                         dark:text-gray-100 mb-5'>Are you sure you want to delete your User</p>

            <div className='flex justify-center gap-5'>
              <Button color='failure' onClick={handleDeleteUser}>
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

export default DashUsers