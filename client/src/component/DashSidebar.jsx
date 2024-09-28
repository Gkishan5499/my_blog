import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import { HiUser, HiArrowRight } from "react-icons/hi";
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const DashSidebar = () => {
    const location= useLocation();
  const [tab, setTab]=useState('');

  useEffect(()=>{
    const urlParam= new URLSearchParams(location.search);
    const tabParam= urlParam.get('tab');
     if(tabParam){
      setTab(tabParam);
     }

  },[location.search]);
  return (
       <Sidebar className='w-full md:w-56'>
        <SidebarItems>
             <SidebarItemGroup>
                <Link to ='/dashboard?tab=profile' >
                <SidebarItem active={tab==='profile'} icon={HiUser} label='user' labelColor='dark' >
                   Profile
                </SidebarItem>
                </Link>

                <SidebarItem active icon={HiArrowRight} className='cursor-pointer'>
                   Sign out
                </SidebarItem>
             </SidebarItemGroup>
        </SidebarItems>
       </Sidebar>
  )
}

export default DashSidebar