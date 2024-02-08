import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { getFormData } from './formData.js';
import { profileValidation } from '../helper/validate';
import { updateUser } from '../helper/helper';
import useFetch from '../hooks/fetch.hook';
import Profile from './Profile';


const Sidebar = () => {
    const [file, setFile] = useState();
    const navigate = useNavigate()
    const [{ apiData }] = useFetch();

    const formik = useFormik({
        initialValues: getFormData(apiData),
        enableReinitialize: true,
        validate : profileValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values => {
          values = await Object.assign(values, { profile : file || apiData?.profile || ''})
          let updatePromise = updateUser(values);
    
          toast.promise(updatePromise, {
            loading: 'Updating...',
            success : <b>Saved Successfully...!</b>,
            error: <b>Could not Update!</b>
          });
    
        }
    })

    function userLogout(){
        localStorage.removeItem('token');
        navigate('/')
      }
    
  return (
    <div className="flex">
    <div className="flex flex-col h-screen p-3 bg-gray-800 shadow w-60">
        
        <div className="space-y-3">
            <div className="flex items-center">
                <input {...formik.getFieldProps('email')} 
                  className="text-sm font-light bg-gray-800 text-white"
                  type="text" placeholder='email' />
            </div>
            <div className="flex-1">
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <li className="rounded-sm">
                        <a
                            href="#"
                            className="flex items-center p-2 space-x-3 rounded-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-gray-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            <span className="text-gray-100">Home</span>
                        </a>
                    </li>
                    <li className="rounded-sm">
                        <a
                            href="#"
                            className="flex items-center p-2 space-x-3 rounded-md"
                        >
                           <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-gray-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                            <span className="text-gray-100">Search</span>
                        </a>
                    </li>
                    <li className="rounded-sm">
                        <a
                            href="#"
                            className="flex items-center p-2 space-x-3 rounded-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-gray-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 
                                    0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 
                                    0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 
                                    0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 
                                    0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 
                                    0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 
                                    0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 
                                    0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 
                                    2.572-1.065z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 
                                    .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 
                                    2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 
                                    .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 
                                    2.292m0-14.25v14.25"
                                />
                            </svg>
                            <span className="text-gray-100">Services</span>
                        </a>
                    </li>
                    <div class="absolute bottom-0 ">
                    <li className="rounded-sm">
                        <a
                            href="#"
                            className="flex items-center p-2 space-x-3 rounded-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-gray-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <span className="text-gray-100">Settings</span>
                        </a>
                    </li>
                    <li className="flex-10 rounded-sm">
                        <a
                            href="#"
                            className="flex items-center p-2 space-x-3 rounded-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-gray-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                />
                            </svg>
                            <span onClick={userLogout}  className="text-gray-100">Logout</span>
                        </a>
                    </li>
                    </div>
                </ul>
            </div>
        </div>
    </div>


    <Profile/>
   
</div>
  );
};

export default Sidebar;
