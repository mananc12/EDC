import DocumentComponent from '../components/common/DocumentComponent'
import Header from '../components/common/Header'
import Navigation from '../components/Layout/Navbar'
import Footer from '../components/Layout/Footer'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'
import Spinner from '../components/Layout/Spinner'
import React, { useContext, useEffect, useState } from 'react'

const App = () => {
  const { state } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // simulate an API call to check state's role

    setIsLoading(false)
    if (!state.isAuthenticated) {
      navigate('/')
    }
  }, [state])

  return (
    <div className="bg-white relative">
      <Navigation />
      <Header props={`Upload the documents`} />
      <>
        {isLoading ? (
          <div className="h-screen bg-black opacity-40 w-screen flex justify-center items-center z-50">
            <Spinner />
          </div>
        ) : state.isAuthenticated == true ? (
          <div>
            <DocumentComponent />
          </div>
        ) : (
          <div className="h-screen w-screen bg-black opacity-40 flex justify-center items-center z-50">
            <Spinner />
          </div>
        )}
      </>

      <Footer />
    </div>
  )
}

export default App
