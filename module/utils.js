function C() {
  this.sum = 10;
  this.add = function () {
    this.sum += 1;
  };
  this.show = function () {
    console.log(this.sum);
  };
}


console.log('  被引入....')
export let c = new C();
export default {
  sex: 'gaowujie',
  sign: 'default'
}

setInterval(_ => {
  name = 'gaowujie' + Math.random()*10000
}, 1000) 

export var name = 'gaowujie'

