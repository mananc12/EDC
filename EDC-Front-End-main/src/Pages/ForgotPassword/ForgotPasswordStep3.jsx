import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { forgotPasswordSchemaStep3 } from '../../validation/formSchema'
import '../../styles/login.scss'
import '../../styles/signup.scss'
import lock from '../../assets/icons/svg/lock.svg'
import eyeOff from '../../assets/icons/svg/eye-off.svg'
import { API, ForgotPassword } from '../../Api/Post'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useMutation } from '@tanstack/react-query'

const initialValues = {
  new_password: '',
  confirm_password: '',
}

const SignUpStep3 = (email) => {
  const navigate = useNavigate()
  const forgotPasswordMutation = ForgotPassword()

  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const [isLoading, setIsLoading] = useState(false)

  const [passwordHidden1, setPasswordHidden1] = useState(true)
  const [passwordHidden2, setPasswordHidden2] = useState(true)

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchemaStep3,
    onSubmit: (values) => {
      setIsLoading(true)

      const body = {
        email: email.email,
        newPassword: values.new_password,
        confirmNewPassword: values.confirm_password,
      }
      // forgotPasswordMutation.mutate(body,{onSuccess:()=>{setOpen(true)}, onError:()=>{setOpen(true)}})
      // forgotPasswordMutation.isSuccess
      //   ? setTimeout(() => {
      //       setIsLoading(false)
      //       navigate('/login')
      //     }, 1000)
      //   : setIsLoading(true)
      forgotPasswordMutation.mutate(body)
      setOpen(true)
      forgotPasswordMutation.isSuccess
        ? setTimeout(() => {
            navigate('/login')
          }, 5000)
        : setIsLoading(true)
    },
  })

  return (
    <>
      {forgotPasswordMutation.isError && (
        <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {/* {error} */}
            Error
          </Alert>
        </Snackbar>
      )}
      {forgotPasswordMutation.isSuccess && (
        <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Password Changed
          </Alert>
        </Snackbar>
      )}

      <div className="login__head">
        <h2>Create New Password</h2>
        <p>Enter the new password for your account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="new_password">New Password</label>
          <div className="input-block__input">
            <span>
              <img src={lock} alt="" />
            </span>
            <input
              type={passwordHidden1 ? 'password' : 'text'}
              id="new_password"
              name="new_password"
              value={values.new_password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="New Password"
            />
            <span className="hide-password" onClick={() => setPasswordHidden1(!passwordHidden1)}>
              <img src={eyeOff} alt="" />
            </span>
          </div>
          {errors.new_password && touched.new_password ? (
            <p className="input-block__error">{errors.new_password}</p>
          ) : null}
        </div>
        <div className="input-block">
          <label htmlFor="confirm_password">Confirm Password</label>
          <div className="input-block__input">
            <span>
              <img src={lock} alt="" />
            </span>
            <input
              type={passwordHidden2 ? 'password' : 'text'}
              id="confirm_password"
              name="confirm_password"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm Password"
            />
            <span className="hide-password" onClick={() => setPasswordHidden2(!passwordHidden2)}>
              <img src={eyeOff} alt="" />
            </span>
          </div>
          {errors.confirm_password && touched.confirm_password ? (
            <p className="input-block__error">{errors.confirm_password}</p>
          ) : null}
        </div>
        <div className="input-block">
          <button disabled={isLoading} className="submit-btn" type="submit">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-b-4 border-blue-500"></div>
              </div>
            ) : (
              'Reset Password'
            )}
          </button>
        </div>
      </form>
    </>
  )
}

export default SignUpStep3
