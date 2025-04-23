import React, { useEffect } from 'react'
import Routing from './Routing'
import Toast from './components/toastMessage/Toast'

function App() {

  return (
    <div>
      <Toast />
      <Routing />
    </div>
  )
}
export default App