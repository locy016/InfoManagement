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

export function setBaseInfo (callback) {
  let sql = db.prepare('update config set where ID = 1')
  sql.run()
  console.log('update', sql)
}

export default { getBaseInfo, setBaseInfo }
