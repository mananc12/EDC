import React from 'react'
import '../../../styles/adminApplication.css'
import SearchBar from './SearchBar'
import Last30Days from './Last30Days'
import StartupsDetailsSection from './StartupsDetailsSection'
import AdminAddSection from './AdminAddSection'
import MeetingAddSection from './MeetingAddSection'
import EventAddSection from './EventAddSection'
import SidebarRight from './SidebarRight'
import Notifications from './Notifications'
import Calendar from './Calendar'
import StageTwoForm from './StageTwoForm'
import FinanceSection from './FinanceSection'

const AdminApplicationSection = ({ page }) => {
  return (
    <div className="bg-white flex flex-col justify-start h-screen">
      <section className="h-[65vh] w-full">
        {page === 'dashboard' ? (
          <>
            <div className="h-[35vh] w-full">
              <div className="grid grid-cols-12 w-full p-5">
                <div className="col-span-8">
                  <SearchBar />
                  <Last30Days />
                </div>
                <div className="col-span-4">
                  <SidebarRight />
                </div>
              </div>
            </div>

            <StartupsDetailsSection />
          </>
        ) : page === 'calendar' ? (
          <>
            <Calendar />
          </>
        ) : page === 'meetings' ? (
          <>
            <div className="w-full h-10 p-5 flex justify-start items-center">
              <h1 className="text-3xl font-bold"> Manage Meeting </h1>
            </div>
            <MeetingAddSection />
          </>
        ) : page === 'events' ? (
          <>
            {' '}
            <div className="w-full h-10 p-5 flex justify-start items-center">
              <h1 className="text-3xl font-bold"> Manage Event </h1>
            </div>
            <EventAddSection />
          </>
        ) : page === 'notifications' ? (
          <>
            {' '}
            <div className="w-full h-10 p-5 flex justify-start items-center">
              <h1 className="text-3xl font-bold">Notifications </h1>
            </div>
            <Notifications />
          </>
        ) : page === 'stageTwoForm' ? (
          <>
            {' '}
            <StageTwoForm />
          </>
        ) : page === 'manage-coordinators' ? (
          <>
            {' '}
            <div className="w-full h-10 p-5 flex justify-start items-center">
              <h1 className="text-3xl font-bold">Manage Coordinate </h1>
            </div>
            <AdminAddSection />
          </>
        ) : (
          <>
            <div className="w-full h-10 p-5 flex justify-start items-center">
              <h1 className="text-3xl font-bold">Manage Finance </h1>
            </div>

            <FinanceSection />
          </>
        )}
      </section>
    </div>
  )
}

export default AdminApplicationSection
