import React, { useEffect } from 'react'
import Routing from './Routing'
import Toast, { showSuccessToast } from './components/toastMessage/Toast'
import CursorTooltip from './CursorTooltip'

function App() {


  useEffect(() => {
    // 🔒 Disable right-click
    const disableContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', disableContextMenu);

    // 🔒 Disable key shortcuts
    const disableShortcuts = (e) => {
      if (
        // DevTools (Chrome / Firefox / Edge)
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'J')) || // Mac
        e.key === 'F12' || // F12
        (e.ctrlKey && e.key === 'U') || // View Source
        (e.metaKey && e.key === 'U') // View Source on Mac
      ) {
        e.preventDefault();
        showSuccessToast('This action is not allowed!');
      }
    };
    document.addEventListener('keydown', disableShortcuts);

    // 🔒 Detect dev tools open using Image getter trick
    let devtoolsOpened = false;
    const element = new Image();
    Object.defineProperty(element, 'id', {
      get: function () {
        devtoolsOpened = true;
        throw new Error('DevTools detected');
      },
    });

    const checkDevTools = setInterval(() => {
      devtoolsOpened = false;
      console.debug(element);
      if (devtoolsOpened) {
        showSuccessToast('DevTools are not allowed!');
        window.location.href = 'about:blank';
      }
    }, 1000);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('keydown', disableShortcuts);
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