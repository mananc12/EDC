import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const AdminViewModal = ({ data, isOpen, onClose }) => {
  const handleClose = () => onClose()
  const style = {
    position: 'absolute',
    width: '500px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }

  const toDate = (date) => {
    return new Date(date)
  }

  const modalData = {
    Name: data?.firstName + ' ' + data?.lastName,
    Email: data?.email,
    Number: data?.phoneNumber,
    Role: data?.role,
    Branch: data?.branch.map((val, index) => {
      return (
        <span className=" px-2 py-0.5  m-1  border-2 bg-[#cad3be] rounded-xl text-xs" key={index + val}>
          {val}
          <br />
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
          <div className="w-full bg-gray-100 shadow-2xl rounded-2xl p-5">
            <Typography id="modal-modal-title justify-items-center" variant="h6" component="h5">
              {modalData?.name} Details
            </Typography>
            {Object.entries(modalData).map((entry, index) => {
              return (
                <div key={modalData?.email + index} className="grid py-1 grid-cols-12">
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

export default AdminViewModal
