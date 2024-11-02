import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../component/DashSidebar';
import ProfileSidebar from '../component/ProfileSidebar';
import DashPosts from  '../component/DashPosts';
import DashUsers from '../component/DashUsers';
import Dashcomments from '../component/Dashcomments';


const Dashboard = () => {
  const location= useLocation();
  const [tab, setTab]=useState('');

  useEffect(()=>{
    const urlParam = new URLSearchParams(location.search);
    const tabParam = urlParam.get('tab');

     if(tabParam){
        setTab(tabParam);
     }

  },[location.search]);
  
  return (

    <div className='min-h-screen flex flex-col md:flex-row'>
       <div className='md:w-56'>
          {/* Dashboard Sidebar */}
          <DashSidebar/>
       </div>

       <div className='w-full'>
             {/* Profile Sidebar  */}
             {tab==='profile' && <ProfileSidebar/>}
             {/* Dashboard Post */}
             {tab==='posts' && <DashPosts/>}

             {/* Dashboard Users */}
             {tab==='users' && <DashUsers/>}

             {/* Dashboard Comment  */}

             {tab==='comments' && <Dashcomments/>}
       </div>
          
    </div>
  )
}

export default Dashboard