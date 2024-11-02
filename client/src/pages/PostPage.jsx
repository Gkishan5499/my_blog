import { Button, Spinner } from 'flowbite-react';
import React, { useState } from 'react' 
import { useEffect } from 'react';
import {Link, useParams}  from 'react-router-dom'
import CallToAction from '../component/CallToAction';
import CommentSection from '../component/CommentSection';
import Postcard from '../component/Postcard';

const PostPage = () => {
    const {postSlug}  = useParams();
    const [post, setPost] = useState(null);
    const [error, setError]= useState(false);
    const [loading, setLoading] = useState(true);
    const [recentPosts, setRecentPosts] = useState(null);
    console.log(post);

    useEffect(()=>{
        setLoading(true);
         const fetchPost= async()=>{
            try {
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if(!res.ok){
                    setError(true);
                    setLoading(false);
                    return;
                }
               if(res.ok){
                   setPost(data.posts[0]);
                   setLoading(false);
                   setError(false);
                
               };  
            } catch (error) {
                setError(true);
                setLoading(false);
            }
         }
         fetchPost();
    },[postSlug]);


    useEffect (()=>{
      try {
        const fetchData= async()=>{
           
          const res = await fetch('/api/post/getposts?limit=3');
          const data = await res.json();
          if(res.ok){
             setRecentPosts(data.posts);
          }
        }
        fetchData();
      } catch (error) {
        console.log(error.message)
      }
    },[]);
  
    if(loading)
        return (
         <div className='flex justify-center items-center min-h-screen'>
             <Spinner color="info" size='lg' aria-label='Info spinner example'/>
        </div>
        );
    
  return (
    <main className=' max-w-6xl  p-3 flex flex-col mx-auto min-h-screen '>
     <h1 className='text-center text-3xl lg:text-4xl font-serif mt-10 p-4 max-w-2xl mx-auto '>{post && post.title}</h1>
     <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
        <Button color='gray' pill size='xs' >{post && post.category}</Button>
     </Link>
     <img src={post && post.image} alt={post && post.title}
      className='mt-5 max-h-[600px] mx-auto w-full p-3 object-cover' />

      <div className='flex justify-between p-3 mt-2 border-b border-slate-300 
      mx-auto max-w-2xl w-full text-xs'>
        <span className=''>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>

      <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html:post && post.content}} >
        
      </div>

      <div className='max-w-4xl mx-auto w-full p-3'>
       <CallToAction/>
      </div>
      <CommentSection postId={post._id}/>

      <div className='flex flex-col justify-center items-center mt-3'>
        <h1 className='text-2xl font-medium'>Recent Artical</h1>
        <div className='flex flex-wrap justify-center mt-4 gap-5'>
           {
            recentPosts && recentPosts.map((post)=>(
             <Postcard key={post._id} post={post}/>
            )

            )
           }
        </div>
      </div>

    </main>
  )
}

export default PostPage