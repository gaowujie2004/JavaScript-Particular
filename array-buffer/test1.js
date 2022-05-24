// 只有一次性写多个数据，才会涉及到「小端」「大端」吗？

/**================================== setInt8 **/
(() => {
  const buf = new ArrayBuffer(4);
  const dv = new DataView(buf);

  dv.setUint8(0, 5, true);
  dv.setUint8(1, 6, true);
  dv.setUint8(2, 7, true);
  dv.setUint8(3, 8, true);

  // setInt8、setUint8 无论大端写入，还是小端写入。 都是一样的，
  // [ 0x05,  0x06,  0x07,  0x08 ]
  // todo: 为什么呢
  console.log('setUint8 --', dv);
})();

/**================================== setUint16 小端 **/
(() => {
  const buf = new ArrayBuffer(6);
  const dv = new DataView(buf);
  //

  dv.setUint8(0, 1, true);
  dv.setUint8(1, 2, true);

  dv.setUint16(2, 0x3456, true); // 2 byte
  dv.setUint16(4, 0x7891, true); // 2 byte   小端写入

  // todo: 为什么呢
  // [ 0x01, 0x02, 0x56, 0x34,  0x91,  0x78 ]
  console.log('setUint16 -- littleEndian', dv);
})();

/**================================== setUint16 大端写入 **/
(() => {
  const buf = new ArrayBuffer(6);
  const dv = new DataView(buf);

  dv.setUint8(0, 1, true);
  dv.setUint8(1, 2, true);

  dv.setUint16(2, 0x3456); // 2 byte   大端写入
  dv.setUint16(4, 0x7891); // 2 byte   大端写入

  // todo: 为什么呢
  // [ 0x01, 0x02, 0x34, 0x56, 0x78, 0x91 ]
  console.log('setUint16 -- bigEndian', dv);
})();

/**================================== getUint16 **/
(() => {
  const buf = new ArrayBuffer(6);
  const dv = new DataView(buf);

  dv.setUint8(0, 1, true);
  dv.setUint8(1, 2, true);

  dv.setUint16(2, 0x3456); // 2 byte   大端写入
  dv.setUint16(4, 0x7891); // 2 byte   大端写入

  // todo: 为什么呢
  // [ 0x01, 0x02, 0x34, 0x56, 0x78, 0x91 ]
  // 在底层是这样的。

  // 读的时候 两字节读取， dv.getUint16(0, false) 遇到两个字节，那是正着读还是倒着读。
  dv.getUint16(0, true);
})();

let a = 0;
