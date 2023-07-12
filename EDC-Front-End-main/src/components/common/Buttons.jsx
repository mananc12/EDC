import React from 'react'
import { Button, styled } from '@mui/material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'

export const DownloadBtn = (props) => {
  const BtnsDownload = styled(Button)({
    padding: '12px 12px',
    fontSize: 15,
    fontFamily: 'Open sans',
    fontWeight: 600,
    textTransform: 'none',
    letterSpacing: 0.7,
    borderRadius: 7,
    '&:hover': {
      backgroundColor: 'rgba(7,36,54,0.3)',
      boxShadow: 'none',
    },
  })
  return (
    <BtnsDownload sx={{ color: '#010B13' }} endIcon={<FileDownloadOutlinedIcon />}>
      {' '}
      {props.btntext}
    </BtnsDownload>
  )
}

export const OutlinedBtn = (props) => {
  const BtnsOutlined = styled(Button)({
    padding: '12px 5px',
    fontSize: 15,
    fontFamily: 'Open sans',
    fontWeight: 600,
    textTransform: 'none',
    letterSpacing: 0.7,
    borderRadius: 7,
    borderColor: 'rgba(1, 31, 91)',
    '&:hover': {
      backgroundColor: 'rgba(1, 31, 91)',
      borderColor: 'rgba(1, 31, 91,0.1)',

      boxShadow: 'none',
      color: 'white',
    },
  })
  return (
    <BtnsOutlined variant="outlined" sx={{ color: 'rgba(1, 31, 91)' }}>
      {props.btntext}
    </BtnsOutlined>
  )
}

export const Btn = (props) => {
  const BtnsSimple = styled(Button)({
    backgroundColor: '#0193DC',
    padding: '8px 55px',
    fontSize: 15,
    fontFamily: 'Open sans',
    fontWeight: 600,
    textTransform: 'none',
    letterSpacing: 0.7,
    borderRadius: 4,
    '&:hover': {
      backgroundColor: 'rgba(7,36,54,0.3)',
      borderColor: 'rgba(7,36,54,0.3)',
      boxShadow: 'none',
    },
  })
  return <BtnsSimple sx={{ color: 'white' }}>{props.btntext}</BtnsSimple>
}
