const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const {dialog} = require('electron')

let win

function createWindow () {
  // 创建浏览器窗口。
  win = new BrowserWindow({width: 800, height: 800})
  win.loadURL(url.format({
    pathname: path.join(__dirname,'view','index.html'),
    protocol: 'file:',
    slashes: true
  }))
  // 打开开发者工具。
  win.webContents.openDevTools()
  // dialog.showOpenDialog({properties: ['openDirectory']})
  win.on('closed', () => {win = null})
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {if (process.platform !== 'darwin') {app.quit()}})

app.on('activate', () => {
  if (win === null) {createWindow()}
})
