import React, { useContext } from 'react'
import { useFormik } from 'formik'
import { useLocation } from 'react-router-dom'
import { SubmitFinance } from '../../../Api/Post'
import { AuthContext } from '../../../context/AuthContext'
import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'
const FinanceSection = () => {
  const { state } = useContext(AuthContext)
  const mutation = SubmitFinance()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  let startupId = location.state.startupId

  // Initial form values
  const initialValues = {
    startupId: startupId,
    netBalance: '',
    finance: [
      {
        date: '',
        type: '',
        amount: '',
        remark: '',
        transactionDetail: '',
        billInvoiceLink: '',
      },
    ],
  }

  // Form validation

  const { values, errors, touched, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues,

    onSubmit: async (values) => {
      const body = {
        startupId: values.startupId,
        finance: {
          date: values.dateTime,
          type: values.type,
          amount: values.amount,
          remark: values.remark,
          transactionDetail: values?.transactionDetail,
          billInvoiceLink: values?.billInvoiceLink,
          token: state.token,
        },
      }
      //POST REQUEST
      console.log(body)
      mutation.mutate(body, state.token)
      mutation.isSuccess ? setOpen(true) : setOpen(true)
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    },
  })

  const handleCloseAlert = () => {
    setOpen(!open)
  }
  const handleClose = () => {
    setOpen(!open)
  }

  return (
    <>
      {mutation.isSuccess ? (
        <>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseAlert}>
            <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              {mutation.isSuccess && mutation?.data?.message}
            </Alert>
          </Snackbar>
        </>
      ) : (
        ''
      )}
      {mutation.isError ? (
        <>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseAlert}>
            <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {mutation.isError && mutation.error.message}
            </Alert>
          </Snackbar>
        </>
      ) : (
        ''
      )}

      <div className="admin-add  ml-5">
        <form onSubmit={handleSubmit} className=" ml-5 admin-add__form overflow-hidden">
          <h1
            className="w-full text-2xl text-center font-light
        "
          >
            Finance Manage
          </h1>
          <div className="grid cols-span-12 w-full gap-2 max-w-5xl">
            <div className="input__container col-span-6 w-full">
              <label htmlFor="firstName">Startup Id</label>
              <input
                className="border border-gray-400 w-full"
                type="text"
                name="startupId"
                id="startupId"
                value={values.startupId}
                disabled
              />
            </div>

            <div className="input__container w-full col-span-6">
              <label htmlFor="link">Date</label>
              <input
                className="border rounded-md bg-[#f3ebeb] w-full py-2 border-gray-400"
                type="datetime-local"
                name="dateTime"
                id="dateTime"
                onChange={handleChange}
              />
            </div>
            <div className="input__container w-full col-span-6">
              <label htmlFor="tags-filled">Type</label>

              <select
                onChange={handleChange}
                name="type"
                className="border rounded-md bg-[#f3ebeb] w-full py-2 border-gray-400"
              >
                <option value="Credit ">Credit</option>
                <option value="Debit">Debit</option>
              </select>
            </div>
            <div className="input__container w-full col-span-6">
              <label htmlFor="dateTime">Amount</label>
              <input className="border border-gray-400" type="text" name="amount" id="amount" onChange={handleChange} />
            </div>
            <div className="input__container w-full col-span-6">
              <label htmlFor="dateTime">Remark</label>
              <input className="border border-gray-400" type="text" name="remark" id="remark" onChange={handleChange} />
            </div>
            <div className="input__container w-full col-span-6">
              <label htmlFor="dateTime">TransactionDetail</label>
              <input
                className="border border-gray-400"
                type="text"
                name="transactionDetail"
                id="transactionDetail"
                onChange={handleChange}
              />
            </div>

            <div className="input__container w-full col-span-6">
              <label htmlFor="dateTime">BillInvoiceLink</label>
              <input
                className="border border-gray-400"
                type="text"
                name="billInvoiceLink"
                id="billInvoiceLink"
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="admin-add__submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default FinanceSection
