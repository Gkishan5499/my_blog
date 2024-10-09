import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import { HiUser, HiArrowRight } from "react-icons/hi";
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


const DashSidebar = () => {
   const location = useLocation();
   const [tab, setTab] = useState('');
   const dispatch = useDispatch();

   useEffect(() => {
      const urlParam = new URLSearchParams(location.search);
      const tabParam = urlParam.get('tab');
      if (tabParam) {
         setTab(tabParam);
      }

   }, [location.search]);

   const logOut = async () => {
      try {
          const res = await fetch('/api/user/signOut', {
              method: 'POST',
          });
          const data = await res.json();

          if (!res.ok) {
              console.log(data.message);

          }
          else {
              dispatch(signOutSuccess(data));
          }

      } catch (error) {
          console.log(error);
      }
  }

   return (
      <Sidebar className='w-full md:w-56'>
         <SidebarItems>
            <SidebarItemGroup>
               <Link to='/dashboard?tab=profile' >
                  <SidebarItem active={tab === 'profile'}
                     icon={HiUser}
                     label='user'
                     labelColor='dark'
                     as='div' >
                     Profile
                  </SidebarItem>
               </Link>

               <SidebarItem active icon={HiArrowRight} className='cursor-pointer' onClick={logOut}>
                  Sign out
               </SidebarItem>
            </SidebarItemGroup>
         </SidebarItems>
      </Sidebar>
   )
}

export default DashSidebar