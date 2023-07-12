import React from 'react'
import '../../styles/documentsWaitComponent.css'
import { DownloadBtn, OutlinedBtn, Btn } from './Buttons'
import { NavLink } from 'react-router-dom'

const DocumentComponent = () => {
  const headingWaitSec = 'Waiting for the approval'

  const textBodyWaitSec1 =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'

  const textBodyWaitSec2 = 'Admin PPDB SMPN 1 Cibadak'

  const DownloadQnA = () => {}
  const DownloadPageFormat = () => {}
  const handleSizeDetails = () => {}
  const handleGoHome = () => {}

  return (
    // <div className="min-h-screen w-full flex justify-center items-center">
    //   DocumentComponent
    // </div>

    <div className="waiting-sec-container">
      <div className="btns-mid-col">
        <NavLink to="/">
          <Btn btntext="Go Home" />
        </NavLink>
      </div>
      <div className="waiting-sec-content-container">
        <div className="documents-btn-groups">
          <div className="btns-left-col">
            <DownloadBtn btntext="Q&A" />
            <DownloadBtn btntext="Download the proper format" />
          </div>
          <div className="btns-right-col">
            <OutlinedBtn btntext="click here for size details" />
          </div>
        </div>
        <div className="waiting-sec-content">
          <div className="waiting-sec-content-row1">
            <h1> {headingWaitSec} </h1>
          </div>
          <div className="waiting-sec-content-row2">
            <div className="waiting-sec-content-row2-row1">
              <p> {textBodyWaitSec1} </p>
            </div>
            <div className="waiting-sec-content-row2-row2">
              <p> {textBodyWaitSec2} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentComponent
