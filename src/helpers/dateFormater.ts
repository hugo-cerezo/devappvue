export class dateFormater {
  getFormatedDate(date?: Date) {
    if (!date) date = new Date()
    return date.getFullYear() + '-' + this._month(date) + '-' + this._day(date)
  }

  private _day = (date: Date) => {
    let dateStr = date.getDate().toString()
    if (dateStr.length < 2) {
      return '0' + dateStr
    } else {
      return dateStr
    }
  }
  private _month = (date: Date) => {
    let dateStr = date.getMonth().toString()
    if (dateStr.length < 2) {
      return '0' + (date.getMonth() + 1)
    } else {
      return date.getMonth().toString()
    }
  }
}
