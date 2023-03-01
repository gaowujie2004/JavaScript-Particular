class GWJError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'GWJError';
  }
}

throw new GWJError('我是错误，类型是：Error');
