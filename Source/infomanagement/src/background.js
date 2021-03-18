'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

// eslint-disable-next-line no-unused-vars
import { getBaseInfo, setBaseInfo, getJobTypeList, getJobList, chkHr, addJob, delJob, getHrList, getHrListByJobNo, getJobCount, getHrLevel, addHr, getSelectHrList, getHrWorkLog, getProjectDetails, addProject, getProjectList, delProject } from './data-driven.js'
// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Electron框架组件
const electron = require('electron')
const { dialog } = require('electron')
const Menu = electron.Menu
const globalShortcut = electron.globalShortcut
// 引用fs，基于Node.js解析文件
const fs = require('fs')
// 引用node-xlsx，基于Node.js解析excel文件数据及生成excel文件
const xlsx = require('node-xlsx')
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow () {
  Menu.setApplicationMenu(null) // 隐藏菜单栏
  // Create the browser window.
  win = new BrowserWindow({
    width: 1500,
    height: 927,
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
ipcMain.on('getHrListByJobNo', (event, jobNo) => {
  getHrListByJobNo(jobNo, res => {
    event.sender.send('getHrListByJobNo', res)
  })
})
ipcMain.on('getJobCount', (event) => {
  getJobCount(res => {
    event.sender.send('getJobCount', res)
  })
})
ipcMain.on('getHrLevel', (event) => {
  getHrLevel(res => {
    event.sender.send('getHrLevel', res)
  })
})
ipcMain.on('addHr', (event, json) => {
  chkHr(json, res => {
    console.log('chkHr')
    if (res.length > 0) {
      let result = {}
      result.code = 20200 // 状态码（已接受） 服务器已接受请求，但尚未处理。
      if (res[0].mobile_phone === json.mobile_phone) {
        result.msg = json.real_name + '的手机号码与' + res[0].real_name + '的手机号码重复。'
      } else if (res[0].id_number === json.id_number) {
        result.msg = json.real_name + '的身份证号码已存在。'
      }
      event.sender.send('addHr', result)
    } else {
      console.log('addHr')
      addHr(json, res => {
        event.sender.send('addHr', { code: 20000, msg: '数据添加完成。' })
      })
    }
  })
})
ipcMain.on('getExcelInfo', (event) => {
  dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: 'Custom File Type', extensions: ['xls', 'xlsx'] }] }).then(res => {
    console.log('file',res,JSON.stringify(res))
    if (res.canceled) {
      // 取消文件选择
    } else {
      let xls = xlsx.parse(res.filePaths[0])
      event.sender.send('getExcelInfo', xls)
    }
  }).catch(_err => {
    console.log('err', _err)
  })
})
ipcMain.on('getProjectList', (event) => {
  getProjectList(res => {
    event.sender.send('getProjectList', res)
  })
})
ipcMain.on('getProjectDetails', (event, projectNo) => {
  getProjectDetails(projectNo, res => {
    event.sender.send('getProjectDetails', res)
  })
})
ipcMain.on('getSelectHrList', (event, jobNo) => {
  getSelectHrList(jobNo, res => {
    event.sender.send('getSelectHrList', res)
  })
})
ipcMain.on('getHrWorkLog', (event, idNumber) => {
  getHrWorkLog(idNumber, res => {
    event.sender.send('getHrWorkLog', res)
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
ipcMain.on('outExcel', (event, obj) => {
  if (obj) {
    dialog.showSaveDialog({ properties: ['createDirectory '] }).then(res => {
      if (res.canceled) {
        // 取消保存事件
      } else {
        // 自定义表结构
        var data = [{ name: 'Sheet1', data:[] }]
        data[0].data = [['工种','姓名','身份证号','工资标准','工作日期','合计工期','联系方式','住址','开户行','银行账号']]
        // 添加表内容
        obj.details.forEach(item => {
          let _array = JSON.parse('[' + item.date_array + ']')
          let fromatDataArray = []
          _array.forEach(item => {
            fromatDataArray.push(formatShortDate(item)) 
          })
          
          data[0].data.push([item.job_name, item.real_name, item.id_number, item.wages, fromatDataArray, item.day_count, item.mobile_phone, item.address, item.bank_of_deposit, (item.bank_account).toString()])
        })
        // 输出数据
        console.log('data', data)
        fs.writeFileSync(res.filePath + '.xlsx', xlsx.build(data), {'flag':'w'})
      }
    }).catch(_err => {
      console.log('_err', _err)
    })
  }
})
function formatShortDate (datetime) {
  let currDate = new Date(datetime)
  let year = currDate.getFullYear()
  let month = ((currDate.getMonth() + 1).toString().length > 1) ? currDate.getMonth() + 1 : '0' + (currDate.getMonth() + 1)
  let day = (currDate.getDate().toString().length > 1) ? currDate.getDate() : '0' + currDate.getDate()
  return year + '/' + month + '/' + day
}
