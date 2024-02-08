// Navbar.js
import React from 'react';
import { useFormik } from 'formik';
import useFetch from '../hooks/fetch.hook';
import { profileValidation } from '../helper/validate';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';


const Navbar = () => {
    const [{  apiData }] = useFetch();
    const formik = useFormik({
        initialValues : {
          
    
          email: apiData?.email || "",
        },
        enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    })
  return (
    <div className="navbar bg-gray-800 p-4 text-white flex justify-between items-center">
    <div>
      {/* Add additional navbar content or links here */}
    </div>
    <h1 className="text-2xl font-bold"><input {...formik.getFieldProps('email')} 
                  className={`${styles.textbox} ${extend.textbox}`} 
                  type="text" placeholder='email' /></h1>
  </div>
  );
};

export default Navbar;
