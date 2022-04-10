function father() {
  var f1 = 100;
  var f2 = { name: 'father' };

  return {
    son1() {
      f1, f2;
    },

    son2() {
      console.log('我就是输出啊');
    },
  };
}

const resFn = father();
