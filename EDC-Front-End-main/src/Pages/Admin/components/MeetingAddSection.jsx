import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import MeetingManageTable from './MeetingManageTable'
import Spinner from '../../../components/Layout/Spinner'
import { GetAllEvent } from '../../../Api/Post'

const MeetingAddSection = () => {
  const { state } = useContext(AuthContext)
  const { data, isLoading, refetch } = GetAllEvent(state.token)
  return (
    <div>
      <div className="all-applications-wrapper">
        <div className="all-applications-body">
          <MeetingManageTable
            isLoading={isLoading}
            data={data?.data?.meetings ? data?.data?.meetings : []}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  )
}

export default MeetingAddSection
