import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { getFormData } from './formData.js';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper'
import { useNavigate } from 'react-router-dom'

import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';
// import Skin from './Skin'
import {  vaccinationOptions,
           supplyOptions,
            bonusOptions,
            preventionOptions,
            sareaOptions,
            sregionsOptions,
            programOptions,
            hearingaidOptions,
            hareaOptions,
            hregionsOptions,
            serviceOptions,
            preparationOptions,
            careaOptions,
            cregionsOptions,
            cprogramOptions,
            foundationOptions,
            fareaOptions,
            fregionsOptions,
            fprogramOptions
             } from './Options.js';

export default function Profile() {

  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()
 
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
        success : <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });

    }
  })

  // logout handler function
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto">
      

      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="name flex w-3/4 gap-10">
                  <input {...formik.getFieldProps('email')} 
                  className={`${styles.textbox} ${extend.textbox}`} 
                  type="text" placeholder='email' />
                  
                </div>

      <div className='flex justify-center items-center h-screen'>
      
                {/* sidebar here */}
        <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%", paddingTop: '3em'}}>

          <form className='py-1' onSubmit={formik.handleSubmit}>
             
              <div className="textbox flex flex-col items-center gap-6">

                          {/*vaccination*/}

                      {/* <span className='py-4 text-sm w-2/3 text-center text-gray-500'>
                        Do you have complete service in your supply area
                    </span> */}
                <div className="name flex w-3/4 gap-10">
                   <select {...formik.getFieldProps('vaccination')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="choose an option" />
                  {vaccinationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                </div>

                  <input {...formik.getFieldProps('repeat')} 
                  className={`${styles.textbox} ${extend.textbox}`} 
                  type="text" placeholder='add a brief description' />

                  <select {...formik.getFieldProps('supply')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="choose an option" />
                  {supplyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* <span className='py-4 text-sm w-2/3 text-center text-gray-500'>
                Do you have complete service in your supply area
               </span> */}
                  {/* <select {...formik.getFieldProps('supply')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="choose an option" />
                  {supplyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select> */}

                <input {...formik.getFieldProps('regions')} 
                  className={`${styles.textbox} ${extend.textbox}`} 
                  type="text" placeholder='if no specify regions' />
                    
                    {/* not working */}
                <select {...formik.getFieldProps('bonus')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="choose an option" />
                  {bonusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>  
                  
               {/* skin predetection */}

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

                <select {...formik.getFieldProps('program')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="choose an option" />
                  {programOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select> 

                {/* hearing aid */}
                <span className='py-4 text-sm w-2/3 text-center text-gray-500'>
                hearing aid
               </span>
              
                <div className="name flex w-3/4 gap-10">
                   <select {...formik.getFieldProps('hearingaid')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="hearing aid" />
                  {hearingaidOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                </div>

                  <input {...formik.getFieldProps('whichone')} 
                  className={`${styles.textbox} ${extend.textbox}`} 
                  type="text" placeholder='which one' />

                  <select {...formik.getFieldProps('harea')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="choose an option" />
                  {hareaOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                  <select {...formik.getFieldProps('hregions')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="choose an option" />
                  {hregionsOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <select {...formik.getFieldProps('service')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="choose an option" />
                  {serviceOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select> 

                {/* childbirth preparation */}
                <span className='py-4 text-sm w-2/3 text-center text-gray-500'>
                childbirth preparation
               </span>

                <div className="name flex w-3/4 gap-10">
                   <select {...formik.getFieldProps('preparation')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="preparation" />
                  {preparationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                </div>
                              {/* back here */}
                  <input {...formik.getFieldProps('volume')} 
                  className={`${styles.textbox} ${extend.textbox}`} 
                  type="text" placeholder='volume in number' />

                  <select {...formik.getFieldProps('carea')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="choose carea" />
                  {careaOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                  <select {...formik.getFieldProps('cregions')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="choose an option" />
                  {cregionsOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <select {...formik.getFieldProps('cprogram')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="choose an option" />
                  {cprogramOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select> 

                {/* childbirth */}
                <span className='py-4 text-sm w-2/3 text-center text-gray-500'>
                childbirth
               </span>

                <div className="name flex w-3/4 gap-10">
                   <select {...formik.getFieldProps('foundation')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="foundation" />
                  {foundationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                </div>
                              {/* back here */}
                  <input {...formik.getFieldProps('child')} 
                  className={`${styles.textbox} ${extend.textbox}`} 
                  type="text" placeholder='volume in number' />

                  <select {...formik.getFieldProps('farea')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="choose farea" />
                  {fareaOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                  <select {...formik.getFieldProps('fregions')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="choose an option" />
                  {fregionsOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <select {...formik.getFieldProps('fprogram')}
                   className={`${styles.textbox} ${extend.textbox}`}>
                  <option value="" label="choose an option" />
                  {fprogramOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select> 


                </div>
              <button className={styles.btn} type='submit'>submit questionnaire</button>
              <div className="text-center py-4">
                <span className='text-gray-500'>come back later? <button onClick={userLogout} className='text-red-500' to="/">Logout</button></span>
              </div>
          </form>
          
          

        </div>
     
      </div>
    </div>
  )
}

