import React, { useEffect } from 'react'
import Routing from './Routing'
import Toast from './components/toastMessage/Toast'
import CursorTooltip from './CursorTooltip'

function App() {

  useEffect(() => {
    const disableContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', disableContextMenu);
    const checkDevTools = setInterval(() => {
      const devtoolsOpen =
        window.outerWidth - window.innerWidth > 100 ||
        window.outerHeight - window.innerHeight > 100;
    }, 1000);
    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      clearInterval(checkDevTools);
    };
  }, []);

  return (
    <div>
      <Toast />
      {/* <CursorTooltip text="Style Capsule" /> */}
      <Routing />
    </div>
  )
}
export default App