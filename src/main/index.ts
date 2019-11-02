import { app, session, BrowserWindow } from 'electron';
import { platform } from 'os';
import { protocol } from 'electron';
import { parse } from 'url';

let mainWindow

process.on('uncaughtException', error => {
  console.error(error);
});

app.on('window-all-closed', () => {
  if (platform() !== 'darwin') {
    app.quit();
  }
});

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'wexond',
    privileges: {
      bypassCSP: true,
      secure: true,
      standard: true,
      supportFetchAPI: true,
      allowServiceWorkers: true,
      corsEnabled: false,
    },
  },
]);

export const registerProtocol = (session: Electron.Session) => {
  session.protocol.registerHttpProtocol(
    'wexond',
    (request, callback: any) => {
      const parsed = parse(request.url);

      const baseUrl = 'http://localhost:4445/';

      if (parsed.path === '/') {
        return callback({
          url: `${baseUrl}${parsed.hostname}.html`,
        });
      }

      callback({ url: `${baseUrl}${parsed.path}` });
    },
    error => {
      if (error) console.error(error);
    },
  );
};

(async function() {
  await app.whenReady();

  registerProtocol(session.defaultSession);

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    }
  })

  mainWindow.loadURL('wexond://app') // <--- this works in Electron 6
  // mainWindow.loadURL('http://localhost:4445/app.html') // <--- this works normally in Electron 7

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
})();