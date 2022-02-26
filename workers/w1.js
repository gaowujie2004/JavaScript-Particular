// import N from '/esm.js';

// console.info('%c🇨🇳module', 'font-size:25px;color:deeppink;', N);

console.info('%c🇨🇳工作者线程 w1', 'font-size:25px;color:deeppink;', self);

addEventListener('message', (ev) => {
  console.log('工作者线程内： ', ev);
  //   self.close();
});

console.info('%c🇨🇳工作者线程 featch', 'font-size:25px;color:deeppink;', self.fetch('/'));

console.info('%c🇨🇳module 方法', 'font-size:25px;color:deeppink;', self.importScripts('./esm.js'));
