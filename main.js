// Modules to control application life and create native browser window
const {app, BrowserWindow, session} = require('electron')
const path = require('path')
const http = require('http');

http
  .createServer((req, res) => {
    res.setHeader('Content-Security-Policy', 'frame-ancestors *');
    res.end('Hello World');
  })
  .listen(8192);

async function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.webContents.openDevTools({ mode: 'detach' });

  const extension = await session.defaultSession.loadExtension(path.resolve(__dirname, './test'));

  // and load the index.html of the app.
  mainWindow.loadURL(`${extension.url}index.html`);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
