const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
let win
function createWindow () {
  // 创建浏览器窗口。
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    resizable:false,
    fullscreenable:false,
    show: false,
  })
  win.loadURL(url.format({
    pathname: path.join(__dirname,'view','index.html'),
    protocol: 'file:',
    slashes: true
  }))
  // 打开开发者工具。
  //win.webContents.openDevTools()
  win.on('closed', () => {win = null})
  win.once('ready-to-show', () => {win.show()})
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {if (process.platform !== 'darwin') {app.quit()}})
app.on('activate', () => {if (win === null) {createWindow()}})
