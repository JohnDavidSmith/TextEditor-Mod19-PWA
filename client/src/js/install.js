
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault(); // Prevent the default behavior of the event
    window.deferredPrompt = event; // Store the event for later use   
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
      // TODO: Check if the `beforeinstallprompt` event was previously fired and captured
  if (window.deferredPrompt) {
    // Show the installation prompt using the captured event
    window.deferredPrompt.prompt();
    const result = await window.deferredPrompt.userChoice;
    if (result.outcome === 'accepted') {
      console.log('App installed');
    } else {
      console.log('App installation declined');
    }
    window.deferredPrompt = null; // Reset the deferredPrompt variable
  }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
     // TODO: Perform any necessary actions after the app has been installed
  console.log('App installed successfully');
});

