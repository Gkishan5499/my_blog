import React, { useState } from 'react'
import {Alert, Button, FileInput, Select, TextInput} from 'flowbite-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CreatePost = () => {
   const [file, setFile]= useState(null);
   const [imageProgress, setImageProgress]= useState(null);
   const[ imageUploadError,  setImageUploadError]= useState(null);
   const [formData, setFormData]= useState({})

   const handleImageUpload = async()=>{
    try {
        if(!file){
          setImageUploadError("Please select an image ")
          return;
        }
         setImageUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
           (snapshot) => {
             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
             setImageProgress(progress.toFixed(0));
              
           },
           (error)=>{
            setImageUploadError("Image uplad failed");
            setImageProgress(null);
            
           },
           () =>{
            
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setImageProgress(null);
                  setImageUploadError(null);
                  setFormData({...formData, image:downloadURL});
            });

           }

        );

    } catch (error) {
      setImageUploadError("image upload failed")
      setImageProgress(null);
      
    }
   }

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
                <FileInput type='file' accept='image/*' onChange={(e)=> setFile(e.target.files[0])}/>

                <Button
                 type='button' 
                 size='sm' 
                 gradientDuoTone='purpleToBlue'
                 outline
                 onClick={handleImageUpload}
                 >
                 {
                  imageProgress ? (
                    <div className='w-16 h-16'>
                      <CircularProgressbar
                        value={imageProgress}
                         text={`${imageProgress || 0}%`}
                      />
                    </div>
                  ):
                  'Image upload'
                 }
                 </Button>
         </div>
         {imageUploadError && <Alert color='failure'>{imageUploadError} </Alert>}
          {
            formData.image && (
              <img src={formData.image}
                alt='image upload'
                className='w-full h-72 object-cover'
              />
            )
          }
          <ReactQuill theme="snow" placeholder="Write Something" className='h-72 mb-16'/>
          <Button type='submit'  gradientDuoTone='purpleToPink'>Publish</Button>
    </form>
    </div>
  )
}

export default CreatePost