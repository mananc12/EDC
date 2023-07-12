import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { CreateNewAdmin, GetAllAdmin } from '../../../Api/Post'
import { adminAddSchema } from '../../../validation/formSchema'
import '../styles/adminAddForm.scss'
import { useFormik,Field, Formik } from 'formik'
import { Alert, Select, Snackbar } from '@mui/material'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'


const AdminAddModal = ({ isOpen, onClose }) => {

const dropOptions = [
  // { value: '', label: 'Not Select' }, // Option for "not select"
  { value: ' admin', label: 'admin' },
  { value: 'master admin', label: 'master admin' },
  { value: 'student', label: 'student' },

  
]
const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role:''
  }
  const { state } = useContext(AuthContext)
  const { refetch } = GetAllAdmin(state.token)
  const [openMsg, setOpenMsg] = useState('')
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const options = ['Valsad Startup Studio', 'Rajkot Startup Studio', 'Ahemdabad Startup Studio', 'Surat Startup Studio']
  const [branch, setBranch] = useState([options[0]])

  const handleClose = () => onClose()
  const handleRefresh = () => {
    refetch()
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
  const dropDownStyle={
    backgroundColor: "#f3ebeb",
    borderRadius: "5px",
    padding: "0.3rem 3rem",
    outline: "none",
    border: "1px solid grey"
}
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: adminAddSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      const body = { ...values, branch }
      try {
        const res = await CreateNewAdmin(body, state.token)
        console.log(`first`, res)
        if (res?.response?.status === 400) {
          setIsLoading(false)
          setOpenMsg(res?.response?.data?.message)
        }
        if (res?.status === 200) {
          setOpenMsg(res?.data?.message)
          setOpen(true)
          resetForm()
          handleClose()
          handleRefresh()
        }
      } catch (error) {
        setOpenMsg(error?.message)
        resetForm()
        setIsLoading(false)
      }
    },
  })

  return (
    <Formik>
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {openMsg && openMsg}
        </Alert>
      </Snackbar>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="w-full bg-gray-100 shadow-xl rounded-md p-5">
            <div className="admin-add">
              <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  {openMsg && openMsg}
                </Alert>
              </Snackbar>
              <form onSubmit={handleSubmit} className="admin-add__form">
                <h1
                  className="w-full text-2xl text-center font-light"
                >
                  Add New Admin
                </h1>

                <div className="grid cols-span-12 gap-5 w-full max-w-3xl">
                  <div className="input__container col-span-6">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      className="border border-gray-400"
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="First Name"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstName && touched.firstName ? (
                      <p className="input-block__error">{errors.firstName}</p>
                    ) : null}
                  </div>
                  <div className="input__container col-span-6">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      className="border border-gray-400"
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Last Name"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.lastName && touched.lastName ? (
                      <p className="input-block__error">{errors.lastName}</p>
                    ) : null}
                  </div>
                  <div className="input__container col-span-6">
                    <label htmlFor="email">Email</label>
                    <input
                      className="border border-gray-400"
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Enter Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? <p className="input-block__error">{errors.email}</p> : null}
                  </div>
                  <div className="input__container col-span-6">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      className="border border-gray-400"
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="(+123) 9876543210"
                    />
                    {errors.phoneNumber && touched.phoneNumber ? (
                      <p className="input-block__error">{errors.phoneNumber}</p>
                    ) : null}
                  </div>
                  <div className="input__container col-span-6">
                    <label htmlFor="password">Password</label>
                    <input
                      className="border border-gray-400"
                      type="text"
                      name="password"
                      id="password"
                      placeholder="Enter Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password ? (
                      <p className="input-block__error">{errors.password}</p>
                    ) : null}
                  </div>
                  {/* for dropdown part */}
                  <div className="input__container col-span-6">
                    <label htmlFor="lastName">Role</label>
                    <Field
                     as="select"
                    //  type="text"
                     style={dropDownStyle}
                     name="role"
                     id="role"
                     value={values.role}
                     onChange={handleChange}
                     onBlur={handleBlur}
                    >
                     {dropOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                     ))}
                    </Field>
                  
                    {errors.role && touched.role ? (
                      <p className="input-block__error">{errors.role}</p>
                    ) : null}
                  </div>
                  {/* for branch */}
                  <div className="col-span-12  mb-5">
                    <label htmlFor="tags-filled">Branches</label>
                    <Autocomplete
                      multiple
                      id="tags-filled"
                      options={options}
                      defaultValue={[options[0]]}
                      freeSolo
                      className="bg-white "
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          className="bg-[#f3ebeb] max-w-md"
                          name="branch"
                          {...params}
                          variant="outlined"
                          label=""
                          placeholder="Branches"
                          sx={{
                            outline: 'none',
                          }}
                        />
                      )}
                      onChange={(event, value) => setBranch(value)}
                    />
                  </div>
                </div>
                <div className="w-full flex justify-center items-center">
                  <span className="text-xl text-red-500  mx-auto text-center px-2 py-2"> {openMsg && openMsg}</span>
                </div>
                {isLoading ? (
                  <button className="admin-add__submit" type="button" disabled>
                    Submitting...
                  </button>
                ) : (
                  <button className="admin-add__submit" type="submit">
                    Add Admin
                  </button>
                )}
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
    </Formik>
  )
}

export default AdminAddModal
