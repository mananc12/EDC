import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import EventManageTable from './EventManageTable'
import Spinner from '../../../components/Layout/Spinner'
import { GetAllEvent } from '../../../Api/Post'

const EventAddSection = () => {
  const { state } = useContext(AuthContext)

  const { data, isLoading, refetch } = GetAllEvent(state.token)

  return (
    <div>
      <div className="all-applications-wrapper">
        <div className="all-applications-body">
          <EventManageTable
            isLoading={isLoading}
            data={data?.data?.events ? data?.data?.events : []}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  )
}

export default EventAddSection
