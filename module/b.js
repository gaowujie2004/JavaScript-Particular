import { A as b } from './com.js';
console.log(JSON.stringify(b));

setTimeout(async () => {
  const res = await import('./com.js');
  // 同一个
  console.log(JSON.stringify(res));
});

console.log('my b.js');
