import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Header from '../components/common/Header'
import Navigation from '../components/Layout/Navbar'
import Section1 from '../components/home/Section1'
import Section2 from '../components/home/Section2'
import Gallery from '../components/home/Gallery'
import Footer from '../components/Layout/Footer'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Layout/Spinner'
import { ROLES } from '../constant/ROLES'
const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()
  const { state } = useContext(AuthContext)
  useEffect(() => {
    if (state.isAuthenticated === false) {
      localStorage.clear() // Clears local storage
      sessionStorage.clear() // Clears session storage
    }
    setIsLoading(false)
    if (state.role !== ROLES.ADMIN && state.role !== ROLES.MASTER_ADMIN) {
      navigate('/')
    } else {
      navigate('/Admin')
    }
  }, [state])
  return (
    <div className="bg-white relative">
      {isLoading ? (
        <div className="h-screen bg-white opacity-40 w-screen flex justify-center items-center z-50">
          <Spinner />
        </div>
      ) : (
        <>
          {' '}
          <Navigation />
          <Header props={''} />
          <Section1 />
          <Section2 />
          <Gallery />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
