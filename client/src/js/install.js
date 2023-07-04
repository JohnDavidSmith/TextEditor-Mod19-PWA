
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt; // Store the deferred prompt globally
// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault(); // Prevent the default behavior of the event
    deferredPrompt = event; // Store the event for later use 
    butInstall.addEventListener('click', installApp);
});
// I need to make comment
// TODO: Implement a click event handler on the `butInstall` element
async function installApp() {
      // TODO: Check if the `beforeinstallprompt` event was previously fired and captured
  if (deferredPrompt) {
    try {
    // Show the installation prompt using the captured event
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    if (result.outcome === 'accepted') {
      console.log('App installed');
    } else {
      console.log('App installation declined');
    }
    deferredPrompt = null; // Reset the deferredPrompt variable
    butInstall.removeEventListener('click', installApp);
  } catch (err) {
    console.error('Error installing the app:', err);
  }
  }
}

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
     // TODO: Perform any necessary actions after the app has been installed
  console.log('App installed successfully');
});

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}