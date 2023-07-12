import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import '../styles/login.scss'
import { loginSchema } from '../validation/formSchema'
import lock from '../assets/icons/svg/lock.svg'
import mail from '../assets/icons/svg/mail.svg'
import eyeOff from '../assets/icons/svg/eye-off.svg'
import facebook from '../assets/icons/svg/facebook.svg'
import google from '../assets/icons/svg/google.svg'
import linkedin from '../assets/icons/svg/linkedin.svg'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useEffect } from 'react'
import { latestPosterStyle } from '../styles/style-object'

const initialValues = {
  email: '',
  password: '',
  rememberMe: false,
}

const Login = () => {
  const [open, setOpen] = useState(false)
  const [openMsg, setOpenMsg] = useState('')
  const handleClose = () => setOpen(false)
  const [passwordHidden, setPasswordHidden] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { state, login } = useContext(AuthContext)
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        const res = await login(values)
        if (res?.data?.status === 200) {
          setOpenMsg(res?.data?.message)
          setOpen(true)
          navigate('/Admin')
          setIsLoading(false)
        }
        if (res?.response?.data?.status === 400) {
          setOpenMsg(res?.response?.data?.message)
          setOpen(true)
          setIsLoading(false)
        }
        if (res?.response?.data?.status === 404) {
          setOpenMsg(res?.response?.data?.message)
          setOpen(true)
          setIsLoading(false)
        }
      } catch (error) {
        setOpenMsg(error?.message)
        setOpen(true)
        setIsLoading(false)
      }
    },
  })

  useEffect(() => {
    setIsLoading(false)
    if (state?.isAuthenticated === false) {
      return navigate('/login')
    }
    if (state?.isAuthenticated === true) {
      return navigate('/Admin')
    }
  }, [state])
  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {openMsg && openMsg}
        </Alert>
      </Snackbar>
      <div className="wrapper">
        <div className="banner">
          <h1 className="banner__text banner__text--1">Welcome to</h1>
          <h1 className="banner__text banner__text--2">PU EDC</h1>
        </div>
        <div className="login__container" style={latestPosterStyle}>
          <div className="signup-link">
            <p>Don't have an account?</p>
            <Link to="/signup/">Signup</Link>
          </div>
          <div className="login__head">
            <h2>Welcome</h2>
            <p>Login to continue</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-block">
              <label htmlFor="email">Email</label>
              <div className="input-block__input">
                <span>
                  <img src={mail} alt="mail" />
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
              <label htmlFor="password">Password</label>
              <div className="input-block__input">
                <span>
                  <img src={lock} alt="lock" />
                </span>
                <input
                  type={passwordHidden ? 'password' : 'text'}
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your password"
                />
                <span className="hide-password" onClick={() => setPasswordHidden(!passwordHidden)}>
                  <img src={eyeOff} alt="eye" />
                </span>
              </div>
              {errors.password && touched.password ? <p className="input-block__error">{errors.password}</p> : null}
            </div>
            <div className="input-block login__remember">
              <div>
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  value={values.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <Link to="/forgot-password/1">Forgot Password?</Link>
            </div>
            <div className="w-full flex justify-center items-center">
              <span className="text-xl text-red-500  mx-auto text-center px-2 py-1"> {openMsg && openMsg}</span>
            </div>
            <div className="input-block">
              <button disabled={isLoading} className="submit-btn" type="submit">
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-b-4 border-blue-500"></div>
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>
          <section className="other-login-options">
            <p>or continue with</p>
            <ul className="other-login-options__list">
              <li className="other-login-options__item">
                <span>
                  <img src={facebook} alt="" />
                </span>
              </li>
              <li className="other-login-options__item">
                <span>
                  <img src={google} alt="" />
                </span>
              </li>
              <li className="other-login-options__item">
                <span>
                  <img src={linkedin} alt="" />
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}

export default Login
