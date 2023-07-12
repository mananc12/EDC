import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import AdminManageTable from './AdminManageTable'
import Spinner from '../../../components/Layout/Spinner'
import { GetAllAdmin } from '../../../Api/Post'
const AdminAddSection = () => {
  const { state } = useContext(AuthContext)
  const { data, isLoading, refetch } = GetAllAdmin(state.token)

  return (
    <div>
      <div className="all-applications-wrapper">
        <div className="all-applications-body">
          <AdminManageTable isLoading={isLoading} data={data?.data?.data ? data?.data?.data : []} refetch={refetch} />
        </div>
      </div>
    </div>
  )
}

export default AdminAddSection
