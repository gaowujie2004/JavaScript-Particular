# JavaScript-Particular

通过 DEMO，深入理解 JavaScript 中的知识点。更侧重讲解背后的原理，虽然不侧重项目经验，但可用于反哺项目优化。

# 浏览器渲染原理（Chrome）

# 闭包&内存

- 闭包结合全局变量很容易造成内存泄漏，为此写了很多最小测试代码用来分析

# 替换元素内置行为

- 创建一个 img，设置 src 属性，但不插入 DOM 树中，会发起网络请求吗？
- script、link css 是一样的规则吗？
- css 属性是一样的规则吗？

- 删除掉 <link href="xxxxxx.css"> 中的 href 属性，样式会丢失吗？
- 这一系列都是个黑盒子，更像是一种响应式，我只是更改了一个属性，就引发这么多变化，
- 这样会不会太耦合了？但也有好处：不需要手动额外处理了。

# UI

- 着重讲解浏览器的渲染原理
- 对项目的运行时优化很有帮助
