QUnit.test("Hello, test", function(assert) {

  assert.ok(1=="1", "passed!");
});


QUnit.test("toFixedDate(d) exists", function(assert) {
  var fixed = toFixedDate(new Date());
  assert.ok(fixed != null);
});
