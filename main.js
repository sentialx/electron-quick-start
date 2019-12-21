const {app, BrowserWindow, session} = require('electron')
const {resolve} = require('path');
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      sandbox: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      contextIsolation: true,
    }
  })

  session.defaultSession.webRequest.onBeforeRequest(
    { urls: ['<all_urls>'] },
    (details, callback) => {
      callback({ cancel: false });
    },
  );
  
  mainWindow.loadURL('http://google.com');
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
