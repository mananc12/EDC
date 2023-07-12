import React, { useState, useContext, useEffect } from 'react'
import MaterialReactTable from 'material-react-table'
import { Box } from '@mui/material'
import ModalEventMeeting from './ModalEventMeeting'
import { AuthContext } from '../../../context/AuthContext'
import { GetAdminNotifications, ClearAdminNotifications } from '../../../Api/Post'
import AdminDashboardModal from './AdminDashboardModal'

const Notifications = () => {
  const { state } = useContext(AuthContext)
  const { data, isLoading, refetch } = GetAdminNotifications(state.token)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [modalOpenStartup, setModalOpenStartup] = useState(false)
  const [modalDataStartup, setModalDataStartup] = useState(null)


  const CLEAR_NOTIFICATION_TYPES = {
    ALL: 'all',
    EVENT_AND_MEETING: 'eventAndMeeting',
    STARTUP: 'startup',
  }
  const btnStyl = 'bg-[#b4cd93] mx-1 disabled:hidden  hover:bg-[#5c664f] hover:text-white  px-2 py-1 rounded-md'

  const columns = [
    {
      accessorKey: 'title',
      header: 'Title',
      Cell: ({ cell }) => (
        <Box component="span" className="capitalize">
          <span className="font-light text-black"> {cell.getValue()}</span>
        </Box>
      ),
      size: 100,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      Cell: ({ cell }) => (
        <Box component="span" className="capitalize">
          <span className="font-light text-black"> {cell.getValue() || 'startup'}</span>
        </Box>
      ),
      size: 50,
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
      header: 'Time and Date',
      Cell: ({ cell }) => (
        <Box component="span" className="capitalize">
          <span className="font-light text-black"> {cell.getValue()}</span>
        </Box>
      ),
      size: 50,
    },
  ]

  const handlePreview = (rowData) => {
    if (rowData.type) {
      setModalData(rowData)
      setModalOpen(!modalOpen)
    } else {
      setModalDataStartup(rowData)
      setModalOpenStartup(!modalOpenStartup)
    }
  }

  const handleClear = (rowData) => {
    const token = state.token
    const query = rowData.type
      ? `id=${rowData.id}&type=${CLEAR_NOTIFICATION_TYPES.EVENT_AND_MEETING}`
      : `id=${rowData.id}&type=${CLEAR_NOTIFICATION_TYPES.STARTUP}`
    ClearAdminNotifications({ query, token })
    refetch()
  }

  const handleClearAll = () => {
    const token = state.token
    const query = `type=${CLEAR_NOTIFICATION_TYPES.ALL}`
    ClearAdminNotifications({ query, token })
    refetch()
  }

  return (
    <>
      <ModalEventMeeting
        isOpen={modalOpen}
        data={modalData}
        onClose={() => {
          setModalOpen(!modalOpen)
        }}
      />
      <AdminDashboardModal
        isOpen={modalOpenStartup}
        data={modalDataStartup}
        hideActions={true}
        onClose={() => {
          setModalOpenStartup(!modalOpenStartup)
        }}
      />
      <MaterialReactTable
        state={{ isLoading: isLoading }}
        data={data?.data?.notifications || []}
        columns={columns}
        enableStickyHeader
        enableStickyFooter
        positionActionsColumn="last"
        positionToolbarAlertBanner="bottom"
        initialState={{ density: 'compact' }}
        muiTableContainerProps={{ sx: { height: '75vh' } }}
        renderTopToolbarCustomActions={({ table }) => (
          <Box sx={{ display: 'flex', gap: '0.1rem', p: '0.5rem', flexWrap: 'wrap' }}>
            {data?.length !== 0 ? (
              <>
                <button className={btnStyl} onClick={handleClearAll}>
                  Clear All
                </button>
              </>
            ) : (
              <></>
            )}
          </Box>
        )}
        enableRowActions
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
            <button
              className="bg-[#b4cd93] ml-2   font-light h-6 w-10 rounded-md hover:bg-[#6b9239]"
              onClick={() => handlePreview(row.original)}
            >
              View
            </button>
            <button
              className="bg-[#b4cd93] ml-2   font-light h-6 w-10 rounded-md hover:bg-[#6b9239]"
              onClick={() => handleClear(row.original)}
            >
              Clear
            </button>
          </Box>
        )}
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
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            borderRadius: '12px',
            border: '0px',
          },
        }}
      />
    </>
  )
}

export default Notifications
