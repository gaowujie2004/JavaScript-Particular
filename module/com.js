console.log('com.js');

class Person {
  constructor(age, name) {
    this.age = age;
    this.name = name;
  }

  setName(newName) {
    this.name = newName;
  }
}
export const A = new Person(23, 'GaowuJie');
