import { Button, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate} from 'react-router-dom';
import Postcard from '../component/Postcard';

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm :'',
    sort :'desc',
    category:'uncategorized'
  });
  const [posts, setPosts] = useState([]);
  const[loading, setLoading] = useState(false);
  const[showmore, setShowmore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
   console.log(sidebarData);

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl= urlParams.get('category');
     if(searchTermFromUrl || sortFromUrl || categoryFromUrl){
      setSidebarData({
         ...sidebarData,
         searchTerm: searchTermFromUrl,
         sort:sortFromUrl,
         category: categoryFromUrl
      })
     }

     const fetchPosts= async()=>{
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if(!res.ok){
        setLoading(false);
        return;
      }
      if(res.ok){
        const data = await res.json();
         setPosts(data.posts);
         console.log(data.posts);
         setLoading(false);
       
         if(data.posts.length === 9){
          setShowmore(true);
         }
         else{
          setShowmore(false);
         }

      }

     }
     fetchPosts();


  },[location.search])

  const handleSidebarChange=(e)=>{
     if(e.target.id === 'searchTerm'){
      setSidebarData({...sidebarData, searchTerm:e.target.value});

     }
     if(e.target.id === 'sort'){
      const order = e.target.value || 'desc';
      setSidebarData({...sidebarData, sort:order});
     }

     if(e.target.id === 'category'){
      const category = e.target.value || 'uncategorized';
      setSidebarData({...sidebarData, category});
       
     }
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm',sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category',sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
   
}
const handleShowmore = async()=>{
  const numberOfPosts = posts.length;
  const startIndex =  numberOfPosts;
  const urlParams = new URLSearchParams(location.search);
  urlParams.set('startIndex', startIndex);
  const searchQuery =  urlParams.toString(); 
  const res = await fetch(`/api/post/getposts?${searchQuery}`);
  if(!res.ok){
    return;
  }
  if(res.ok){
    const data = await res.json();
    setPosts([...posts, ...data.posts]);
    if(data.posts.length === 9 ){
      setShowmore(true);
    }
    else{
      setShowmore(false);
    }
  }
}


  return (
  <div className='flex flex-col md:flex-row'>
    <div className='p-7 border-b md:border-r md:min-h-screen border-gray-700 '>
          <form className='flex flex-col gap-8 ' onSubmit={handleSubmit}>
           <div className='flex gap-4  items-center'>
            <label className='whitespace-nowrap font-semibold'>Search Terms</label>
            <TextInput placeholder='search..' 
              type='text' id='searchTerm'
              value={sidebarData.searchTerm}
              onChange={handleSidebarChange}

            />
            </div>
            <div className='flex gap-4 items-center'>
              <label className='font-semibold'>Sort:</label>
              <Select value={sidebarData.sort} onChange={handleSidebarChange}  id='sort'>
                <option value='asc'>Latest</option>
                <option value='desc'>Oldest</option>

              </Select>
            </div>

            <div className='flex gap-4 items-center'>
              <label className='font-semibold'>Category:</label>
              <Select  onChange={handleSidebarChange} value={sidebarData.category} id='category'>
              <option value="uncategorized">Select a Category</option>
              <option value="reactJs">React Js</option>
              <option value="javaScript">JavaScript</option>
              <option value="fullstack">Full Stack</option>
              <option value="frontend">Frontend Development</option>
              <option value="nextjs">Next Js</option>
              <option value="wordpress">wordpress</option>


              </Select>
            </div>


            <Button type='submit' outline gradientDuoTone='purpleToPink'>submit</Button>
          </form>
    </div>

            <div className='w-full'>
               <div className='p-3 mt-3 sm:border-b border-gray-800 '>
                <h1 className='text-3xl font-semibold p-3'>Posts Result</h1>
               </div>

               <div className='flex flex-wrap gap-4 p-7'>

               {
                 !loading && posts.length === 0 && (
                  <p className='text-sm text-gray-500 '>No posts found</p>
                 )
               }
               {
                loading && <p className='text-xs text-gray-500 '>Loading...</p>
               }
               {
                !loading && posts && posts.map((post)=>(
                  <Postcard key={post._id} post={post}/>
                  
                ))
               }
               {
                showmore && <button onClick={handleShowmore} className='text-teal-500 text-sm hover:underline w-full'>Show more</button>
               }
                 
               </div>
              

            </div>
  </div>
  )
}

export default Search