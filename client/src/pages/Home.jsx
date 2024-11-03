import { Link } from 'react-router-dom'
import CallToAction from '../component/CallToAction.jsx'
import { useEffect, useState } from 'react'
import Postcard from '../component/Postcard.jsx';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=6`);
        const data = await res.json();
        setPosts(data.posts);

      } catch (error) {
        console.log(error.message);
      }
    }
    fetchPosts();

  }, [])
  return (
    <div>

      <div className='flex flex-col gap-5 p-28 px-3 max-w-6xl mx-auto w-full '>
        <h1 className='text-3xl font-bold lg:text-6xl '>Welcome To Gautam's Blog</h1>
        <p className='text-gray-500 text-sm'>Stay ahead with in-depth insights, industry trends,
          and innovative solutions in the world of technology.
          Whether you're a tech enthusiast or a professional, <br />
          we're here to guide you through the ever-evolving tech landscape.</p>

        <Link to={'/search'} className='text-teal-600 font-bold text-xs sm:text-sm hover:underline'>View All Post</Link>
      </div>

      <div className='p-4 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto mb-5 p-3'>
        {
          posts && posts.length > 0 && (
            <div className='flex flex-col gap-6'>

              <h1 className='text-4xl text-gray-600 sm:text-2xl font-semibold text-center mt-5'>Recent Posts </h1>
              <div className='flex flex-wrap gap-4'>

                {
                  posts && posts.map((post) => (
                    <Postcard key={post._id} post={post} />
                  ))

                }

              </div>
              <Link to={'/search'} className='text-teal-600 text-center font-bold text-xs sm:text-sm hover:underline'>View All Posts</Link>
            </div>
          )
        }
      </div>




    </div>
  )
}

export default Home