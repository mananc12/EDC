import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import MeetingAddForm from './MeetingAddForm'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { Alert, Snackbar } from '@mui/material'
import { CreateNewEvent, GetAllEvent } from '../../../Api/Post'

const MeetingAddModal = ({ isOpen, onClose, refetch }) => {
  const { state } = useContext(AuthContext)
  const [openMsg, setOpenMsg] = useState('')
  const [open, setOpen] = useState(false)
  const { refetch: GetAllEventFetch } = GetAllEvent(state.token)

  const handleClose = () => {
    onClose()
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const submitMeetingData = async (body) => {
    const token = state.token
    try {
      const res = await CreateNewEvent({ body, token })
      handleClose()
      setOpenMsg(res.data.message)

      setOpen(true)
      GetAllEventFetch()
      refetch()
      return res
    } catch (error) {
      setOpenMsg(error.message)
    }
  }

  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert variant="filled" onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
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
            <MeetingAddForm submitMeetingData={submitMeetingData} />
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default MeetingAddModal
