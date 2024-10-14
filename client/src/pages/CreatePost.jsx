import React from 'react'
import {Button, FileInput, Select, TextInput} from 'flowbite-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className='p-3 max-w-3xl mx-auto'>
    <h1 className='text-center text-3xl font-medium my-6 '>Create a Post</h1> 
    <form className='flex flex-col justify-between'>
         <div className='flex flex-col gap-4 sm:flex-row'>
           <TextInput
           type='text'
           placeholder='Title'
           className='flex-1'
           />

           <Select>
            <option value="uncategorized">Select a Category</option>
            <option value="React Js">React Js</option>
            <option value="JavaScript">JavaScript</option>


           </Select>
         </div>
         <div className='flex gap-4 border-teal-300 border-4 border-dotted p-4 justify-between my-4'>
                <FileInput type='file' accept='image/*'/>
                <Button type='button' size='sm' gradientDuoTone='purpleToBlue' outline>Upload Image</Button>
         </div>
          <ReactQuill theme="snow" placeholder="Write Something" className='h-72 mb-16'/>
          <Button type='submit'  gradientDuoTone='purpleToPink'>Publish</Button>
    </form>
    </div>
  )
}

export default CreatePost