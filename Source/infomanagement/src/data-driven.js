// var fs = require('fs')
var path = (process.env.WEBPACK_DEV_SERVER_URL) ? 'db/' : 'resources/db/'
var file = path + 'database.db' // 数据库文件的路径
// resources/db/database.db
// var exists = fs.existsSync(file)
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(file)

export function getBaseInfo (callback) {
  let sql = 'select * from t_configure'
  db.each(sql, function (_err, row) {
    callback(row)
  })
}

export function getJobTypeList (callback) {
  let sql = 'select type_no, Type_name, schedule from t_job_type'
  db.all(sql, function (_err, row) {
    callback(row)
  })
}

export function getJobList (callback) {
  let sql = 'select t_job.job_no, t_job.job_name, t_job.type_no, t_job.schedule, t_job.pay, t_job_type.type_name from t_job left join t_job_type on t_job.[type_no] = t_job_type.[type_no]'
  db.all(sql, function (_err, row) {
    callback(row)
  })
}

export function addJob (json, callback) {
  let sql = db.prepare('insert into t_job (job_no, job_name, type_no, schedule, pay) values ("' + json.job_no + '","' + json.job_name + '","' + json.type_no + '",' + json.schedule + ',' + json.pay + ') ')
  sql.run()
  callback(sql)
}

export function delJob (json, callback) {
  let sql = db.prepare('delete from t_job where job_no = "' + json.job_no + '"')
  sql.run()
  callback(sql)
}

export function getHrList (callback) {
  let sql = 'select real_name, mobile_phone, id_number, address, bank_of_deposit, bank_account, t_hr.job_no, t_job.job_name, t_job.pay, level, t_hr_level.[level_name], use_flag, del_flag, create_time from t_hr left join t_hr_level on t_hr.level = t_hr_level.level_no left join t_job on t_hr.job_no = t_job.job_no'
  db.all(sql, function (_err, row) {
    callback(row)
  })
}

export function getHrLevel (callback) {
  let sql = 'select level_name, level_no from t_hr_level'
  db.all(sql, function (_err, row) {
    callback(row)
  })
}

export function addHr (json, callback) {
  let sql = db.prepare('insert into t_hr (real_name, mobile_phone, id_number, address, bank_of_deposit, bank_account, job_no, level, use_flag, del_flag, create_time) values ("' + json.real_name + '","' + json.mobile_phone + '","' + json.id_number + '","' + json.address + '","' + json.bank_of_deposit + '","' + json.bank_account + '","' + json.job_no + '",' + json.level + ',1 ,0,"' + new Date() + '" )')
  sql.run()
  callback(sql)
}

export function getSelectHrList (callback) {
  let sql = 'select t_hr.real_name, mobile_phone, t_hr.id_number, address, bank_of_deposit, bank_account, t_hr.job_no, t_job.job_name, t_job.pay, level, t_hr_level.[level_name], use_flag, del_flag, create_time, (select date_array from t_project_details where t_project_details.[id_number] = t_hr.[id_number] order by id desc limit 0,1 ) from t_hr left join t_hr_level on t_hr.level = t_hr_level.level_no left join t_job on t_hr.job_no = t_job.job_no'
  db.all(sql, function (_err, row) {
    callback(row)
  })
}

export function addProject (json, callback) {
  // 插入信息
  let sql = db.prepare('insert into t_project_dispatch (project_no, project_name, project_address, project_range, construction_unit, employer_unit, project_price, tax_rate, start_date, end_date) values ("' + json.project_no + '","' + json.project_name + '","' + json.project_address + '","' + json.project_range + '","' + json.construction_unit + '","' + json.employer_unit + '",' + json.project_price + ',' + json.tax_rate + ',"' + json.start_date + '","' + json.end_date + '")')
  // console.log('insert into t_project_dispatch (project_no, project_name, project_address, project_range, construction_unit, employer_unit, project_price, tax_rate, start_date, end_date) values ("' + json.project_no + '","' + json.project_name + '","' + json.project_address + '","' + json.project_range + '","' + json.construction_unit + '","' + json.employer_unit + '",' + json.project_price + ',' + json.tax_rate + ',"' + json.start_date + '","' + json.end_date + '")')
  sql.run()
  json.detailData.forEach(element => {
    // 循环子信息
    let _ext = db.prepare('insert into t_project_details (project_no, job_name, real_name, id_number, wages, date_array, day_count) values ("' + json.project_no + '", "' + element.job_name + '", "' + element.real_name + '", "' + element.id_number + '", ' + element.pay + ', "' + element.date_array + '", ' + element.day_count + ')')
    console.log('insert into t_project_details (project_no, job_name, real_name, id_number, wages, date_array, day_count) values ("' + json.project_no + '", "' + element.job_name + '", "' + element.real_name + '", "' + element.id_number + '", ' + element.pay + ', "' + element.date_array + '", ' + element.day_count + ')')
    _ext.run()
  })
  callback(sql)
}

export function getProjectList (callback) {
  let sql = 'select project_no, project_name, project_address, project_range, construction_unit, employer_unit, project_price, tax_rate, start_date, end_date from t_project_dispatch'
  db.all(sql, function (_err, row) {
    callback(row)
  })
}

export function delProject (json, callback) {
  let sql = db.prepare('delete from t_project_dispatch where project_no = "' + json.project_no + '"')
  sql.run()
  callback(sql)
}

export default { getBaseInfo, getJobTypeList, getJobList, addJob, delJob, getHrList, getHrLevel, addHr, addProject, getProjectList, delProject }
