$(document).ready(function(){
  var fd = new Date().toFixedDate();
  var title = $('title');
  title.html(new Date().toFixedDateString());
  var calendar = $('time.icon');
  calendar.append('<em>'+fd.day+'</em>');
  calendar.append('<strong>'+fd.monthName+'</strong>');
  calendar.append('<span>'+fd.date+'</span>');
})
