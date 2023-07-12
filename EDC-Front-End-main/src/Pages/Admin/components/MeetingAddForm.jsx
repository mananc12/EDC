import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { meetingAddSchema } from '../../../validation/formSchema'
import '../styles/adminAddForm.scss'
import { useFormik } from 'formik'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { GetStartupsUserEmail } from '../../../Api/Post'
import { useEffect } from 'react'

const initialValues = {
  title: '',
  dateTime: '',
  link: '',
}

const MeetingAddForm = ({ submitMeetingData, array }) => {
  const { state } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [membersData, setMembersData] = useState([])
  const [membersError, setMembersError] = useState(null)
  const token = state.token
  const { data: Data } = GetStartupsUserEmail(token)
  const data = Data?.data?.data
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues,
    validationSchema: meetingAddSchema,
    onSubmit: async (values) => {
      if (membersData.length !== 0) {
        setMembersError(null)
        setIsLoading(true)
        const body = {
          title: values.title,
          link: values.link,
          type: 'meeting',
          dateAndTime: values.dateTime,
          members: membersData,
        }
        //POST REQUEST
        try {
          const res = await submitMeetingData(body)
          resetForm()
          setIsLoading(false)
        } catch (error) {
          setIsLoading(false)
        }
      } else {
        setMembersError('Atleast choose one member')
      }
    },
  })

  const handleMembersData = (values) => {
    const selectedMembers = data?.filter((email) => values.includes(email))
    setMembersData(selectedMembers)
  }
  return (
    <div className="admin-add">
      <form onSubmit={handleSubmit} className="admin-add__form overflow-hidden">
        <h1
          className="w-full text-2xl text-center font-light
        "
        >
          Add New Meeting
        </h1>
        <div className="grid cols-span-12 w-full gap-3 max-w-5xl">
          <div className="input__container col-span-6 w-full">
            <label htmlFor="firstName">Title</label>
            <input
              className="border border-gray-400 w-full"
              type="text"
              name="title"
              id="title"
              placeholder="Enter Title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.title && touched.title ? <p className="input-block__error">{errors.title}</p> : null}
          </div>

          <div className="input__container w-full col-span-6">
            <label htmlFor="dateTime">Date and Time</label>
            <input
              className="border border-gray-400"
              type="datetime-local"
              name="dateTime"
              id="dateTime"
              value={values.dateTime}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.dateTime && touched.dateTime ? <p className="input-block__error">{errors.dateTime}</p> : null}
          </div>

          <div className="col-span-12   mb-5">
            <label htmlFor="link">Meeting Link</label>
            <input
              className="border rounded-md bg-[#f3ebeb] w-full py-2 border-gray-400"
              type="tel"
              id="link"
              name="link"
              value={values.link}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.link && touched.link ? <p className="input-block__error">{errors.link}</p> : null}
          </div>

          <div className="col-span-12  mb-5">
            <label htmlFor="tags-filled">Members</label>
            <Autocomplete
              multiple
              id="tags-filled"
              options={data?.map((option) => option)}
              defaultValue={[]}
              freeSolo
              className="bg-white "
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" key={index} label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  className="bg-[#f3ebeb] max-w-xl max-h-60 overflow-auto"
                  name="branch"
                  {...params}
                  variant="outlined"
                  label=""
                  placeholder="Choose Members"
                  sx={{
                    outline: 'none',
                  }}
                />
              )}
              onChange={(event, value) => handleMembersData(value)}
            />
            {membersError ? <p className="input-block__error">{membersError}</p> : null}
          </div>
        </div>
        {isLoading ? (
          <button className="admin-add__submit" type="button" disabled>
            Submitting...
          </button>
        ) : (
          <button className="admin-add__submit" type="submit">
            Schedule Meeting
          </button>
        )}
      </form>
    </div>
  )
}

export default MeetingAddForm
