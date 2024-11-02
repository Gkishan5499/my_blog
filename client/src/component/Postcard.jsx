import React from 'react'
import { Link } from 'react-router-dom'

const Postcard = ({post}) => {
  return (
    <div className='group relative w-full border border-teal-500 hover:border-2 transition-all
     h-[400px] overflow-hidden rounded-lg sm:w-[360px]'>
        <Link to={`/post/${post.slug}`}>

            <img src={post.image} alt="post artical" 
            className='h-[260px] w-full object-cover group-hover:h-[200px] 
            transition-all duration-300 z-20'/>
             </Link>
         <div className='p-2 flex flex-col gap-2'> 
                 <h3 className='text-[18px] font-semibold line-clamp-2'>{post.title}</h3>
                 <span>{post.category}</span>
                <Link to={`/post/${post.slug}`}
                 className='group-hover:bottom-0 absolute bottom-[-200px] 
                 left-0 right-0 z-10 border border-teal-500 text-teal-500 hover:bg-teal-500
                 hover:text-white transition-all duration-300 py-2 text-center rounded-md
                  !rounded-tl-none m-2'>Read artical</Link>
         </div>
       
    </div>
  )
}

export default Postcard