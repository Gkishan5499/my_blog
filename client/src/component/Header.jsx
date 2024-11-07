import React, { useEffect, useState } from 'react'
import {Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, TextInput} from 'flowbite-react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";

import { FaMoon, FaSun } from "react-icons/fa";
import {useDispatch, useSelector} from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice.js';
import { signOutSuccess } from '../redux/user/userSlice.js';


 
const Header = () => {
    const {currentUser} = useSelector((state) => state.user);
    const path = useLocation().pathname;
    const navigate = useNavigate();

    const {theme}= useSelector((state)=>state.theme);
    const location = useLocation('');
    const dispatch = useDispatch();
    const [searchTerm , setSearchTerm] = useState('');
    console.log(searchTerm);
    
      useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
         if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl);
         }

      },[location.search])

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

    const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

  return (
     
        <Navbar className='border-b-2'>
            <Link to='/' className='self-center flex-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded' >Gautam's</span>
                Blog
            </Link>

            <form onSubmit={handleSubmit} >
                <TextInput
                    type='text'
                    placeholder='Search'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                />  
                <Button type='submit' className='w-12 h-10 lg:hidden' color='gray' pill><AiOutlineSearch/></Button>  
            </form>
            

             <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
                {theme === 'light'? <FaSun/>:<FaMoon/>}
                </Button>

                  {
                    currentUser? (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar
                                    alt='user'
                                    img={currentUser.profilePictures}
                                    rounded
                                   
                                />
                            }

                        >
                          <DropdownHeader>
                            <span className='text-sm block'>@{currentUser.username}</span>
                            <span className='text-sm block font-medium truncate'>{currentUser.email}</span>

                          </DropdownHeader>

                          <Link to='/dashboard?tab=profile'>
                              
                              <DropdownItem>Profile</DropdownItem>

                          </Link>

                          <DropdownDivider/>

                          <DropdownItem onClick={logOut}>Sign out</DropdownItem>

                    </Dropdown>
                        
                        
                    ):(
                    <Link to="/sign-in">
                    <Button gradientDuoTone='purpleToBlue' outline>Sign In</Button>
                    </Link>
                    )
                  }
                 

                 <Navbar.Toggle/>
             </div>

             <Navbar.Collapse>
                <Navbar.Link active={path==='/'} as={'div'}> 
                    <Link to="/">
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path==='/about'} as={'div'}>
                    <Link to="/about">
                        About us
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path==='/projects'} as={'div'}>
                    <Link to="/projects">
                        Projects
                    </Link>
                </Navbar.Link>
             </Navbar.Collapse>


        </Navbar>
     
  )
}

export default Header