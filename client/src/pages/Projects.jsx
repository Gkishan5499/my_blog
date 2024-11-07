import React from 'react'
import CallToAction from '../component/CallToAction.jsx'

const Projects = () => {
  return (
    <div className='min-h-screen items-center mx-auto '>
      <div className='flex flex-col p-6 sm:p-28'>
        <h1 className='text-3xl text-center p-4 font-semibold'>My Projects</h1>
        <div>
          <CallToAction/>
        </div>
      </div>
    </div>
  )
}

export default Projects