QUnit.test("toFixedDate(d) exists", function(assert) {
  assert.ok(Date.prototype.toFixedDate != null);
});

QUnit.assert.DoY = function(t){

  var date = new Date(t.year, t.month-1, t.date);
  var actual = date.getDayOfYear();
  QUnit.push(actual == t.result, actual, t.result, date.toString() +
   " should be day number " + t.result);
}

QUnit.test("Day of Year Test", function(a){
  var tests =
    [
      {month: 1, date: 1, year: 2015, result: 1},
      {month: 12, date: 31, year: 2015, result: 365},
      {month: 12, date: 31, year: 2016, result: 366},
      {month: 10, date: 14, year: 2015, result: 287},
      {month: 2, date: 28, year: 2015, result: 59},
      {month: 4, date: 3, year: 2012, result: 94},
    ];
    tests.forEach(function(t) {
      a.DoY(t);
    });
});

QUnit.test("Leap Year Test", function(a){
  a.ok(isLeapYear(2012), "2012 should be a leap year");
  a.ok(isLeapYear(2016), "2016 should be a leap year");
  a.notOk(isLeapYear(2015), "2015 should not be a leap year");
  a.notOk(isLeapYear(2007), "2007 should not be a leap year");
  a.notOk(isLeapYear(1900), "1900 should not be a leap year");
  a.notOk(isLeapYear(2100), "2100 should not be a leap year");
  a.ok(isLeapYear(2000), "2000 should be a leap year");
});

QUnit.assert.fixTest = function(t){
  var fd = t.date.toFixedDate();
  QUnit.push(fd.monthName == t.expected.monthName
     && fd.date == t.expected.date,
     fd, t.expected,
     t.date.toString() + " should be " + t.expected.monthName + " "
     + t.expected.date + " (fixed)."
     )
};

QUnit.test("Fixed Date Conversion Tests", function(a) {
  var tests = [
    {date: new Date(2015, 0, 1), expected: {monthName: "January", date: 1}},
    {date: new Date(2015, 0, 28), expected: {monthName: "January", date: 28}},
    {date: new Date(2015, 0, 29), expected: {monthName: "February", date: 1}},
    {date: new Date(2012, 5, 17), expected: {monthName: "Leap Day", date: 0}},
    {date: new Date(1999, 11, 31), expected: {monthName: "Year Day", date: 0}},
    {date: new Date(1999, 11, 30), expected: {monthName: "December", date: 28}},
    {date: new Date(2000, 11, 30), expected: {monthName: "December", date: 28}},
    {date: new Date(2000, 11, 31), expected: {monthName: "Year Day", date: 0}},
    {date: new Date(2012, 5, 18), expected: {monthName: "Sol", date: 1}},
    {date: new Date(2014, 7, 4), expected: {monthName: "July", date: 20}},
    {date: new Date(2012, 7, 4), expected: {monthName: "July", date: 20}},
    {date: new Date(2014, 3, 3), expected: {monthName: "April", date: 9}},
    {date: new Date(2012, 3, 3), expected: {monthName: "April", date: 10}},
    {date: new Date(2015, 9, 7), expected: {monthName: "September", date: 28}},
    {date: new Date(2012, 11, 3), expected: {monthName: "December", date: 1}},
    {date: new Date(2012, 5, 19), expected: {monthName: "Sol", date: 2}},
    {date: new Date(2013, 5, 19), expected: {monthName: "Sol", date: 2}},
  ];

  tests.forEach(function(t){
    a.fixTest(t)
  });
});

// I decided not to use this in my strings, but it scratched an itch.
QUnit.test("Ordinal Number Tests", function(a) {
  var tests = [
    {n: 1, expected: "1st"},
    {n: 2, expected: "2nd"},
    {n: 3, expected: "3rd"},
    {n: 11, expected: "11th"},
    {n: 12, expected: "12th"},
    {n: 13, expected: "13th"},
    {n: 21, expected: "21st"},
    {n: 22, expected: "22nd"},
    {n: 23, expected: "23rd"},
    {n: 200, expected: "200th"},
    {n: 1337, expected: "1337th"},
    {n: 2021, expected: "2021st"},
    {n: 999, expected: "999th"},
    {n: 323, expected: "323rd"},
  ];
  tests.forEach(function(t) {
    var actual = ordinal(t.n);
    a.equal(actual, t.expected);
  });
});

QUnit.test("Fixed Date Strings Tests", function(a){
  var tests = [
    {date: new Date(2015, 0, 1), expected: "Sunday, January 1, 2015"},
    {date: new Date(2014, 0, 1), expected: "Sunday, January 1, 2014"},
    {date: new Date(2015, 11, 30), expected: "Saturday, December 28, 2015"},
    {date: new Date(2015, 11, 31), expected: "Year Day 2015"},
    {date: new Date(2016, 5, 17), expected: "Leap Day 2016"},
    {date: new Date(2015, 5, 17), expected: "Saturday, June 28, 2015"},
  ];
  tests.forEach(function(t){
    a.equal(t.date.toFixedDateString(), t.expected);
  });
});
