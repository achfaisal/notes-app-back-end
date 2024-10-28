class MyClass {
  constructor(value) {
    this.value = value;
  }

  showValue() {
    console.log(this.value); // Mengakses 'this.value'
  }
}

const testClass = (params) => ({
  test: params.showValue,
});

const runner = () => {
  const classOne = new MyClass(100);
  testClass(classOne).test();
};

runner();
