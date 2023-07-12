import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Snackbar } from '@mui/material'
import { GetAllStartup, GetStatsNumber, UpdatePayload, GetStartupFile } from '../../../Api/Post'

const AdminDashboardModal = ({ data, isOpen, onClose, hideActions }) => {
  const { state } = useContext(AuthContext)
  const [openMsg, setOpenMsg] = useState('')
  const [open, setOpen] = useState(false)
  const { refetch } = GetAllStartup(state.token)
  const { refetch: myRefetchh } = GetStatsNumber(state.token)
  const navigation = useNavigate()

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: '24px',
    borderRadius: '10px',
    p: 4,
  }

  const toDate = (date) => {
    return new Date(date)
  }

  const modalData = {
    title: data?.title,
    aadhar: data?.aadhar,
    branch: data?.branch,
    category: data?.category,
    categoryOther: data?.categoryOther,
    contact: data?.contact,
    designation: data?.designation,
    email: data?.email,
    enrollmentNum: data?.enrollmentNum,
    institute: data?.institute,
    location: data?.location,
    name: data?.name,
    otherInstitute: data?.otherInstitute,
    otherOrganisation: data?.otherOrganisation,
    otherUniversity: data?.otherUniversity,
    startupId: data?.startupId,
    status: data?.status,
    teamMembers: data?.teamMembers,
    teamSize: data?.teamSize,
    uniqueFeatures: data?.uniqueFeatures,
    updatedAt: toDate(data?.updatedAt).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    currentStage: data?.currentStage,
    fileName: data?.fileName,
  }
  const handleRefresh = () => {
    myRefetchh()
    refetch()
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    onClose()
    setOpen(false)
  }
  const handleClickPayload = async ({ value, StartupId }) => {
    // console.log(value, StartupId)

    const { token } = state

    try {
      const res = await UpdatePayload({ value, StartupId, token })
      if (res.status === 200) {
        setOpenMsg(res.data.message)
        setOpen(true)
        handleRefresh()
        handleClose()
      }
    } catch (error) {
      setOpenMsg(error.message)
    }
  }
  const handleDelete = (rowData) => {
    //console.log(rowData)
  }
  const statusMenuItems = {
    pending: { label: 'Pending', value: 'pending' },
    verified: { label: 'Verify', value: 'verified' },
    rejected: { label: 'Reject', value: 'rejected' },
  }
  const handleFinance = () => {
    navigation('/admin/finance', { state: { startupId: modalData.startupId } })
  }

  const handleDownload = async (startupId) => {
    console.log('download')
    const { token } = state

    try {
      const res = await GetStartupFile({ startupId, token })
    } catch (error) {
      setOpenMsg(error.message)
    }
  }
  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
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
          <div className="w-full ">
            <Typography
              className="capitalize pb-5 w-full text-center"
              id="modal-modal-title "
              variant="h6"
              component="h5"
            >
              {modalData?.title} Details
            </Typography>
            <div className="grid grid-cols-2	">
              {Object?.entries(modalData).map((entry, index) => {
                return (
                  <div key={modalData?.title + index} className="grid py-1 grid-cols-12">
                    <span className="capitalize font-semibold truncate text-xs col-span-4 text-[#b4cd93] m-0">
                      {' '}
                      {entry[0]}{' '}
                    </span>
                    <span className="capitalize text-xs col-span-7    h-auto ">{entry[1]} </span>
                  </div>
                )
              })}
            </div>
            <div className="w-full flex my-2 justify-center gap-5 items-center">
              {modalData?.status === 'verified' ? (
                <NavLink to={`/admin/stageTwoForm/${modalData?.startupId}`} state={data}>
                  <Button size="sm" variant="contained">
                    Stage 2
                  </Button>
                </NavLink>
              ) : (
                <>
                  {!hideActions &&
                    Object?.values(statusMenuItems)
                      .filter((item) => item?.value !== modalData?.status)
                      .map((item) => (
                        <Button
                          size="sm"
                          variant="contained"
                          color={
                            (item?.value === 'pending' && 'info') ||
                            (item?.value === 'verified' && 'success') ||
                            (item?.value === 'rejected' && 'error')
                          }
                          key={item?.value}
                          onClick={() =>
                            handleClickPayload({
                              value: item?.value,
                              StartupId: modalData?.startupId,
                            })
                          }
                        >
                          {item?.label}
                        </Button>
                      ))}
                </>
              )}
              {!hideActions && (
                <Button onClick={() => handleDelete()} size="sm" variant="contained" color="error">
                  Delete
                </Button>
              )}
              <Button onClick={handleClose} size="sm" variant="contained" color="info">
                Close
              </Button>
              {!hideActions && (
                <Button onClick={() => handleFinance()} size="sm" variant="contained" color="success">
                  Finance
                </Button>
              )}
              {modalData?.fileName && (
                <Button
                  onClick={() => handleDownload(modalData?.startupId)}
                  size="sm"
                  variant="contained"
                  color="success"
                >
                  Download File
                </Button>
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default AdminDashboardModal
