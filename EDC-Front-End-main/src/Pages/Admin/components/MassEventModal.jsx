import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import EventAddForm from './EventAddForm'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'
import { CreateNewEvent } from '../../../Api/Post'
import MassEventDetailSection from './MassEventDetailSection'

const MassEventModal = ({ isOpen, onClose }) => {
  const { state } = useContext(AuthContext)
  const handleClose = () => onClose()
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    // width: '650px',
    transform: 'translate(-50%, -50%)',
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="w-full bg-gray-100 shadow-xl rounded-md p-5">
            <MassEventDetailSection />
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default MassEventModal
