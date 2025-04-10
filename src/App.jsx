import React from 'react'
import Routing from './Routing'
import Toast from './components/toastMessage/Toast'
import CursorTooltip from './CursorTooltip'

function App() {
  return (
    <div>
      <Toast />
      <CursorTooltip text="Style Capsule" />
      <Routing />
    </div>
  )
}
export default App