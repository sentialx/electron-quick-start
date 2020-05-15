const { ipcRenderer } = require("electron");

process.on('document-start', async () => {
  const api = {
    something: () => {
      ipcRenderer.invoke('chrome.something');
    }
  }

  window.api = api;
});
