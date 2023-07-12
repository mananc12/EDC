import React, { useState, useEffect } from 'react'
import '../../../styles/startupstable.css'
import { API } from '../../../Api/Post'
import axios from 'axios'

const StartupsTable = ({ companies }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limitPerPage = 6
  const start = (currentPage - 1) * limitPerPage
  const end = currentPage * limitPerPage
  const currentRows = companies.slice(start, end)

  // calculating total number of pages from the filtered table rows
  useEffect(() => {
    setTotalPages(Math.ceil(companies.length / limitPerPage))
  }, [companies])

  function handlePageChange(page) {
    setCurrentPage(page)
  }

  const ApplicationFooter = (props) => {
    const pageNumButtons = []

    for (let i = 1; i <= totalPages; i++) {
      const buttonClass = i === currentPage ? 'active' : ''

      pageNumButtons.push(
        <button className={buttonClass} key={i+6867} onClick={() => handlePageChange(i)}>
          {' '}
          {i}
        </button>,
      )
    }

    return (
      <div className="all-applications-footer">
        <div className="previous-page">
          {/* onClick={()=> handlePageChange(currentPage - 1) }
            Previous page */}
          <button
            className="prev-page-btn"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous page
          </button>
        </div>
        <div className="page-nums">{pageNumButtons}</div>
        <div className="next-page">
          {/* onClick={ ()=> handlePageChange(currentPage - 1) }
            Next Page */}
          <button
            className="next-page-btn"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <table className="w-full table-auto">
        <thead className="bg-gray-100 w-full">
          <tr className="">
            <th>Company</th>
            <th>Status</th>
            <th>Account Status</th>
            <th>Branch</th>
            <th>Company Valuation</th>
          </tr>
        </thead>
        <tbody className="w-full ">
          {currentRows?.map((item, index) => (
            <Tr key={index} props={item} />
          ))}
        </tbody>
      </table>
      <ApplicationFooter />
    </div>
  )
}

export default StartupsTable

export const Tr = (props) => {
  console.log(props)
  const item = props.props
  return (
    <tr className="h-10">
      <td> {item?.name} </td>

      <td>
        <span
          className={
            (item?.status.toLowerCase() === 'verified' ? 'verified' : '') +
            (item?.status.toLowerCase() === 'pending' ? 'pending' : '') +
            (item?.status.toLowerCase() === 'unverified' ? 'unverified' : '')
          }
        >
          {' '}
          {item?.status}{' '}
        </span>
      </td>

      <td className="flex flex-row">
        <progress
          max="100"
          value={item?.accountStatus || 0}
          className={item?.accountStatus === '' ? 'progressFalse' : 'progressTrue'}
        />
        <p>{item?.accountStatus || 0}</p>
        <span
          className={
            (item?.change === 'increment' ? 'increment' : '') +
            (item?.change === 'decrement' ? 'decrement' : '') +
            (item?.change === '' ? 'noData' : '')
          }
        >
          {' '}
          {item?.changeAmount || 0}{' '}
        </span>
      </td>

      <td> {item?.branch}</td>
      <td> {item?.valuation}</td>
    </tr>
  )
}
