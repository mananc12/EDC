// authReducer.js

import { encryptData } from './crypto'
export const SET_ERROR = 'SET_ERROR'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const authReducer = (state, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload }
    case LOGIN_SUCCESS:
      localStorage.setItem('token', encryptData(action.payload.token))
      localStorage.setItem('pu-edc-at', encryptData(action.payload.token))
      localStorage.setItem('pu-edc-m', encryptData(action.payload.email))
      localStorage.setItem('pu-edc-fn', encryptData(action.payload.firstName))
      localStorage.setItem('pu-edc-ln', encryptData(action.payload.lastName))
      localStorage.setItem('pu-edc-pn', encryptData(action.payload.phoneNumber))
      localStorage.setItem('pu-edc-state', encryptData(action.payload.role))
      localStorage.setItem('pu-edc-exp', encryptData(action.payload.tokenExpTime))
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phoneNumber: action.payload.phoneNumber,
        role: action.payload.role,
        tokenExpTime: action.payload.tokenExpTime,
      }
    case LOGOUT_SUCCESS:
      console.log(`logout trigger`)
      localStorage.setItem('token', encryptData(''))
      localStorage.setItem('pu-edc-at', encryptData(''))
      localStorage.setItem('pu-edc-m', encryptData(''))
      localStorage.setItem('pu-edc-fn', encryptData(''))
      localStorage.setItem('pu-edc-ln', encryptData(''))
      localStorage.setItem('pu-edc-pn', encryptData(''))
      localStorage.setItem('pu-edc-state', encryptData(''))
      localStorage.setItem('pu-edc-exp', encryptData(''))

      return {
        ...state,
        isAuthenticated: false,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        email: null,
        role: null,
        token: null,
      }
    default:
      return state
  }
}
