import searchIcon from '../../../assets/search-normal.svg'
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { API, GetAllStartup } from '../../../Api/Post'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
// import div from '@mui/material/div'
import Modal from '@mui/material/Modal'

function SearchBar() {
  const [allStartups, setAllStartups] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(true)
  const [modalState, setModalState] = useState(false)
  const [userData, setUserData] = useState({
    aadhar: '',
    branch: '',
    category: '',
    categoryOther: '',
    contact: '',
    currentStage: '',
    designation: '',
    email: '',
    enrollmentNum: '',
    institute: '',
    location: '',
    name: '',
    otherInstitute: '',
    otherOrganisation: '',
    otherUniversity: '',
    startupId: '',
    status: '',
    teamMembers: '',
    teamSize: '',
    title: '',
    uniqueFeatures: '',
    updatedAt: '',
  })
  const { state } = useContext(AuthContext)
  const { data, isLoading, refetch } = GetAllStartup(state.token)
  let debounceTimeout

  const debounce = (callback, delay) => {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(callback, delay)
  }

  // useEffect(() => {
  // API('get', '/api/admin/all-startup-details', {}, state.token)
  //   // .then((data) => console.log(`SEARCH BAR FILTER`, data?.data?.data))
  //   .then((data) => setAllStartups(data?.data?.data))
  //   .catch((error) => console.error(error))
  // }, [])
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.modal')) {
        return
      }
      setOpen(true)
      setInputValue('')
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (Array.isArray(data?.data?.data)) {
      const filtered = data.data.data.filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()))
      setFilteredData(filtered)
    }
  }, [allStartups, inputValue])

  const handleInputChange = (event) => {
    const value = event.target.value.trim()
    debounce(() => {
      setInputValue(value)
      if (value.length > 0) {
        setOpen(false)
      } else {
        setOpen(true)
      }
    }, 200)
  }
  const toDate = (date) => {
    return new Date(date)
  }

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
  const handleClick = (data) => {
    setModalState(true)

    setUserData((prev) => {
      return {
        ...prev,
        aadhar: data.aadhar,
        branch: data.branch,
        category: data.category,
        categoryOther: data.categoryOther,
        contact: data.contact,
        currentStage: data.currentStage,
        designation: data.designation,
        email: data.email,
        enrollmentNum: data.enrollmentNum,
        institute: data.institute,
        location: data.location,
        name: data.name,
        otherInstitute: data.otherInstitute,
        otherOrganisation: data.otherOrganisation,
        otherUniversity: data.otherUniversity,
        startupId: data.startupId,
        status: data.status,
        teamMembers: data.teamMembers,
        teamSize: data.teamSize,
        title: data.title,
        uniqueFeatures: data.uniqueFeatures,
        updatedAt: toDate(data.updatedAt).toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      }
    })
  }

  const handleClose = () => {
    setModalState(false)
  }
  return (
    <>
      <div className=" search-bar w-full">
        <div className="search-wrapper   focus:border-2 border-[#b4cd93] ">
          <img src={searchIcon} alt="searchbar" className="search-icon" />
          <input
            className="search-input focus:border-2 border-[#b4cd93]"
            type="text"
            placeholder="Search startups"
            onChange={handleInputChange}
            value={inputValue}
          />
        </div>

        <div
          className={`fixed ${
            open ? 'hidden' : 'block'
          }  h-auto w-full max-w-2xl shadow-2xl shadow-black  top-16 z-50 p-2 bg-[#fafafa] border border-gray-200  rounded-md`}
          id="filter-results"
        >
          <ul className="grid grid-cols-10 px-1 cursor-pointer">
            <li className="col-span-3"> Company Name</li>
            <li className="col-span-2"> Name</li>
            <li className="col-span-3">Email</li>
            <li className="col-span-2">Branch</li>
          </ul>
          {filteredData.map((item) => (
            <div
              className="bg-[#e5e5e5] modal hover:text-white hover:bg-[#b4cd93]  text-xs capitalize font-light hover:font-normal border border-gray-200 p-2 w-full rounded-md my-1"
              key={item.startupId}
              onClick={() => handleClick(item)}
            >
              <ul className="grid grid-cols-10 cursor-pointer">
                <li className="col-span-3"> {item.title}</li>
                <li className="col-span-2"> {item.name}</li>
                <li className="col-span-3"> {item.email}</li>
                <li className="col-span-2"> {item.branch}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Modal
          open={modalState}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="text-xl py-2 w-full text-center">Company Details</div>
            <div className="grid grid-cols-2	">
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs">Company Name </span> :{' '}
                <span className="text-xs">{userData.title} </span>
              </div>
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Name </span> :{' '}
                <span className="text-xs">{userData.name} </span>
              </div>
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Branch </span> :{' '}
                <span className="text-xs">{userData.branch} </span>
              </div>
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Category </span> :{' '}
                <span className="text-xs"> {userData.category} </span>
              </div>
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Email </span> :{' '}
                <span className="text-xs"> {userData.email} </span>
              </div>
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Category Other </span> :{' '}
                <span className="text-xs"> {userData.categoryOther} </span>
              </div>
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Contact </span> :{' '}
                <span className="text-xs"> {userData.contact} </span>
              </div>

              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Designation </span> :{' '}
                <span className="text-xs"> {userData.designation} </span>
              </div>
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Enrollment Num </span> :{' '}
                <span className="text-xs"> {userData.enrollmentNum} </span>
              </div>
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Institute </span> :{' '}
                <span className="text-xs"> {userData.institute} </span>
              </div>
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Location </span> :{' '}
                <span className="text-xs"> {userData.location} </span>
              </div>
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Other Institute </span> :{' '}
                <span className="text-xs"> {userData.otherInstitute} </span>
              </div>
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Other Organisation </span> :{' '}
                <span className="text-xs"> {userData.otherOrganisation} </span>
              </div>
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Other University </span> :{' '}
                <span className="text-xs"> {userData.otherUniversity} </span>
              </div>
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Startup Id </span> :{' '}
                <span className="text-xs"> {userData.startupId} </span>
              </div>
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Status </span> :{' '}
                <span className="text-xs"> {userData.status} </span>
              </div>
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Team Members </span> :{' '}
                <span className="text-xs"> {userData.teamMembers} </span>
              </div>
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Team Size </span> :{' '}
                <span className="text-xs"> {userData.teamSize} </span>
              </div>
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Unique Features </span> :{' '}
                <span className="text-xs"> {userData.uniqueFeatures} </span>
              </div>
              <div className="justify-items-center">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> updated at </span> :{' '}
                <span className="text-xs">
                  {' '}
                  {toDate(userData.updatedAt).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}{' '}
                </span>
              </div>
              <div className="justify-items-center col-span-2 ">
                <span className="capitalize text-[#b4cd93] m-3 text-xs"> Current Stage </span> :{' '}
                <span className="text-xs max-w-xs  "> {userData.currentStage} </span>
              </div>
            </div>
            <div className="w-full flex my-2 justify-center items-center">
              <Button onClick={handleClose} size="sm" variant="contained" color="success">
                Close
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  )
}

export default SearchBar
