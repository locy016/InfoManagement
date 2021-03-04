'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

// eslint-disable-next-line no-unused-vars
import { getBaseInfo, setBaseInfo, getJobTypeList, getJobList, addJob, delJob, getHrList, getHrLevel, addHr, addProject, getProjectList, delProject } from './data-driven.js'
// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Electron框架组件
const electron = require('electron')
const Menu = electron.Menu
const globalShortcut = electron.globalShortcut
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow () {
  Menu.setApplicationMenu(null) // 隐藏菜单栏
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: '信息管理',
    frame: true,
    webPreferences: {
      webSecurity: false, // 取消跨域限制
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true // process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function exit () {
  // 注销所有快捷键
  globalShortcut.unregisterAll()
  app.quit()
}

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    /* try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    } */
  }
  createWindow()
  // getBaseInfo()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// 注册全局快捷键
app.whenReady().then(() => {
  // 注册Ctrl+F1快捷键事件
  globalShortcut.register('CommandOrControl+F1', () => {
    exit()
  })
})

// 监听渲染进程通信
ipcMain.on('getBaseInfo', (event) => {
  getBaseInfo(res => {
    event.sender.send('getBaseInfo', res)
  })
})
ipcMain.on('getJobTypeList', (event) => {
  getJobTypeList(res => {
    event.sender.send('getJobTypeList', res)
  })
})
ipcMain.on('getJobList', (event) => {
  getJobList(res => {
    event.sender.send('getJobList', res)
  })
})
ipcMain.on('addJob', (event, json) => {
  addJob(json, res => {
    event.sender.send('addJob', res)
  })
})
ipcMain.on('delJob', (event, json) => {
  delJob(json, res => {
    event.sender.send('delJob', res)
  })
})
ipcMain.on('getHrList', (event) => {
  getHrList(res => {
    event.sender.send('getHrList', res)
  })
})
ipcMain.on('getHrLevel', (event) => {
  getHrLevel(res => {
    event.sender.send('getHrLevel', res)
  })
})
ipcMain.on('addHr', (event, json) => {
  addHr(json, res => {
    event.sender.send('addHr', res)
  })
})
ipcMain.on('getProjectList', (event) => {
  getProjectList(res => {
    event.sender.send('getProjectList', res)
  })
})
ipcMain.on('addProject', (event, json) => {
  addProject(json, res => {
    event.sender.send('addProject', res)
  })
})
ipcMain.on('delProject', (event, json) => {
  delProject(json, res => {
    event.sender.send('delProject', res)
  })
})
