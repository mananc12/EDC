import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const EventViewModal = ({ data, isOpen, onClose }) => {
  const handleClose = () => onClose()
  const style = {
    position: 'absolute',
    width: '800px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }

  const toDate = (date) => {
    return new Date(date)
  }

  const modalData = {
    title: data?.title,
    description: data?.description,
    type: data?.type,
    date: toDate(data?.dateAndTime).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    time: toDate(data?.dateAndTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    Members: data?.members.map((val, index) => {
      return (
        <span className=" px-2 py-0.5  m-1  border-2 bg-[#cad3be] rounded-xl text-xs" key={index + val}>
          {val}{' '}
        </span>
      )
    }),
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
          <div className="w-full overflow-hidden bg-gray-100 shadow-2xl rounded-2xl p-5">
            <Typography id="modal-modal-title justify-items-center" variant="h6" component="h5">
              Event Details
            </Typography>
            {Object.entries(modalData).map((entry) => {
              return (
                <div key={modalData?.title} className=" max-h-96 overflow-auto grid py-1 grid-cols-12">
                  <span className="capitalize font-semibold text-lg col-span-3 text-[#b4cd93] m-0"> {entry[0]} </span>
                  <span className="capitalize text-lg col-span-9 h-auto ">{entry[1]} </span>
                </div>
              )
            })}
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default EventViewModal
