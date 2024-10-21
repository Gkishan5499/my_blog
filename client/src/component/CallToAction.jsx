import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-center items-center border rounded
     border-teal-400 p-3 text-center rounded-tl-3xl rounded-br-2xl '>
        <div className='flex-1 justify-center flex flex-col'>
          <h2 className='text-2xl'>Master in React & Develope your skills</h2>
          <p className='text-gray-400 my-3'>Learn React and become a skilled developer</p>

    
          
           <Button gradientDuoTone='purpleToPink' 
           className='rounded-bl-none rounded-tl-xl'>
           Create your own project 
           </Button>
        </div>
        <div className='p-7 flex-1'>
            <img src="https://image.winudf.com/v2/image1/Y29tLmZyZWVjb3Vyc2UucmVhY3Rqc19zY3JlZW5fMF8xNjcwMTg0ODkzXzAxNg/screen-0.jpg?fakeurl=1&type=.jpg"
            alt="React-course" className=''/>
        </div>
    </div>
  )
}

export default CallToAction