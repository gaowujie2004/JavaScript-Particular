# 存储异常（storage error）

在浏览器端存/取数据，可能会引发 Error，具体是以下操作：

1. 浏览器设置禁用 cookie
   document.cookie setter 和 getter 不会报错，但不会有任何存储效果，getter 得到的是空字符串

# cookie 禁用后的具体表现

1. document.cookie setter/getter 没问题，getter 返回空字符串
2. localStorage sessionStorage
   chrome 浏览器中，window.localStorage window.sessionStorage 访问触发 Error
   以下是具体的 Error:
   ```js
   Uncaught DOMException: Failed to read the 'sessionStorage' property from 'Window': Access is denied for this document. at <anonymous>:1:1
   ```
3. cookieStore
   cookieStore.set(); 返回失败的 Promise
   cookieStore.get(); 返回成功的 Promise，值为 null
