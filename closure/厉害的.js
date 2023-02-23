class Test {
  constructor() {
    this.a = 111;
    this.b = 222;
  }
}

function father() {
  const f1 = 9090;
  const f2 = new Test();

  function temp() {
    f1;
    f2;
  }

  return () => {
    console.log('hhhh');
  };
}

const f = father();
f;
