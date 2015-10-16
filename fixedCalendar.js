Date.prototype.getDayOfYear = function() {
  var dayMs = 24 * 60 * 60 * 1000;
  var janFirst = new Date(this.getFullYear(),0,1);
  // 'date' is date at 2 am to ensure that daylight saving doesn't
  // screw up the calculation of ms since year start.
  var date = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 2)
  return Math.ceil((date-janFirst) / dayMs);
};

function isLeapYear(year){
  return year%4==0&&(year%100!=0||year%400==0);
}

Date.prototype.toFixedDate = function(){
  var months = [
    "January", "February", "March",
    "April", "May", "June",
    "Sol",
    "July", "August", "September",
    "October", "November", "December"
  ]
  var days = this.getDayOfYear();
  var month = Math.floor((days-1) / 28);
  var date = days%28;
  if (date == 0) {
    date = 28;
  }
  var leapYear = isLeapYear(this.getFullYear());
  if (leapYear){
    if (days == 169){
      // special leap day case
      return {monthName: "Leap Day", date: 0, isSpecial: true}
    }
    else if (days > 169) {
      //subtract leap day
      date = (days-1) % 28;
      if (date == 0) {
        date = 28;
      }
      month = Math.floor((days-2) / 28);
    }
    if (days == 366){
      return {monthName: "Year Day", date: 0, isSpecial: true}
    }
  }
  else if (days == 365){
    //day 365 is "year day"
    return {monthName: "Year Day", date: 0, isSpecial: true}
  }
  return {monthName: months[month], date: date};
}
