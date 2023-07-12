import { AuthProvider } from './AuthContext'
import { useContext } from 'react'

export const useAuthContext = () => {
  const context = useContext(AuthProvider)
  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider ')
  }
  return context
}
