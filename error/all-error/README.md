#

window.onerror 冒泡，是监听所有的同域脚本 JSERROR
event 属于 ErrorEvent，该 event 存在具体的错误信息，用于错误信息、错误行号信息

#

window.onerror 捕获，监听所有元素的 onError 事件，
event 属于 Event，该 event 没有错误信息

# 说明

很多 onerror 事件是不冒泡的，比如 img.onerror script.onerror 等资源标签。
