import React, { useState } from 'react'
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper'
import { useNavigate } from 'react-router-dom'

import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';
import { preventionOptions,
         sareaOptions,
         sregionsOptions,
         programOptions
    } from './Options.js';

export default function Skin() {

  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()
 
  const formik = useFormik({
    initialValues : {
      preventionOptions : apiData?.preventionOptions || '',
      often: apiData?.often || '',
      sarea: apiData?.sarea || '',
      sregions: apiData?.sregions || '',
      program: apiData?.program || '',
    //   bonus: apiData?.specify || '',
      mobile: apiData?.mobile || '',
      address : apiData?.address || '',

      email: apiData?.email || "",
    },
    enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || apiData?.profile || ''})
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success : <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });

    }
  })

  /** formik doensn't support file upload so we need to create this handler */
//   const onUpload = async e => {
//     const base64 = await convertToBase64(e.target.files[0]);
//     setFile(base64);
//   }

  // logout handler function
 

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto">
      

      <Toaster position='top-center' reverseOrder={false}></Toaster>
      {/* <div className="name flex w-3/4 gap-10">
                  <input {...formik.getFieldProps('email')} 
                  className={`${styles.textbox} ${extend.textbox}`} 
                  type="text" placeholder='email' />
                  
                </div> */}

      <div className='flex justify-center items-center h-screen'>
      
                {/* sidebar here */}
        <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%", paddingTop: '3em'}}>

          {/* <div className="title flex flex-col items-center">
            {/* <h4 className='text-5xl font-bold'>Profile</h4> */}
            {/* <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                questionnaire
            </span> */}
          {/* </div> */}

          <form className='py-1' onSubmit={formik.handleSubmit}>

              <div className="textbox flex flex-col items-center gap-6">

                <div className="name flex w-3/4 gap-10">
                   <select {...formik.getFieldProps('prevention')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="choose an option" />
                  {preventionOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                </div>

                  <input {...formik.getFieldProps('often')} 
                  className={`${styles.textbox} ${extend.textbox}`} 
                  type="text" placeholder='add a brief description' />

                  <select {...formik.getFieldProps('sarea')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="choose an option" />
                  {sareaOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                  <select {...formik.getFieldProps('sregions')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="choose an option" />
                  {sregionsOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <input {...formik.getFieldProps('regions')} 
                  className={`${styles.textbox} ${extend.textbox}`} 
                  type="text" placeholder='if no specify regions' />

                <select {...formik.getFieldProps('program')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="choose an option" />
                  {programOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select> 
                  
               
                  
              </div>
          </form>

        </div>
     
      </div>
    </div>
  )
}

