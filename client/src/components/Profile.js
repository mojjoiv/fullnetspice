import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { getFormData } from './formData.js';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper';
import { useNavigate } from 'react-router-dom';


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
        success : <b>Saved Successfully...!</b>,
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

      <div className='overflow-hidden flex justify-center items-center h-screen '>
        
       <div class="overflow-auto w-full bg-gray-900 h-screen ">
        <div class="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12 ">
        <div class="bg-gray-900 w-full shadow rounded p-8 sm:p-12 -mt-72">
            <form onSubmit={formik.handleSubmit}>
                <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">
                      
                    <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-password">
                               Vaccination
                     </label>   
                     <p class="text-white text-xs italic">Do you offer additional vaccination service</p>
                    
                      <select {...formik.getFieldProps('vaccination')}
                              class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                                    <option value="" label="choose an option" />
                                          {vaccinationOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                              {option.label}
                                            </option>
                                       ))}
                            </select>
                    </div>
                    
                 </div>
                 <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">   
                     <p class="text-white text-xs italic">If: yes how often?</p>
                    
                     <input {...formik.getFieldProps('repeat')} 
                          class="appearance-none block w-full bg-gray-800 text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-slate-600 focus:border-gray-900 rounded-full" 
                          id="grid-password" type="text" placeholder='add a brief description'/>
                    </div>
                    
                 </div>
                 <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">  
                     <p class="text-white text-xs italic">Do you offer this service in your complete supply area</p>                    
                       <select {...formik.getFieldProps('supply')}
                      class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                            <option value="" label="choose an option" />
                                  {supplyOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                        </select>
                    </div>        
                 </div>
                 <div class="w-full flex flex-col">   
                     <p class="text-white text-xs italic">If no: specify the region</p>
                    
                     <input {...formik.getFieldProps('regions')}  
                          class="appearance-none block w-full bg-gray-800 text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-slate-600 focus:border-gray-900 rounded-full" 
                          id="grid-password" type="text" placeholder='add a brief description'/>
                    </div>

                    <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">  
                     <p class="text-white text-xs italic">Could extend this service with a service from your bonus program</p>                 
                       <select {...formik.getFieldProps('bonus')}
                              class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                                    <option value="" label="choose an option" />
                                          {bonusOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                              {option.label}
                                            </option>
                                          ))}
                              </select>
                    </div>
                    
                </div>

                <br/>
                {/* skin cancer predetection */}
                <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">
                    <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-password">
                                    Skin Cancer predetection
                     </label>   
                     <p class="text-white text-xs italic">
                      Do you perform skin cancer prevention examination 
                           even below the legally specified age of 35</p>
                    
                      <select {...formik.getFieldProps('prevention')}
                              class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                                    <option value="" label="choose an option" />
                                          {preventionOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                              {option.label}
                                            </option>
                                       ))}
                            </select>
                    </div>
                    
                 </div>
                 <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">   
                     <p class="text-white text-xs italic">If: yes how often?</p>
                    
                     <input {...formik.getFieldProps('often')} 
                          class="appearance-none block w-full bg-gray-800 text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-slate-600 focus:border-gray-900 rounded-full" 
                          id="grid-password" type="text" placeholder='add a brief description'/>
                    </div>
                    
                 </div>
                 <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">  
                     <p class="text-white text-xs italic">Do you offer this service in your complete supply area</p>                    
                       <select {...formik.getFieldProps('sarea')}
                      class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                            <option value="" label="choose an option" />
                                  {sareaOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                        </select>
                    </div>        
                 </div>
                 <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">  
                     <p class="text-white text-xs italic">If no: specify the region</p>                    
                       <select {...formik.getFieldProps('sregions')}
                      class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                            <option value="" label="choose an option" />
                                  {sregionsOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                        </select>
                    </div>        
                 </div>

                    <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">  
                     <p class="text-white text-xs italic">Could extend this service with a service from your bonus program</p>                 
                       <select {...formik.getFieldProps('program')}
                              class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                                    <option value="" label="choose an option" />
                                          {programOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                              {option.label}
                                            </option>
                                          ))}
                              </select>
                    </div>
                    
                </div>

                {/* Hearing Aid */}

                <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">
                    <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-password">
                                    Hearing Aids
                     </label>   
                     <p class="text-white text-xs italic">
                      Services for hearing aids Do you provide additional services 
                      beyond the legal framework of $33 5GB V </p>
                    
                      <select {...formik.getFieldProps('hearingaid')}
                              class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                                    <option value="" label="choose an option" />
                                          {hearingaidOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                              {option.label}
                                            </option>
                                       ))}
                            </select>
                    </div>
                    
                 </div>
                 <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">   
                     <p class="text-white text-xs italic">If: yes how often?</p>
                    
                     <input {...formik.getFieldProps('whichone')} 
                          class="appearance-none block w-full bg-gray-800 text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-slate-600 focus:border-gray-900 rounded-full" 
                          id="grid-password" type="text" placeholder='add a brief description'/>
                    </div>
                    
                 </div>
                 <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">  
                     <p class="text-white text-xs italic">Do you offer this service in your complete supply area</p>                    
                       <select {...formik.getFieldProps('harea')}
                      class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                            <option value="" label="choose an option" />
                                  {hareaOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                        </select>
                    </div>        
                 </div>
                 <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">  
                     <p class="text-white text-xs italic">If no: specify the region</p>                    
                       <select {...formik.getFieldProps('hregions')}
                      class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                            <option value="" label="choose an option" />
                                  {hregionsOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                        </select>
                    </div>        
                 </div>

                    <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">  
                     <p class="text-white text-xs italic">Could extend this service with a service from your bonus program</p>                 
                       <select {...formik.getFieldProps('service')}
                              class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                                    <option value="" label="choose an option" />
                                          {serviceOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                              {option.label}
                                            </option>
                                          ))}
                              </select>
                    </div>
                    
                </div>

                {/* Childbirth preparation */}

                <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">
                    <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-password">
                                         Childbirth preparation Course
                     </label>   
                     <p class="text-white text-xs italic">
                             Do you perform skin cancer prevention examination 
                             even below the legally specified age of 35 </p>
                    
                      <select {...formik.getFieldProps('preparation')}
                              class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                                    <option value="" label="choose an option" />
                                          {preparationOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                              {option.label}
                                            </option>
                                       ))}
                            </select>
                    </div>
                    
                 </div>
                 <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">   
                     <p class="text-white text-xs italic">If: yes how often?</p>
                    
                     <input {...formik.getFieldProps('volume')} 
                          class="appearance-none block w-full bg-gray-800 text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-slate-600 focus:border-gray-900 rounded-full" 
                          id="grid-password" type="text" placeholder='add a brief description'/>
                    </div>
                    
                 </div>
                 <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">  
                     <p class="text-white text-xs italic">Do you offer this service in your complete supply area</p>                    
                       <select {...formik.getFieldProps('carea')}
                      class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                            <option value="" label="choose an option" />
                                  {careaOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                        </select>
                    </div>        
                 </div>
                 <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">  
                     <p class="text-white text-xs italic">If no: specify the region</p>                    
                       <select {...formik.getFieldProps('cregions')}
                      class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                            <option value="" label="choose an option" />
                                  {cregionsOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                        </select>
                    </div>        
                 </div>

                    <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">  
                     <p class="text-white text-xs italic">Could extend this service with a service from your bonus program</p>                 
                       <select {...formik.getFieldProps('cprogram')}
                              class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                                    <option value="" label="choose an option" />
                                          {cprogramOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                              {option.label}
                                            </option>
                                          ))}
                              </select>
                    </div>
                    
                </div>
                          {/* childbirth */}

                          <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">
                    <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-password">
                                    Childbirth 
                     </label>   
                     <p class="text-white text-xs italic">
                             Are there offers of additional services for pregnancy and child birth beyond
                             the legal foundations </p>
                    
                      <select {...formik.getFieldProps('foundation')}
                              class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                                    <option value="" label="choose an option" />
                                          {foundationOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                              {option.label}
                                            </option>
                                       ))}
                            </select>
                    </div>
                    
                 </div>
                 <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">   
                     <p class="text-white text-xs italic">If: yes how often?</p>
                    
                     <input {...formik.getFieldProps('child')} 
                          class="appearance-none block w-full bg-gray-800 text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-slate-600 focus:border-gray-900 rounded-full" 
                          id="grid-password" type="text" placeholder='add a brief description'/>
                    </div>
                    
                 </div>
                 <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">  
                     <p class="text-white text-xs italic">Do you offer this service in your complete supply area</p>                    
                       <select {...formik.getFieldProps('farea')}
                      class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                            <option value="" label="choose an option" />
                                  {fareaOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                        </select>
                    </div>        
                 </div>
                 <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">  
                     <p class="text-white text-xs italic">If no: specify the region</p>                    
                       <select {...formik.getFieldProps('fregions')}
                      class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                            <option value="" label="choose an option" />
                                  {fregionsOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                        </select>
                    </div>        
                 </div>

                    <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">  
                     <p class="text-white text-xs italic">Could extend this service with a service from your bonus program</p>                 
                       <select {...formik.getFieldProps('fprogram')}
                              class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded-full">
                                    <option value="" label="choose an option" />
                                          {fprogramOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                              {option.label}
                                            </option>
                                          ))}
                              </select>
                    </div>
                    
                </div>
                  <div class=" md:-mb-90">
                <button className={styles.btn} type='submit'>save questionnaire</button>
                </div>
            </form>
        </div>
    </div>
</div>
      </div>
     </div>
  )
}

