import applicationFormReducer from './formSlice'

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    form: applicationFormReducer,
  },
})
