import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(3)

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/Admin')
    }, 3000) // 5 seconds

    const countdownTimer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1)
    }, 1000) // 1 second

    return () => {
      clearTimeout(redirectTimer)
      clearInterval(countdownTimer)
    }
  }, [navigate])

  return (
    <div className="h-screen w-full flex-col flex justify-center items-center p-5">
      <h1 className="text-7xl font-black text-green-300 py-2">404 Not Found</h1>
      <p className="text-3xl py-2">The page you're looking for does not exist.</p>
      <p className="text-base py-2">Redirecting to the homepage in {seconds} seconds...</p>
    </div>
  )
}

export default NotFound
