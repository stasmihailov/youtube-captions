let chp = require('child_process')

const electron = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile(__dirname + '/client/index.html')
}

let serverProcess;

app.whenReady().then(() => {
  serverProcess = chp.fork(__dirname + '/server/main.js')
  createWindow()
})

app.on('window-all-closed', () => {
  serverProcess.kill();
  app.quit();
})
