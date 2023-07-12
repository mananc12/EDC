import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { API, ResendOtp } from '../../Api/Post'
import { forgotPasswordSchemaStep1 } from '../../validation/formSchema'
import '../../styles/login.scss'
import '../../styles/signup.scss'
import mail from '../../assets/icons/svg/mail.svg'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useMutation } from '@tanstack/react-query'

const initialValues = {
  email: '',
}

const SignUpStep1 = ({ setEmail }) => {
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const resendMutation = ResendOtp()

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchemaStep1,
    onSubmit: (values) => {
      setIsLoading(true)

      setEmail(values.email)
      const body = { email: values.email, isForgotPassword: true }
      //POST REQUEST
      // resendMutation.mutate(body,
      //   {
      //     onError:()=>{setIsLoading(false)},
      //     onSuccess:()=>{setIsLoading(false); navigate('/forgot-password/2')}
      //   });
      resendMutation.mutate(body)

      setOpen(true)
      resendMutation.isSuccess
        ? setTimeout(() => {
            setIsLoading(false)
            navigate('/forgot-password/2')
          }, 10000)
        : setIsLoading(false)

      // API('post', '/api/users/resend-otp', body, '')
      //   .then((response) => {
      //     setTimeout(() => {
      //       navigate('/forgot-password/2')
      //       setIsLoading(false)
      //     }, 1000)
      //   })
      //   .catch((error) => {
      //     console.error(error)
      //     setError(error.response.data.message)
      //     setOpen(true)
      //     setTimeout(() => {
      //       setIsLoading(false)
      //     }, 1000)
      //   })

      // resendMutation.isSuccess ? setIsLoading(false).then(()=> navigate('/forgot-password/2')) : setIsLoading(false);
    },
  })

  return (
    <>
      {resendMutation.isError && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {resendMutation.error.message}
          </Alert>
        </Snackbar>
      )}
      {resendMutation.isSuccess && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {resendMutation.data.message}
          </Alert>
        </Snackbar>
      )}
      <div className="login__head">
        <h2>Forgot Password</h2>
        <p>Enter the email of your account and we will send the email to reset your password</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="email">Email</label>
          <div className="input-block__input">
            <span>
              <img src={mail} alt="" />
            </span>
            <input
              type="text"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your email"
            />
          </div>
          {errors.email && touched.email ? <p className="input-block__error">{errors.email}</p> : null}
        </div>
        <div className="input-block">
          <button disabled={isLoading} className="submit-btn" type="submit">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-b-4 border-blue-500"></div>
              </div>
            ) : (
              'Next'
            )}
          </button>
        </div>
      </form>
    </>
  )
}

export default SignUpStep1
