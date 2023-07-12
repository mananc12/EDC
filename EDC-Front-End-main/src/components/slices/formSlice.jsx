import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  contact: '',
  location: '',
  institute: '',
  otherInstitute: '',
  aadhar: '',
  category: '',
  categoryOther: '',
  otherUniversity: '',
  otherOrganisation: '',
  designation: '',
  enrollmentNum: '',
  teamSize: '',
  teamMembers: '',
  title: '',
  uniqueFeatures: '',
  currentStage: '',
}

const formSlice = createSlice({
  name: 'form',
  initialState,

  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setContact: (state, action) => {
      state.contact = action.payload
    },
    setLocation: (state, action) => {
      state.location = action.payload
    },
    setInstitute: (state, action) => {
      state.institute = action.payload
    },
    setOtherInstitute: (state, action) => {
      state.otherInstitute = action.payload
    },
    setAadhar: (state, action) => {
      state.aadhar = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setCategoryOther: (state, action) => {
      state.categoryOther = action.payload
    },
    setOtherUniversity: (state, action) => {
      state.otherUniversity = action.payload
    },
    setOtherOrganisation: (state, action) => {
      state.otherOrganisation = action.payload
    },
    setOtherDesignation: (state, action) => {
      state.designation = action.payload
    },
    setEnrollment: (state, action) => {
      state.enrollmentNum = action.payload
    },
    setTeamSize: (state, action) => {
      state.teamSize = action.payload
    },
    setTeamMembers: (state, action) => {
      state.teamMembers = action.payload
    },
    setTitle: (state, action) => {
      state.title = action.payload
    },
    setUniqueFeatures: (state, action) => {
      state.uniqueFeatures = action.payload
    },
    setCurrentStage: (state, action) => {
      state.currentStage = action.payload
    },
  },
})

export const {
  setName,
  setEmail,
  setContact,
  setLocation,
  setInstitute,
  setOtherInstitute,
  setAadhar,
  setCategory,
  setCategoryOther,
  setOtherUniversity,
  setOtherOrganisation,
  setOtherDesignation,
  setEnrollment,
  setTeamSize,
  setTeamMembers,
  setTitle,
  setUniqueFeatures,
  setCurrentStage,
} = formSlice.actions

export const formInputs = (state) => state.form
export default formSlice.reducer
