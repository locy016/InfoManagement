// var fs = require('fs')
var file = 'database.db' // 数据库文件的路径
// var exists = fs.existsSync(file)
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(file)

export function getBaseInfo (callback) {
  let sql = 'select * from config'
  db.each(sql, function (_err, row) {
    callback(row)
  })
}

export function setBaseInfo (json, callback) {
  let sql = db.prepare('update config set where ID = 1')
  sql.run()
  console.log('update', sql)
}

export function getJobList (callback) {
  let sql = 'select * form t_job'
  db.all(sql, function (_err, row) {
    callback(row)
  })
}

export function addJob (callback) {
  let sql = db.prepare('insert t_job set ')
  sql.run()
  callback(sql)
}

export function updJob (callback) {
  let sql = db.prepare('')
  sql.run()
  callback(sql)
}

export function delJob (callback) {
  let sql = db.prepare('')
  sql.run()
  callback(sql)
}

export default { getBaseInfo, setBaseInfo }
