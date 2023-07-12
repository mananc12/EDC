import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import EventAddForm from './EventAddForm'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'
import { CreateNewEvent } from '../../../Api/Post'

const EventAddModal = ({ isOpen, onClose, refetch }) => {
  const { state } = useContext(AuthContext)
  const [openMsg, setOpenMsg] = useState('')
  const [open, setOpen] = useState(false)
  const handleClose = () => onClose()
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '650px',
    transform: 'translate(-50%, -50%)',
  }
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const submitEventData = async (body) => {
    const token = state.token
    try {
      const res = await CreateNewEvent({ body, token })
      handleClose()
      setOpenMsg(res.data.message)
      setOpen(true)
      refetch()
      return res
    } catch (error) {
      setOpenMsg(error.message)
    }
  }

  return (
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
            <EventAddForm submitEventData={submitEventData} />
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default EventAddModal
