// 能够解析 指令 和 {{}}  替换成数据得形式

// 编译 vm.$el  解析{{}}  指令
CompilerUtils = {
  getVal(vm, expr) {           //'school'.split('.') => ['school']
    // expr: school.name
    // ['school', 'name']
    return expr.split('.').reduce((obj, key) => {
      // 第一次循环: vm.$data -> obj
      return obj[key]
    }, vm.$data)
  },
  text(node, expr, vm) { // expr: {{school.name}} {{}}  文字

    let value = expr.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (...[, $1]) => {
      return this.getVal(vm, $1)
    })
    let fun = this.updater['textUpdater']
    fun(node, value)
  },
  html() {
    // node.innerHTML = xxx
  },
  model(node, expr, vm) {
    // expr: school.name 到 vm.$data 查找
    // 要做: 赋予 input.value 值
    let value = this.getVal(vm, expr)
    let fun = this.updater['modelUpdater']
    // console.log(value, '-----------> school.name')
    fun(node, value)
  },
  updater: {
    // input value 更新
    modelUpdater(node, value) {
      node.value = value
    },
    // 文本节点 替换内容
    textUpdater(node, value) {
      node.textContent = value
    }
  }
}
class Compiler {
  constructor(el, vm) {
    // 根节点节点对象生成
    this.el = this.isElementNode(el)? el:document.querySelector(el)
    this.vm = vm

    // 文档片段对象
    this.frag = this.node2Fragment(this.el)

    // 把节点内容替换

    // 编译模板  用数据代替
    this.compiler(this.frag)
  
    // 把内容(处理好的)塞到页面中
    this.el.appendChild(this.frag)
  }

  // 是否是指令 v-model v-if v-show v-bind :class
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }

  // 编译元素节点 - 解析指令 | 深递归
  compilerElement(node) {
    // 类数组, 数组元素是 HTML标签属性节点对象
    let attrs = node.attributes;

    // 当前元素节点 是否具有 指令属性?
    [...attrs].forEach(attr => {
      // attr 属性节点对象 { nodeName:'class', nodeValue:'btn btn-red', name, value }
      // "v-model=school.name"
      let {name, value:expr} = attr
      // console.log(`HTML标签属性名: ${name}`, `html标签属性名对应值:${value}`);
      if ( this.isDirective(name) ) {
        let [, directive] = name.split('-')

        // 需要调用不同得函数处理不同得指令
        // 我拿到 数据对象, 然后又要表达式, 找到值后 再去替换节点中得数据
        CompilerUtils[directive](node, expr, this.vm)
      }
    })
  }
  // 编译文本节点 - 解析{{}}
  compilerText(node) {
    // 是否包含 {{}} 这种语法 不包含{{}}  就不做处理
    let text = node.textContent
    // console.log(text)

    // 文本节点没有使用{{}}
    if (!/\{\{[^}]+\}\}/.test(text))  {
      return
    }
    // 存在{{}}语法
    // 解析 {{school.name}} 里面部分得表达式

    CompilerUtils['text'](node, text, this.vm)

  }

  // 编译内存中的 dom节点
  compiler(node) {  
    // 替换具有 {{}} 的文本节点
    // 替换具有 v-model 等 v开头的指令
    // 如果是元素节点, 继续查找其里面的 文本节点
    let childNodes = node.childNodes     //第一层直接子节点
    ;[...childNodes].forEach(child => {
      if (this.isElementNode(child)) {
        this.compilerElement(child)
        // 是元素节点 需要递归遍历子节点
        this.compiler(child)
        return 
      } 
      // 不是元素节点, 是文本节点对象 {递归的退出条件}
      this.compilerText(child)
    })
  }

  isElementNode(el) {
    // this.el 要么是 选择器字符串 | DOM节点对象
    return el.nodeType === 1;
  }

  // 处理根节点的内容. 避免多次重排 和 重绘, 把内容放入到文档片段(内存中)
  // 在内存里将 html节点中的{{}}  属性指令 替换完毕后, 一次性插入到跟节点中.
  // 把节点移动到内存中
  node2Fragment(node) {
    let frag = document.createDocumentFragment()
    let childNode

    // 循环 el的 childNodes 从界面移动到 frag, 
    while (childNode = node.firstChild) {
      frag.appendChild(childNode)
    }

    return frag
  }

  // 解析{{}}  指令 替换
}

class Vue {
  // Vue 实例对象有  this.$el  this.$data等. this.$options
  constructor(options) {
    this.$el = options.el
    this.$data = options.data

    // 存在根节点 -> 开始解析HTML模板
    if (this.$el) {
      // 根节点, vue实例
      new Compiler(this.$el, this)

      console.log(this)
    }
  }
}