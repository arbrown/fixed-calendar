Date.prototype.getDayOfYear = function() {
  var dayMs = 24 * 60 * 60 * 1000;
  var janFirst = new Date(this.getFullYear(),0,1);
  // 'date' is date at 2 am to ensure that daylight saving doesn't
  // screw up the calculation of ms since year start.
  var date = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 2)
  return Math.ceil((date-janFirst) / dayMs);
};

//Leap year every 4 years... except when it isn't... except when it is
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
  var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday",
              "Thursday", "Friday", "Saturday"]
  var fd = {year: this.getFullYear()}
  var days = this.getDayOfYear();
  var month = Math.floor((days-1) / 28);
  var date = days%28;
  if (date == 0) {
    date = 28;
  }
  fd.day = daysOfWeek[(date-1)%7];
  var leapYear = isLeapYear(this.getFullYear());
  if (leapYear){
    if (days == 169){
      // special leap day case
      fd.monthName = "Leap Day";
      fd.date = 0;
      fd.isSpecial = true;
      return fd;
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
      fd.monthName = "Year Day";
      fd.date = 0;
      fd.isSpecial = true;
      return fd;
    }
  }
  else if (days == 365){
    //day 365 is "year day"
    fd.monthName = "Year Day";
    fd.date = 0;
    fd.isSpecial = true;
    return fd;
  }
  fd.monthName = months[month];
  fd.date = date;
  return fd;
}

Date.prototype.toFixedDateString = function() {
  var fd = this.toFixedDate();
  if (fd.isSpecial){
    return fd.monthName + " " + fd.year;
  }
  return fd.day + ", " + fd.monthName + " " + fd.date
          + ", " + fd.year
}

ordinal = function(n){
  end = n %100;
  if (end > 10 && end < 14){
    return n + "th";
  }
  end = end % 10;
  switch (end){
    case 1:
      return n + "st";
      break;
    case 2:
      return n + "nd";
      break;
    case 3:
      return n + "rd";
      break;
    default:
      return n + "th";
  }
}
