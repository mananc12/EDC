import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import MaterialReactTable from 'material-react-table'
import { Alert, Box, MenuItem, Snackbar, Typography } from '@mui/material'
import { ExportToCsv } from 'export-to-csv' //or use your library of choice here
import EditIcon from '@mui/icons-material/Edit'
import AdminDashboardModal from './AdminDashboardModal'
import { DeleteStartup, GetStatsNumber, UpdatePayload } from '../../../Api/Post' //or use your library of choice here
import MeetingAddModal from './MeetingAddModal'

const StartupsTable = ({ data, refetch, isLoading, isMassEvent = false }) => {
  const { state } = useContext(AuthContext)
  const [openMsg, setOpenMsg] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [array, setArray] = useState([])
  const [open, setOpen] = useState(false)
  const { refetch: myRefetchh } = GetStatsNumber(state.token)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState(data[0])
  const btnStyl = 'bg-[#b4cd93] mx-1 disabled:hidden  hover:bg-[#5c664f] hover:text-white  px-2 py-1 rounded-md'
  const liStyl = 'font-bold px-0.5 capitalize text-xs text-[#b4cd93]'
  const columns = [
    {
      accessorKey: 'name',
      header: 'Company',
      Cell: ({ cell }) => (
        <Box component="span" className="capitalize">
          <span className="font-light text-black"> {cell.getValue()}</span>
        </Box>
      ),
    },

    {
      accessorKey: 'status',
      filterFn: 'between',
      header: 'Status',
      size: 100,
      Cell: ({ cell }) => (
        <Box
          component="span"
          className="capitalize"
          sx={(theme) => ({
            backgroundColor:
              (cell.getValue() === 'verified' && '#BBF7D0') ||
              (cell.getValue() === 'rejected' && '#FCA5A5') ||
              (cell.getValue() === 'pending' && '#fdf8ce'),

            borderRadius: '0.25rem',
            color: '#fff',
            maxWidth: '9ch',
            p: '0.35rem',
          })}
        >
          <span className="font-light text-black"> {cell.getValue()}</span>
        </Box>
      ),
    },
    {
      accessorFn: (row) => {
        const date = new Date(row.createdAt)
        const date2 = date.toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
        const time = date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
        return time + ' ' + date2
      },

      header: 'Create Date and Time',
      Cell: ({ cell }) => (
        <Box component="span" className="capitalize">
          <span className="font-light text-black"> {cell.getValue()}</span>
        </Box>
      ),
    },
    {
      accessorKey: 'branch',
      header: 'Branch',
      Cell: ({ cell }) => (
        <Box component="span" className="capitalize">
          <span className="font-light text-black"> {cell.getValue()}</span>
        </Box>
      ),
      size: 100,
    },
    // {
    //   accessorKey: 'valuation',
    //   header: 'Company Valuation',
    //   Cell: ({ cell }) => (
    //     <Box component="span" className="capitalize">
    //       <span className="font-light text-black"> {cell.getValue()}</span>
    //     </Box>
    //   ),
    //   size: 100,
    // },
  ]
  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  }
  const csvExporter = new ExportToCsv(csvOptions)
  // console.table(data)
  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original))
  }

  const handleExportData = () => {
    csvExporter.generateCsv(data)
  }
  const handleRefresh = () => {
    myRefetchh()
    refetch()
  }
  const handleClickPayload = async ({ value, StartupId }) => {
    const { token } = state
    try {
      const res = await UpdatePayload({ value, StartupId, token })
      if (res.status === 200) {
        setOpenMsg(res.data.message)
        setOpen(true)
        handleRefresh()
      }
    } catch (error) {
      setOpenMsg(error.message)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  const statusMenuItems = {
    pending: { label: 'Pending', value: 'pending' },
    verified: { label: 'Verify', value: 'verified' },
    rejected: { label: 'Reject', value: 'rejected' },
  }
  const handlePreview = (rowData) => {
    //console.log(rowData)
    setModalData(rowData)
    setModalOpen(!modalOpen)
  }
  const handleAddToMeeting = (rows) => {
    const newArray = rows.map((row) => row.original.email)
    setArray((prevArray) => [...prevArray, ...newArray])
    setIsOpen(true)
  }
  const handleDelete = async (rowData) => {
    console.log(rowData)
    const { token } = state
    try {
      const res = await DeleteStartup(rowData, token)
      if (res.status === 200) {
        setOpenMsg(res.data.message)
        handleRefresh()
        setOpen(true)
      }
    } catch (error) {
      setOpenMsg(error.message)
      setOpen(true)
    }
  }
  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {openMsg && openMsg}
        </Alert>
      </Snackbar>
      <AdminDashboardModal
        isOpen={modalOpen}
        data={modalData}
        onClose={() => {
          setModalOpen(!modalOpen)
        }}
      />

      <MaterialReactTable
        localization={{
          actions: 'Events',
        }}
        data={data}
        state={{ isLoading: isLoading }}
        columns={columns}
        enableStickyHeader
        enableStickyFooter
        enableColumnOrdering
        enableRowActions
        enableRowSelection
        positionActionsColumn="last"
        enableMultiRowSelection={true}
        positionToolbarAlertBanner="bottom"
        initialState={{ density: 'compact' }}
        muiTableContainerProps={{ sx: { height: '45vh' } }}
        muiTableHeadCellProps={{
          sx: {
            fontSize: {
              xs: '8px',
              sm: '11px',
              md: '12px',
              lg: '13px',
              xl: '14px',
            },
          },
        }}
        renderTopToolbarCustomActions={({ table }) => (
          <Box sx={{ display: 'flex', gap: '0.1rem', p: '0.5rem', flexWrap: 'wrap' }}>
            {data?.length !== 0 ? (
              <>
                <button className={btnStyl} onClick={handleExportData}>
                  Export All Data
                </button>
                <button
                  className={btnStyl}
                  disabled={table.getPrePaginationRowModel().rows.length === 0}
                  //export all rows, including from the next page, (still respects filtering and sorting)
                  onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
                >
                  Export All Rows
                </button>
                <button
                  className={btnStyl}
                  disabled={table.getRowModel().rows.length === 0}
                  //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                  onClick={() => handleExportRows(table.getRowModel().rows)}
                >
                  Export Page Rows
                </button>{' '}
                <button
                  className={btnStyl}
                  disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                  onClick={() => handleAddToMeeting(table.getSelectedRowModel().rows)}
                >
                  Add to Meeting
                </button>
                <button
                  className={btnStyl}
                  disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                  //only export selected rows
                  onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                >
                  Export Selected Rows
                </button>
              </>
            ) : (
              <></>
            )}
          </Box>
        )}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
            {!isMassEvent ? (
              <>
                {row?.original.status === 'verified' && (
                  <NavLink to={`/admin/stageTwoForm/${row.original.startupId}`} state={row.original}>
                    <button className="bg-[#ff9494] ml-2 text-xs  font-light h-6 w-14 rounded-md hover:bg-[#923939]">
                      Stage 2
                    </button>
                  </NavLink>
                )}
                {Object?.values(statusMenuItems)
                  .filter((item) => item?.value !== row?.original.status)
                  .map((item) => (
                    <button
                      className={
                        (item?.value === 'pending' &&
                          'bg-[#fdf8ce] hover:bg-[#fcf290] ml-2 text-xs  font-light h-6 w-14 rounded-md ') ||
                        (item?.value === 'verified' &&
                          'bg-[#b4cd93] hover:bg-[#6b9239] ml-2 text-xs  font-light h-6 w-14 rounded-md ') ||
                        (item?.value === 'rejected' &&
                          'bg-[#FCA5A5] hover:bg-[#e95c5c] ml-2 text-xs  font-light h-6 w-14 rounded-md ')
                      }
                      key={item?.value}
                      onClick={() =>
                        handleClickPayload({
                          value: item?.value,
                          StartupId: row?.original.startupId,
                        })
                      }
                    >
                      {item?.label}
                    </button>
                  ))}
                <button
                  className="bg-[#b4cd93] ml-2 text-xs  font-light h-6 w-10 rounded-md hover:bg-[#6b9239]"
                  onClick={() => handlePreview(row.original)}
                >
                  View
                </button>
                <button
                  className="bg-[#ff9494] ml-2 text-xs  font-light h-6 w-10 rounded-md hover:bg-[#923939]"
                  onClick={() => handleDelete(row?.original?.startupId)}
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  className="bg-[#b4cd93] ml-2 text-xs  font-light h-6 px-2 rounded-md hover:bg-[#6b9239]"
                  onClick={(f) => f}
                >
                  Invite
                </button>
                <button
                  className="bg-[#ff9494] ml-2 text-xs  font-light h-6 px-2 rounded-md hover:bg-[#923939]"
                  onClick={(f) => f}
                >
                  Invite all
                </button>
              </>
            )}
          </Box>
        )}
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            borderRadius: '12px',
            border: '0px',
          },
        }}
        // renderDetailPanel={({ row }) => (
        //   <Box className="grid grid-cols-4 bg-gray-50 p-2 rounded-md shadow  bg gap-1 w-auto">
        //     {Object.entries(row.original).map(([key, value]) => (
        //       <Typography key={key} className="text-sm">
        //         <span className={liStyl}>{key}:</span>
        //         <span className="text-sm  ">{value || 'N/A'}</span>
        //       </Typography>
        //     ))}
        //   </Box>
        // )}
      />
    </>
  )
}

export default StartupsTable
