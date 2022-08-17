let chp = require('child_process')

const electron = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 640,
    height: 210,
    title: "YouTube Captions",
    resizable: false,
  })

  win.loadURL(`file://${__dirname}/public/index.html`)
}

let serverProcess;

app.whenReady().then(() => {
  serverProcess = chp.fork(__dirname + '/server/main.js')
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    serverProcess.kill();
    app.quit();
  }
})
