const w1 = new Worker('w1.js');

console.log('main');
let mainSleep = function (duration = 1000) {
  let date = Date.now();
  while (Date.now() - date <= duration) {}
};
// w1.postMessage(mainSleep);
