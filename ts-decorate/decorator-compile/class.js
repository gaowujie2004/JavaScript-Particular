// @ClassDecorate()
// class ExampleClass {
//   constructor() {
//     console.log('ExampleClass new....');
//   }
// }

function ClassDecorate() {
  console.log("classDecorate: factory call");

  return function (Target) {
    return class Wrapper {
      constructor() {
        console.log("被替换了");
      }
    };
  };
}

let ExampleClass = class ExampleClass {};
ExampleClass = __decorate([ClassDecorate()], ExampleClass);
