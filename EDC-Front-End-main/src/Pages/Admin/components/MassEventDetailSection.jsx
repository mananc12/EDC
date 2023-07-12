import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import StartupsTable from './StartupsTable'
import { GetAllStartup } from '../../../Api/Post'
import { Spinner } from 'react-bootstrap'

export const MassEventDetailSection = () => {
  const { state } = useContext(AuthContext)
  const { data, isLoading, refetch } = GetAllStartup(state.token)

  return (
    <>
      <StartupsTable isLoading={isLoading} data={data?.data?.data ? data?.data?.data : []} refetch={refetch} isMassEvent={true}/>
    </>
  )
}

export default MassEventDetailSection
