import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { GetStatsNumber } from '../../../Api/Post'

const StatsComponent = ({ data, datatype }) => (
  <div className="stats-box">
    <div className="stats-bg">
      <div className="stats-box-overlay">
        <h2>{data}</h2>
        <p>{datatype}</p>
      </div>
    </div>
  </div>
)

const Last30Days = () => {
  const { state } = useContext(AuthContext)
  const token = state.token
  const [statsData, setStatsData] = useState({ totalCount: 0, pendingCount: 0, approvedCount: 0 })
  const { data } = GetStatsNumber(token)

  useEffect(() => {
    if (data?.data?.data) {
      setStatsData(data.data.data)
    }
  }, [data])

  const stats = [
    { key: 'totalCount', label: 'Applications' },
    { key: 'pendingCount', label: 'New application' },
    { key: 'approvedCount', label: 'Approved applications' },
  ]

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex justify-start items-start w-full py-2">
        <p>In the last 30 days</p>
      </div>

      <div className="grid w-full gap-5 justify-between items-center grid-cols-12">
        {stats.map(({ key, label }) => (
          <div className="col-span-4" key={key}>
            <StatsComponent data={statsData[key]} datatype={label} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Last30Days
