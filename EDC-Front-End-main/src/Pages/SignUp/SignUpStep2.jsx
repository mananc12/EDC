import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { signupSchemaStep2 } from '../../validation/formSchema'
import '../../styles/login.scss'
import '../../styles/signup.scss'
import axios from 'axios'

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  password: '',
}

const SignUpStep2 = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchemaStep2,
    onSubmit: (values) => {
      setIsLoading(true)

      //POST REQUEST
      // axios
      // .post('url',  )
      // .then((response) => {
      //   setTimeout(() => {
      //     // If successful, redirect to dashboard

      //     navigate('/login')
      //     setIsLoading(false)
      //   }, 2000)
      // })
      // .catch((error) => {
      //   console.error(error)

      //   setTimeout(() => {
      //     // If successful, redirect to dashboard

      //     setIsLoading(false)
      //   }, 2000)
      // })
    },
  })
  const navigate = useNavigate()

  return (
    <>
      <div className="login__head">
        <h2>Register your account</h2>
        <p>Fill the details below to submit register account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="startup_name">Startup Name</label>
          <div className="input-block__input">
            <input
              type="text"
              id="startup_name"
              name="startup_name"
              value={values.startup_name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Startup/Company Name"
            />
          </div>
          {errors.startup_name && touched.startup_name ? (
            <p className="input-block__error">{errors.startup_name}</p>
          ) : null}
        </div>
        <div className="input-block">
          <label htmlFor="applying_to">Applying to</label>
          <select name="applying_to" id="applying_to" className="input-block_input--dropdown">
            <option value="" disabled defaultValue hidden>
              VSS, RSS, AHSS, or Surat Branch
            </option>
            <option value="VSS">VSS</option>
            <option value="RSS">RSS</option>
            <option value="AHSS">AHSS</option>
            <option value="Surat Branch">Surat Branch</option>
          </select>

          {errors.applying_to && touched.applying_to ? (
            <p className="input-block__error">{errors.applying_to}</p>
          ) : null}
        </div>
        <div className="input-block">
          <label htmlFor="applying_to">I'm A</label>
          <select name="profession" id="profession" className="input-block_input--dropdown">
            <option value="" disabled defaultValue hidden>
              PU Student or Working Professional
            </option>
            <option value="student">PU Student</option>
            <option value="professional">Working Professional</option>
          </select>

          {errors.profession && touched.profession ? <p className="input-block__error">{errors.profession}</p> : null}
        </div>
        <div className="input-block">
          <label htmlFor="website_link">Company Website link if available</label>
          <div className="input-block__input">
            <input
              type="text"
              id="website_link"
              name="website_link"
              value={values.website_link}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="www.edc.com"
            />
          </div>
          {errors.website_link && touched.website_link ? (
            <p className="input-block__error">{errors.website_link}</p>
          ) : null}
        </div>
        <div className="input-block__terms">
          By signing in, you're agreeing to our{' '}
          <span>
            <Link>Terms & Condition</Link>
          </span>
          and
          <span>
            <Link>Privacy Policy</Link>*
          </span>
        </div>
        <div className="input-block">
          <button disabled={isLoading} className="submit-btn" type="submit">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-b-4 border-blue-500"></div>
              </div>
            ) : (
              'Continue'
            )}
          </button>
        </div>
      </form>
      <div className="login-link">
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </div>
    </>
  )
}

export default SignUpStep2
