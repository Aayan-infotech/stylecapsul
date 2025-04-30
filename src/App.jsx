import React, { useEffect } from 'react'
import Routing from './Routing'
import Toast, { showSuccessToast } from './components/toastMessage/Toast'
import CursorTooltip from './CursorTooltip'
import AdClipModal from './addclip/AdClipModal';
import BottomBanner from './addclip/BottomBanner';

function App() {

  useEffect(() => {
    const disableContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', disableContextMenu);
    const disableShortcuts = (e) => {
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'J')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.key === 'U') ||
        (e.metaKey && e.key === 'U')
      ) {
        e.preventDefault();
        showSuccessToast('This action is not allowed!');
      }
    };
    document.addEventListener('keydown', disableShortcuts);
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
      <AdClipModal />
      <CursorTooltip text="Style Capsule" />
      <Routing />
      <BottomBanner />
    </div>
  )
}
export default App