const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  // Create the browser window with specific settings
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      // Necessary for a modern Electron app
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // Load the built index.html file from the 'dist' folder
  mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));

  // Optional: Open the DevTools.
  // mainWindow.webContents.openDevTools(); 
}

// When the Electron application is ready, run the createWindow function
app.whenReady().then(() => {
  createWindow();

  // On macOS, re-create a window if the dock icon is clicked and no windows are open
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});