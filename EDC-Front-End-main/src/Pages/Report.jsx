import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/common/Header'
import Navigation from '../components/Layout/Navbar'
import Footer from '../components/Layout/Footer'
import { AuthContext } from '../context/AuthContext'
import Spinner from '../components/Layout/Spinner'
import { GetFinanceDetails, GetUserStartupStatus } from '../Api/Post'
import MaterialReactTable from 'material-react-table'
import { Box } from '@mui/material'
import MonthlyReport from './Admin/components/MonthlyReport'


const App = () => {
  const { state } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const [netBalance, setNetBalance] = useState(0)
  const [dataArray, setData] = useState([])
  const { data: startupData, refetch } = GetUserStartupStatus(state?.token)

  useEffect(() => {
    refetch()
    if (startupData?.data?.startupId) {
      getStartupData()
    }
  }, [startupData?.data?.startupId])

  const getStartupData = async () => {
    const res = await GetFinanceDetails(startupData?.data?.startupId, state.token)
    console.log(`data 1`, dataArray, netBalance)
    if (res?.data?.financeDetails?.finance.length !== 0) {
      setNetBalance(res?.data?.financeDetails?.netBalance)
      setData(res?.data?.financeDetails?.finance)
      console.log(`data 2`, dataArray, netBalance)
    }
  }

  const ReportTable = (data) => {
    console.log(data, 'kkkh')
    const columns = useMemo(
      () => [
        {
          accessorKey: 'type', //access nested data with dot notation
          header: 'Type',
        },

        {
          accessorKey: 'remark', //normal accessorKey
          header: 'Remark',
        },
        {
          accessorKey: 'billInvoiceLink',
          header: 'BillInvoice Link',
        },
        {
          accessorKey: 'date',
          header: 'Date',
          accessorFn: (row) => {
            // console.log(row)
            const date = new Date(row.date)
            const year = date.getFullYear()
            const month = date.getMonth() + 1 // Add 1 because getMonth() returns zero-based month
            const day = date.getDate()

            return `${year}-${month}-${day}`
          },

          Cell: ({ cell }) => (
            <Box component="span" className="capitalize">
              <span className="font-light text-black"> {cell.getValue()}</span>
            </Box>
          ),
          size: 150,
        },
        {
          accessorKey: 'amount',
          header: 'Amount',
        },
      ],
      [],
    )
    return (
      <div className="w-full md:overscroll-none overflow-x-scroll">
        {dataArray ? <MaterialReactTable columns={columns} data={dataArray} /> : <></>}
      </div>
    )
  }

  startupData ? console.log('first', startupData?.data) : console.log('error')
  const statusMenuItems = {
    remark: 'remark',
    date: 'date',
  }
  useEffect(() => {
    // simulate an API call to check state's role
    setIsLoading(false)
    if (!state?.isAuthenticated) {
      navigate('/')
    }
  }, [state])

  return (
    <div className="bg-white relative">
      <Navigation />
      <Header props={'Financial Report'} />
      <>
        {isLoading ? (
          <div className="h-screen bg-black opacity-40 w-screen flex justify-center items-center z-50">
            <Spinner />
          </div>
        ) : state?.isAuthenticated === true ? (
          <>
            <div className="flex  justify-center items-center w-full">
              <div className=" w-96 justify-center  m-8 grid grid-cols-2">
                <label className=" mr-3">Net Balance</label>
                <input
                  className="border border-gray-400 w-50 h-8 "
                  type="text"
                  name="startupId"
                  id="startupId"
                  value={netBalance}
                  disabled
                />
              </div>
              <div>
              <MonthlyReport/>
            </div>
            </div>
            

            <div className="max-w-7xl mx-auto w-full md:overscroll-none overflow-hidden justify-center">
              <ReportTable data={dataArray} />
            </div>
            {/* <div> */}

            {/* <div className=" h-screen  w-full ">
              <AreaChartComponent />
            </div>
            <div className="min-h-screen w-full ">
              <PieChartComponent />
            </div> */}
            {/* </div>  */}
          </>
        ) : (
          <div className="h-screen w-screen bg-black opacity-40 flex justify-center items-center z-50">
            <Spinner />
          </div>
        )}
      </>

      <Footer />
    </div>
  )
}

export default App
