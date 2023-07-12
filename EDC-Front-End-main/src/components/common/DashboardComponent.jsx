import React from 'react'
import MaterialReactTable from 'material-react-table'
import { useMemo } from 'react'

const Boxs = (props) => {
  return (
    <div className="bg-gray-300 p-2 h-80 w-full">
      <p className="text-center w-full font-semibold text-xl">{props.name}</p>{' '}
    </div>
  )
}

const Box = (props) => {
  const ReportTable = (data) => {
    console.log(data, 'kkkh')
    const columns = useMemo(
      () => [
        {
          accessorKey: 'type', //access nested data with dot notation
          header: 'Type',
        },

        {
          accessorKey: 'title', //normal accessorKey
          header: 'Title',
        },
        {
          accessorKey: 'link',
          header: 'Link',
        },
        {
          accessorKey: 'dateAndTime',
          header: 'Date',
          accessorFn: (row) => {
            console.log(row)
            const date = new Date(row.dateAndTime)
            const year = date.getFullYear()
            const month = date.getMonth() + 1 // Add 1 because getMonth() returns zero-based month
            const day = date.getDate()

            return `${year}-${month}-${day}`
          },

          Cell: ({ cell }) => <span className="font-light text-black"> {cell.getValue()}</span>,
          size: 150,
        },
        {
          accessorKey: 'createdByName',
          header: 'Created By',
        },
      ],
      [],
    )
    return (
      <>
        {data?.data?.length ? (
          <MaterialReactTable columns={columns} data={data ? data?.data : []} />
        ) : (
          <p className="text-center text-yellow-200 text-xl">You don't have any meetings</p>
        )}
      </>
    )
  }

  const EventsTable = (data) => {
    const columns = useMemo(
      () => [
        {
          accessorKey: 'type', //access nested data with dot notation
          header: 'Type',
        },

        {
          accessorKey: 'title', //normal accessorKey
          header: 'Title',
        },
        {
          accessorKey: 'description',
          header: 'Description ',
        },
        {
          accessorKey: 'dateAndTime',
          header: 'Date',
          accessorFn: (row) => {
            console.log(row)
            const date = new Date(row.dateAndTime)
            const year = date.getFullYear()
            const month = date.getMonth() + 1 // Add 1 because getMonth() returns zero-based month
            const day = date.getDate()

            return `${year}-${month}-${day}`
          },

          Cell: ({ cell }) => <span className="font-light text-black"> {cell.getValue()}</span>,
          size: 150,
        },
        {
          accessorKey: 'createdByName',
          header: 'Created By',
        },
      ],
      [],
    )
    return (
      <>
        {data?.data?.length ? (
          <MaterialReactTable columns={columns} data={data ? data?.data : []} />
        ) : (
          <p>You don't have any events</p>
        )}
      </>
    )
  }
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="card bg-slate-400 h-full rounded-md">
        <p className="card-title text-indigo-50 py-2 text-center w-full font-semibold text-2xl">{props.name}</p>
        {props.name === 'Upcoming Meetings' && props?.data?.meetings && (
          <ReportTable data={props?.data?.meetings.length ? props?.data.meetings : []} />
        )}
        {props.name === 'Upcoming Events' && props?.data?.events.length > 0 && (
          <EventsTable data={props?.data?.events.length ? props?.data?.events : []} />
        )}
        {/* you can see EventsTable is replicating ,so we need to replace tables of there  data is not coming for these  */}
        {props.name === 'Financial Report' && props?.data?.events.length > 0 && (
          <EventsTable data={props?.data?.events.length ? props?.data?.events : []} />
        )}
        {props.name === 'Feedback From Mentors' && props?.data?.events.length > 0 && (
          <EventsTable data={props?.data?.events.length ? props?.data?.events : []} />
        )}
        {props.name === 'Connect to Mentors' && props?.data?.events.length > 0 && (
          <EventsTable data={props?.data?.events.length ? props?.data?.events : []} />
        )}
      </div>
    </div>
  )
}

const DashboardComponent = (props) => {
  return (
    <section className="h-auto mt-0  w-full">
      <Box name={'Upcoming Events'} data={props?.data} />
      <Box name={'Upcoming Meetings'} data={props?.data} />
    </section>
  )
}

export default DashboardComponent
