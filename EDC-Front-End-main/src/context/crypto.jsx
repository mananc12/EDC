// crypto.js
import CryptoJS from 'crypto-js'
// to create key if lost
// const secretKey = [...new Uint8Array(32)]
//   .map(() => Math.floor(Math.random() * 256))
//   .toString()
// const iv = [...new Uint8Array(16)]
//   .map(() => Math.floor(Math.random() * 256))
//   .toString()

const secretKey = process.env.REACT_APP_SECRET_KEY
const iv = process.env.REACT_APP_IV

export const encryptData = (data) => {
  const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey, {
    iv,
  }).toString()
  return cipherText
}

export const decryptData = (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey, { iv })
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return decryptedData
  } catch (error) {
    throw new Error('Invalid encrypted data', error)
  }
}
