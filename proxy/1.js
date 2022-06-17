const person = { name: 'G', age: 22 };
const proxy = new Proxy(person, {
  get(target, key, receiver) {
    console.log('第一个', target, key, proxy);
    return Reflect.get(target, key, receiver);
  },
});

const proxy2 = new Proxy(proxy, {
  get(target, key, receiver) {
    target[key];
    console.log('第二个');
  },
});

proxy2.name;
