function Test() {
  this.name = new Array(50000).fill('Test');
  this.count = `${++Test.clickCount} 次的数据`;
}
Test.clickCount = 0;

var theThing = null;
document.onclick = function clickFn() {
  console.log(1);
  let originalThing = theThing;

  function unused() {
    if (originalThing) console.log('hi');
  }

  theThing = {
    newData: new Test(),
    someMethod: function () {
      console.log('someMessage');
    },
  };
};
