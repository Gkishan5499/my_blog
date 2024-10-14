import { Alert, Button, Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutSuccess, updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice';
import { set } from 'mongoose';
import { TbAlertSquare } from "react-icons/tb";
import { Link } from 'react-router-dom';


const ProfileSidebar = () => {
    const { currentUser, error, loading } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModel, setShowModel] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();

    console.log(imageFileUploadProgress, imageFileUploadError);

    const filePickerRef = useRef();

    const handleImageFile = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImageFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    }
    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }

    }, [imageFile]);

    const uploadImage = async () => {
        setImageFileUploading(true);
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed(0));

            },
            (error) => {
                setImageFileUploadError("Could not upload image(File must be less than 2MB)");
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageUrl(null);
                setImageFileUploading(false);
            },

            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUrl(downloadURL);
                    setFormData({ ...formData, profilePictures: downloadURL });
                    setImageFileUploading(false);

                });
            }
        );

    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    console.log(formData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if (Object.keys(formData).length === 0) {
            setUpdateUserError("No fiels updated");
            return;
        }

        if (imageFileUploading) {
            setUpdateUserError("Please wait while image is uploading");
            return;
        }

        try {
            dispatch(updateStart());
            const res = await fetch(`api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),

            });
            const data = await res.json();

            if (!res.ok) {
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);
            }
            else {
                dispatch(updateSuccess(data));
                setUpdateUserSuccess("User's profile updated successfully")
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
        }
    }

    const handleDeleteUser = async (e) => {
        setShowModel(false);
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();

            if (!res.ok) {
                dispatch(deleteUserFailure(data.message));

            }
            else {
                dispatch(deleteUserSuccess(data));

            }
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    }

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
    return (
        <div className='max-w-lg mx-auto p-3 w-ful'>
            <h1 className='my-6 text-3xl text-center font-semibold'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type='file' accept='image/*' onChange={handleImageFile} ref={filePickerRef} className='hidden' />

                <div className='relative w-32 h-32 self-center shadow-md rounded-full overflow-hidden cursor-pointer'
                    onClick={() => filePickerRef.current.click()}>

                    {
                        imageFileUploadProgress && (
                            <CircularProgressbar value={imageFileUploadProgress || 0}
                                text={`${imageFileUploadProgress}%`}
                                strokeWidth={5}
                                styles={
                                    {
                                        root: {
                                            width: '100%',
                                            height: '100%',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,

                                        },
                                        path: {
                                            stroke: `rgba(62 , 152 , 199, ${imageFileUploadProgress / 100})`,
                                        }
                                    }
                                }
                            />
                        )
                    }

                    <img src={imageUrl || currentUser.profilePictures}
                        alt="user"
                        className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover  
                     ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`}
                    />

                </div>

                {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}


                <TextInput
                    type="text"
                    id='username'
                    placeholder='username'
                    defaultValue={currentUser.username} onChange={handleChange}
                />

                <TextInput
                    type="email"
                    id='email'
                    placeholder='email'
                    defaultValue={currentUser.email} onChange={handleChange}
                />

                <TextInput
                    type="password"
                    id='password'
                    placeholder='Password'
                    onChange={handleChange}
                />
                
                <Button type='submit' gradientDuoTone='purpleToBlue'
                 outline
                 disabled={loading || imageFileUploading}>
                    {loading ? 'Loading..':'Update'}
                </Button>

                {
                 currentUser.isAdmin &&
                    <Link to='/create-post'>
                       <Button type='submit'
                        gradientDuoTone='purpleToPink'
                        outline
                        className='w-full'
                    >
                        {loading ? 'Loading..':'Create New Post'}
                        </Button>
                    </Link>
                }

            </form>
            <div className='text-red-500 flex justify-between mt-3'>
                <span onClick={() => setShowModel(true)} className='cursor-pointer'>Delete Account</span>
                <span onClick={logOut} className='cursor-pointer'>Logout</span>

            </div>
            {
                updateUserSuccess && (
                    <Alert color='success' className='mt-5'>
                        {updateUserSuccess}
                    </Alert>
                )
            }
            {
                updateUserError && (
                    <Alert color='failure' className='mt-5'>
                        {updateUserError}
                    </Alert>
                )
            }
            {
                error && (
                    <Alert color='failure' className='mt-5'>
                        {error}
                    </Alert>
                )
            }

            <Modal
                show={showModel}
                onClose={() => setShowModel(false)}
                popup
                size='md'
            >
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <TbAlertSquare className='w-14 h-14 text-gray-400
                     dark:text-gray-200 mb-5 mx-auto'/>
                        <p className='text-lg text-center text-gray-500 dark:text-gray-100 mb-5'>Are you sure you want to delete your account</p>

                        <div className='flex justify-center gap-5'>
                            <Button color='failure' onClick={handleDeleteUser}>
                                Yes, I'm Sure
                            </Button>

                            <Button color='gray' onClick={() => setShowModel(false)}>No, Cancel</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default ProfileSidebar