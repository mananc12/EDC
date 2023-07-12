import React, { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Button, styled, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import '../../styles/form.scss'
import { API } from '../../Api/Post'
import { userCommonApplicationFormSchema } from '../../validation/formSchema'
import { useFormik } from 'formik'
import { SubmitApplicationForm } from '../../Api/Post'

const initialValues = {
  name: '',
  email: '',
  contact: '',
  location: '', // applying from - PU, VSS, ASS, RSS, SSS
  institute: '',
  otherInstitute: '',
  aadhar: '',
  category: '', // application category - student,staff,alumni,other
  categoryOther: '', //
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

const Form = ({ refetchStartupStatus }) => {
  const { state } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const handleClose = () => {
    setOpen(false)
    refetchStartupStatus()
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: userCommonApplicationFormSchema,
    onSubmit: async (values) => {
      console.log(values)
      const token = state.token
      try {
        const res = await SubmitApplicationForm({ values, token })
        console.log(res.message)
        setFormSuccess(true)
        setOpen(true)
      } catch (error) {
        console.error(error)
        setFormSuccess(true)
        setOpen(true)
      }
    },
  })

  const companyName = (state.isAuthenticated && `Hi, ${state?.firstName} ${state?.lastName}`) || `Welcome please Login`

  const SubmitBtn = styled(Button)({
    backgroundColor: '#0193DC',
    padding: '12px 40px',
    fontSize: 20,
    fontFamily: 'Open sans',
    fontWeight: 600,
    textTransform: 'none',
    letterSpacing: 0.7,
    borderRadius: 7,
  })

  return (
    <div className="form-section">
      <div className="form-container">
        <div className="form-header">
          <h1> {companyName}</h1>
        </div>

        <div className="form-contents">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" value={values.name} onChange={handleChange} onBlur={handleBlur} required />
              {errors.name && touched.name ? <p className="form-row__error">{errors.name}</p> : null}
            </div>

            <div className="form-row">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.email && touched.email ? <p className="form-row__error">{errors.email}</p> : null}
            </div>

            <div className="form-row">
              <label htmlFor="contact">Contact:</label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={values.contact}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.contact && touched.contact ? <p className="form-row__error">{errors.contact}</p> : null}
            </div>

            <div className="form-row">
              <label htmlFor="location">Location:</label>
              <select
                id="location"
                name="location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              >
                <option value="">Select location</option>
                <option value="Parul University">Parul University</option>
                <option value="Vadodara Startup Studio">Vadodara Startup Studio</option>
                <option value="Ahmedabad Startup Studio">Ahmedabad Startup Studio</option>
                <option value="Rajkot Startup Studio">Rajkot Startup Studio</option>
                <option value="Surat Startup Studio">Surat Startup Studio</option>
              </select>
              {errors.location && touched.location ? <p className="form-row__error">{errors.location}</p> : null}
            </div>

            {values.location === 'Parul University' && (
              <div className=" additional-input show">
                <div className="form-row">
                  <label htmlFor="institute">Applicant Institute/Organization Name</label>
                  <select
                    id="institute"
                    name="institute"
                    value={values.institute}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Parul Institute of Engineering & Technology (PIET)">
                      Parul Institute of Engineering & Technology (PIET)
                    </option>
                    <option value="Parul Institute of Technology (PIT)">Parul Institute of Technology (PIT)</option>
                    <option value="Parul Polytechnic Institute (PPI)">Parul Polytechnic Institute (PPI)</option>
                    <option value="Parul Institute of Engineering & Technology - Diploma Studies (PIET-DS)">
                      Parul Institute of Engineering & Technology - Diploma Studies (PIET-DS)
                    </option>
                    <option value="College of Agriculture">College of Agriculture</option>
                    <option value="Parul Institute of Commerce">Parul Institute of Commerce</option>
                    <option value="Parul Institute of Social Work">Parul Institute of Social Work</option>
                    <option value="Parul Institute of Business Administration">
                      Parul Institute of Business Administration
                    </option>
                    <option value="Parul Institute of Management and Research">
                      Parul Institute of Management and Research
                    </option>
                    <option value="Parul Institute of Ayurveda">Parul Institute of Ayurveda</option>
                    <option value="Parul Institute of Ayurveda and Research">
                      Parul Institute of Ayurveda and Research
                    </option>
                    <option value="Jawaharlal Nehru Homeopathic Medical College">
                      Jawaharlal Nehru Homeopathic Medical College
                    </option>
                    <option value="Rajkot Homoeopathic Medical College">Rajkot Homoeopathic Medical College</option>
                    <option value="Parul Institute of Homeopathy & Research">
                      Parul Institute of Homeopathy & Research
                    </option>
                    <option value="Ahmedabad Homoeopathic Medical College">
                      Ahmedabad Homoeopathic Medical College
                    </option>
                    <option value="Parul Institute of Law">Parul Institute of Law</option>
                    <option value="Parul Institute of Computer Application">
                      Parul Institute of Computer Application
                    </option>
                    <option value="Parul Institute of Architecture & Research">
                      Parul Institute of Architecture & Research
                    </option>
                    <option value="Parul institute of Design">Parul institute of Design</option>
                    <option value="Parul Institute of Fine Arts">Parul Institute of Fine Arts</option>
                    <option value="Parul Institute of Nursing">Parul Institute of Nursing</option>
                    <option value="Parul Institute of Pharmacy">Parul Institute of Pharmacy</option>
                    <option value="Parul Institute of Pharmacy & Research">
                      Parul Institute of Pharmacy & Research
                    </option>
                    <option value="School of Pharmacy">School of Pharmacy</option>
                    <option value="Parul Institute of Hotel Management and Catering Technology">
                      Parul Institute of Hotel Management and Catering Technology
                    </option>
                    <option value="Parul Institute of Applied Sciences">Parul Institute of Applied Sciences</option>
                    <option value="Parul Institute of Arts">Parul Institute of Arts</option>
                    <option value="Parul Institute of Medical Science & Research">
                      Parul Institute of Medical Science & Research
                    </option>
                    <option value="Department of Public Health">Department of Public Health</option>
                    <option value="Department of Paramedical and Health Science">
                      Department of Paramedical and Health Science
                    </option>
                    <option value="Ahmedabad Physiotherapy College">Ahmedabad Physiotherapy College</option>
                    <option value="Parul Institute of Physiotherapy">Parul Institute of Physiotherapy</option>
                    <option value="other">other</option>
                  </select>
                  {errors.institute && touched.institute ? <p className="form-row__error">{errors.institute}</p> : null}
                </div>

                {values.institute === 'other' && (
                  <div className="form-row additional-input show">
                    <label htmlFor="otherInstitute">Specify Other:</label>
                    <input
                      type="text"
                      id="otherInstitute"
                      name="otherInstitute"
                      value={values.otherInstitute}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.otherInstitute && touched.otherInstitute ? (
                      <p className="form-row__error">{errors.otherInstitute}</p>
                    ) : null}
                  </div>
                )}

                <div className="form-row">
                  <label htmlFor="category">Applicant Category:</label>
                  <select
                    id="category"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  >
                    <option value="">Select location</option>
                    <option value="Parul University Student">Parul University Student</option>
                    <option value="Parul University Staff member">Parul University Staff member</option>
                    <option value="Parul University Alumni">Parul University Alumni</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.category && touched.category ? <p className="form-row__error">{errors.category}</p> : null}
                </div>

                {values.category === 'Other' && (
                  <div className="form-row additional-input show">
                    <label htmlFor="categoryOther">Specify Other:</label>
                    <input
                      type="text"
                      id="categoryOther"
                      name="categoryOther"
                      value={values.categoryOther}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.categoryOther && touched.categoryOther ? (
                      <p className="form-row__error">{errors.categoryOther}</p>
                    ) : null}
                  </div>
                )}

                <div className="form-row">
                  <label htmlFor="enrollmentNum">Applicant Enrollment Number/Employee ID/Alumini ID number</label>
                  <input
                    type="text"
                    id="enrollmentNum"
                    name="enrollmentNum"
                    value={values.enrollmentNum}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.enrollmentNum && touched.enrollmentNum ? (
                    <p className="form-row__error">{errors.enrollmentNum}</p>
                  ) : null}
                </div>

                <div className="form-row">
                  <label htmlFor="teamMembers">
                    Name of Team Members <span>(Separated by comma)</span>
                  </label>
                  <input
                    type="text"
                    id="teamMembers"
                    name="teamMembers"
                    value={values.teamMembers}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.teamMembers && touched.teamMembers ? (
                    <p className="form-row__error">{errors.teamMembers}</p>
                  ) : null}
                </div>

                <div className="form-row">
                  <label htmlFor="title">Title of the Startup/Idea/Innovation</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.title && touched.title ? <p className="form-row__error">{errors.title}</p> : null}
                </div>

                <div className="form-row">
                  <label htmlFor="uniqueFeatures">
                    Explain the uniqueness and distinctive features of the ( product / process / service ) solution
                  </label>
                  <input
                    type="text"
                    id="uniqueFeatures"
                    name="uniqueFeatures"
                    value={values.uniqueFeatures}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.uniqueFeatures && touched.uniqueFeatures ? (
                    <p className="form-row__error">{errors.uniqueFeatures}</p>
                  ) : null}
                </div>

                <div className="form-row">
                  <label htmlFor="currentStage">Current stage of Startup</label>
                  <select
                    id="currentStage"
                    name="currentStage"
                    value={values.currentStage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Idea">Idea</option>
                    <option value="Prototype stage">
                      Prototype stage (If you have developed any working prototype of a solution proposed)
                    </option>
                    <option value="Startup Stage">
                      Startup Stage (If you have developed a final marketable product/service platform)
                    </option>
                  </select>
                  {errors.currentStage && touched.currentStage ? (
                    <p className="form-row__error">{errors.currentStage}</p>
                  ) : null}
                </div>

                <div className="submitButton">
                  {!state.isAuthenticated ? (
                    <SubmitBtn variant="contained" type="submit" disabled>
                      Submit
                    </SubmitBtn>
                  ) : (
                    <SubmitBtn variant="contained" type="submit">
                      Submit
                    </SubmitBtn>
                  )}
                </div>
              </div>
            )}

            {(values.location === 'Vadodara Startup Studio' ||
              values.location === 'Surat Startup Studio' ||
              values.location === 'Rajkot Startup Studio' ||
              values.location === 'Ahmedabad Startup Studio') && (
              <div className="additional-input show">
                <div className="form-row">
                  <label htmlFor="aadhar">Aadhar:</label>
                  <input
                    type="text"
                    id="aadhar"
                    name="aadhar"
                    value={values.aadhar}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.aadhar && touched.aadhar ? <p className="form-row__error">{errors.aadhar}</p> : null}
                </div>

                <div className="form-row">
                  <label htmlFor="category">Applicant Category:</label>
                  <select
                    id="category"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Other University Student">Other University Student</option>
                    <option value="Other University Staff member">Other University Staff member</option>
                    <option value="Organisation">Organisation</option>
                  </select>
                  {errors.category && touched.category ? <p className="form-row__error">{errors.category}</p> : null}
                </div>

                {(values.category === 'Other University Student' || values.category === 'Other University Staff') && (
                  <div className="form-row additional_input show">
                    <label htmlFor="otherUniversity">University name:</label>
                    <input
                      type="text"
                      id="otherUniversity"
                      name="otherUniversity"
                      value={values.otherUniversity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.otherUniversity && touched.name ? <p className="form-row__error">{errors.name}</p> : null}
                  </div>
                )}
                {values.category === 'Organisation' && (
                  <div className="additional_input show">
                    <div className="form-row">
                      <label htmlFor="otherOrganisation">Organisation name:</label>
                      <input
                        type="text"
                        id="otherOrganisation"
                        name="otherOrganisation"
                        value={values.otherOrganisation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {errors.otherOrganisation && touched.otherOrganisation ? (
                        <p className="form-row__error">{errors.otherOrganisation}</p>
                      ) : null}
                    </div>
                    <div className="form-row">
                      <label htmlFor="designation">Your Designation:</label>
                      <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={values.designation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {errors.designation && touched.designation ? (
                        <p className="form-row__error">{errors.designation}</p>
                      ) : null}
                    </div>
                  </div>
                )}

                <div className="form-row">
                  <label htmlFor="temSize">No. of other team members</label>
                  <input
                    type="text"
                    id="teamSize"
                    name="teamSize"
                    value={values.teamSize}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.teamSize && touched.teamSize ? <p className="form-row__error">{errors.teamSize}</p> : null}
                </div>

                <div className="form-row">
                  <label htmlFor="teamMembers">
                    Name of Team Members <span>Separated by comma</span>
                  </label>
                  <input
                    type="text"
                    id="teamMembers"
                    name="teamMembers"
                    value={values.teamMembers}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.teamMembers && touched.teamMembers ? (
                    <p className="form-row__error">{errors.teamMembers}</p>
                  ) : null}
                </div>

                <div className="form-row">
                  <label htmlFor="title">Title of the Startup/Idea/Innovation</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.title && touched.title ? <p className="form-row__error">{errors.title}</p> : null}
                </div>

                <div className="form-row">
                  <label htmlFor="uniqueFeatures">
                    Explain the uniqueness and distinctive features of the ( product / process / service ) solution
                  </label>
                  <input
                    type="text"
                    id="uniqueFeatures"
                    name="uniqueFeatures"
                    value={values.uniqueFeatures}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.uniqueFeatures && touched.uniqueFeatures ? (
                    <p className="form-row__error">{errors.uniqueFeatures}</p>
                  ) : null}
                </div>

                <div className="form-row">
                  <label htmlFor="currentStage">Current stage of Startup</label>
                  <select
                    id="currentStage"
                    name="currentStage"
                    value={values.currentStage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Idea">Idea</option>
                    <option value="Prototype stage">
                      Prototype stage (If you have developed any working prototype of a solution proposed)
                    </option>
                    <option value="Startup Stage">
                      Startup Stage (If you have developed a final marketable product/service platform)
                    </option>
                  </select>
                  {errors.currentStage && touched.currentStage ? (
                    <p className="form-row__error">{errors.currentStage}</p>
                  ) : null}
                </div>

                <div className="submitButton">
                  {!state.isAuthenticated ? (
                    <SubmitBtn variant="contained" type="submit" disabled>
                      Submit
                    </SubmitBtn>
                  ) : (
                    <SubmitBtn variant="contained" type="submit">
                      Submit
                    </SubmitBtn>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{formSuccess ? 'Form submitted successfully!' : 'Error!'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {formSuccess ? 'Your application has been submitted successfully.' : 'Check form details again.'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default Form
