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
  }
}
