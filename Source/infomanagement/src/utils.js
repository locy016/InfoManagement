export default {
  install (Vue) {
    /* 短格式时间 */
    Vue.prototype.formatShortDate = function (datetime) {
      var currDate = new Date(datetime)
      // var year = currDate.getFullYear()
      // var month = ((currDate.getMonth() + 1).toString().length > 1) ? currDate.getMonth() + 1 : '0' + (currDate.getMonth() + 1)
      // var day = (currDate.getDate().toString().length > 1) ? currDate.getDate() : '0' + currDate.getDate()
      // var hour = (currDate.getHours().toString().length > 1) ? currDate.getHours() : '0' + currDate.getHours()
      // var minute = (currDate.getMinutes().toString().length > 1) ? currDate.getMinutes() : '0' + currDate.getMinutes()
      // return year + '/' + month + '/' + day
      return currDate.toLocaleDateString()
    }
    Vue.prototype.calculateAge = function (birthday) {
      birthday = new Date(birthday.substr(0, 4), birthday.substr(4, 2), birthday.substr(6, 2))
      let today = new Date()
      let age = today.getFullYear() - birthday.getFullYear()
      if (today.getMonth() > birthday.getMonth() || (today.getMonth() === birthday.getMonth() && today.getDay() >= birthday.getDay())) {
        return age
      } else {
        return age - 1
      }
    }
  }
}
