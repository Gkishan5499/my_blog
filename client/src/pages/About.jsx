import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen flex  items-center'>
      <div className='flex flex-col gap-5 p-8 sm:p-28'>
        <h1 className='text-3xl text-center font-bold'>Gautam's Blog</h1>
         <div className='p-6'>
          <p className='text-md text-center text-gray-500'>At Gautam's Blog, we're passionate about the impact technology has on our lives.
           Founded with the vision to make technology accessible and understandable for everyone, we aim to demystify complex concepts, 
          bring clarity to the latest trends, and offer practical insights into the tech industry.</p>
         </div>

         <h2 className='text-2xl text-center font-semibold'>Our Mission</h2>
         <div className='p-6'>
          <p className='text-md text-center text-slate-500'>Our mission is to empower tech enthusiasts, professionals, 
          and everyday users by providing reliable, up-to-date, and actionable information.
           We cover everything from breakthrough innovations and industry trends to hands-on guides and unbiased product reviews. Whether you're here to stay informed, 
          solve a problem, or make an informed tech choice, we've got you covered.</p>
         </div>
      </div>
    </div>
  )
}

export default About