// 1. 能够解析 指令 和 {{}}  替换成数据得形式
// 2. 监听数据 -> 数据劫持
// 3. 观察者 (发布订阅者)   - 数据改变我是监听到了. 但是怎么知道哪些节点使用了呢  但是怎么去更新界面呢?
// 4. 数据双向绑定: 视图的变化影响数据 -> 从而再次影响界面(视图).  数据双向绑定就是一个 事件而已. 数据劫持 + 观察者模式是最核心的功能
// 5. v-on methods 对象.

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
  setVal(vm, expr, value) {
    expr.split('.').reduce((obj, key, index, arr) => {
      // 第一次循环: vm.$data -> obj
      if (index === arr.length-1) { //最后一项 school.name 
        obj[key] = value
      } else {
        return obj[key]
      }
      
    }, vm.$data)
  },
  getContentValue(vm, expr) { //expr: {{school.name}} {{bb}}  高武杰
    // 遍历表达式, 将内容   重新替换成一个完整的内容 返回替换好的
    let res = expr.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (...[, $1]) => {
      return this.getVal(vm, $1)
    })
      
    return res
  },
  text(node, expr, vm) { // expr: {{school.name}} {{bb}}  高武杰
    let fun = this.updater['textUpdater']
    let value = expr.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (...[, $1]) => {
      new Watcher(vm, $1, newVal => { //大括号里面的表达式 订阅者依赖data里面的数据
        fun(node, this.getContentValue(vm, expr))
      })
      return this.getVal(vm, $1)
    })
    
    fun(node, value)
  },
  html() {
    // node.innerHTML = xxx
  },
  model(node, expr, vm) {
    // expr: school.name 到 vm.$data 查找
    // 要做: 赋予 input.value 值
    let fun = this.updater['modelUpdater']
    let value = this.getVal(vm, expr)
    
    node.addEventListener('input', e => {
      this.setVal(vm, expr, e.currentTarget.value) 
    })

    // 订阅者 - 依赖收集. 当前节点中的表达式 school.name -> 依赖的是 data的那个属性
    new Watcher(vm, expr, newValue => { // 闭包对象添加到 匿名回调函数的作用域链中第二位  给输入框加一个 订阅者观察者
      // 这个回调函数 是数据变化时getter开始执行
      fun(node, newValue)  // fun函数非常重要, 是改变DOM的
    })
    
    // console.log(value, '-----------> school.name')
    fun(node, value)
  },
  on(node, expr, vm, eventName) {  // expr: v-on:click = change, change=expr
    node.addEventListener(eventName, e => {
      vm[expr](e)
    })
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
        let [, directive] = name.split('-') //['v-model', 'school.name'] OR [ v-on:click ,change ]
        let [directiveName, directiveEvent] = directive.split(':')       //  "on:click" | "model"   'model'.split(':') -> ['model']
        // 需要调用不同得函数处理不同得指令
        // 我拿到 数据对象, 然后又要表达式, 找到值后 再去替换节点中得数据
        CompilerUtils[directiveName](node, expr, this.vm, directiveEvent)
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

// 存放订阅者(watcher). Dep就是watcher 的依赖数据
class Dep {
  constructor() {
    this.subs = [] // 存放订阅者(watcher) - 收集依赖完成 dep 里面的 subs 订阅者(可以更新视图)
  }
  addSub(watcher) {  // 添加儿子 watcher(订阅者)   添加订阅
    this.subs.push( watcher )
  }
  // 为什么不传递 newValue 呢?
  notify() {   // 依赖数据(dep) 发生改变, 遍历对应的订阅者watcher    发布订阅更新
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }
}

// watcher: 收集依赖 订阅者/观察者. -> 依赖是什么?谁是依赖? 表达式{{里面的}}   在data里的数据是依赖 Dep. 节点是订阅者.  
class Watcher {
  /*watch: {
      'school.name': newVal => {
        // 数据变化时, 回调这个函数. 
      }
  }*/
  //          数据  表达式  回调函数
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb

    // 先存放一个老值, 新值和老值不一致才触发回调. 调用 get()
    this.oldValue = this.get()
  }
  get() {
    Dep.target = this // 先添加 watcher . 然后再调用 getter
                                // vm.$data, 'school.name'  一取值 就会调用 getter
    let value =CompilerUtils.getVal(this.vm, this.expr)
    Dep.target = null
    return value
  }
  update() { //数据变化后, 会调用观察者(订阅者)的 update方法
    let newVal = CompilerUtils.getVal(this.vm, this.expr)  ///////   我感觉结果是一样的. 和 this.oldValue
    
    if (newVal === this.oldValue) {
      return
    }
    console.log('=============>>>>watcher', newVal)
    // 不一样.
    this.cb(newVal)
  }
}

// 监听数据改变.  data.school.age = 21 能够监听到. 即数据劫持
class Observer {   // 实现数据劫持功能
  constructor(data) {
    this.observer(data)
  }

  observer(data) {
    if (!data || typeof data!=='object') {
      return
    }
    // 是对象才观察
    Object.keys(data).forEach(key => {
      // 定义反应 定义响应. 当赋值时, 如何响应?
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(data, key, value) {
    this.observer(value)
    // dep 发布者. 里面有与之对应的订阅者
    let dep = new Dep()   // 给data里每个属性 添加一个具有发布订阅的功能. 依赖收集   school.name: [watcher1,watcher2....]

    console.log(dep, '----------------------->')
    // 形成闭包
    Object.defineProperty(data, key, {
      get() {
        // Dep.target -> 在节点解析时.  执行 new Watcher() 时
        if (Dep.target) {
          Dep.target && dep.addSub(Dep.target)
          console.log('获取了 ---------------->', value)
        }
        return value
      },
      set: newVal => {   // newVal = 
        if (value === newVal) { return }
        // 新值 与 老值不相等
        this.observer(newVal)
        value = newVal
        dep.notify()
      }     
    })
  }
}

class Vue {
  // Vue 实例对象有  this.$el  this.$data等. this.$options
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    
    let computed = options.computed
    let methods = options.methods

    // 存在根节点 -> 开始解析HTML模板
    if (this.$el) {
      // 数据劫持 数据赋值监听
      new Observer(this.$data) //观察者
      

      // 计算属性       getVal: reduce  vm.$data
      Object.keys(computed).forEach(key => {
        Object.defineProperty(this.$data, key, {
          get: _ => {
            return computed[key].call(this)
          }
        })
      })

      // 方法
      Object.keys(methods).forEach(key => {
        this.$data[key] = methods[key]
      })

      // vm.$data上的东西, 直接vm.xxx ....... vm.test -> vm.$data.test
      this.proxyVm(this.$data)

      // 根节点, vue实例
      new Compiler(this.$el, this)
    }
  }
  
  proxyVm(data) { // vm.$data
    Object.keys(data).forEach(key => {
      // 不需要递归.
      // vm, this.$data, {}
      // vm.school.age -> vm.school return vm.$data[school] -> vm.school 的返回值 .age
      Object.defineProperty(this, key, {
        get: _ => {
          return data[key]
        },
        set: newVal=>{
          data[key] = newVal
        }
      })
    })
  }
}