// fiber 树结构
const A1 = { type: 'div', key: 'A1' };

const B1 = { type: 'div', key: 'B1', return: A1 };
const B2 = { type: 'div', key: 'B2', return: A1 };

const C1 = { type: 'div', key: 'C1', return: B1 };
const C2 = { type: 'div', key: 'C2', return: B1 };

// return 指针、child 指针(大儿子)、 sibling 指针（下一个兄弟）
A1.child = B1;

B1.child = C1;
B1.sibling = B2;

C1.sibling = C2;

module.exports = A1;
