// import path from 'path';
// import { app, BrowserWindow } from 'electron';
// import isDev from 'electron-is-dev';

(
    async () => 
    {
      const app = await import('electron').then(x => x.app);
      const BrowserWindow = await import('electron').then(x => x.BrowserWindow);
    
      const path = await import('path').then(x => x.default);
      const isDev = await import('electron-is-dev').then(x => x.default);

      function createWindow() {
        // Create the browser window.
        const win = new BrowserWindow({
          width: 850,
          height: 700,
          webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
          },
        });
      
        // Load the index.html from a url
        win.loadURL(
          isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
        );
      
        // Open the DevTools.
        if (isDev) {
          win.webContents.openDevTools({ mode: 'detach' });
        }
      }

      
      // This method will be called when Electron has finished
      // initialization and is ready to create browser windows.
      // Some APIs can only be used after this event occurs.
      app.whenReady().then(createWindow);

      // Quit when all windows are closed, except on macOS. There, it's common
      // for applications and their menu bar to stay active until the user quits
      // explicitly with Cmd + Q.
      app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
          app.quit();
        }
      });

      app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow();
        }
      });

    
    }
  )().catch(console.error);







