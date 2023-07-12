import React from 'react'
import { Link } from 'react-router-dom'

const SidebarCard = ({ children, title }) => {
  return (
    <div className="flex flex-col  max-w-xs mx-auto h-full bg-gray-50 p-2  justify-between items-center w-full  rounded-md">
      <h2 className="font-bold capitalize">{title}</h2>
      {children}

      <Link to="/admin/meetings">
        <button className="sidebar-right__card-button hover:bg-[#5c664f] hover:text-white pb-2">View all</button>
      </Link>
    </div>
  )
}

export default SidebarCard
