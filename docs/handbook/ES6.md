
---
title: 一文明白Proxy 和 Reflect
author: 寒冰
date: '2022-7-17'
---
主要为ES6标准入门的内容归纳。
# Proxy
Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于 种“元编程”（ meta programming ），即对编程语言进行编程。

Proxy 可以理解成在目标对象前架设 个“拦截”层 ，外界对该对象的访问都必须先通过这层拦截，因此提供了 种机制可以对外界的访问进行过滤和改写。 

## 具体用法
ES6原生提供了Proxy构造函数，用于生成Proxy实例，其中target表示要对谁进行拦截代理，也就是代理的拦截的目标，handler参数也是一个对象，定制拦截的行为。
```javascript
var proxy= new Proxy(target, handler) ;
```

下面是一个设置多个拦截代理的例子

```javascript
var handler = {
 get: function(target,name){
	if(name === 'prototype'){
	return Object.prototype;
	}
	return 'Hello,'+name;
},

apply: function(target,thisBinding,args){
	return args[0];
}

construct: function(target,args){
	return {value:args[1]};
}
};

var fproxy = new Proxy(function(x, y) { 
return x + y; 
}, handler) ;//这里代理了一个匿名函数？，Proxy要对实例进行操作才是进行代理，所以对fproxy进行操作就会触发代理

fproxy(1,2);
new fproxy(l , 2) //{value : 2)
fproxy.prototype ===Object . prototype // true
fproxy . foo // ” Hello, foo"
```

## proxy支持的代理操作
对于可以设置但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。

 - get(ta get propKey，「eceiver)
 - set(target, propKey, value, receiver)
 - has(target, propKey)
 拦截 propKey in proxy 的操作，返回 个布尔值。
 - deleteProperty(target, propKey)
 - ownKeys(target)
 拦截 Object getOwnPropertyNarnes(proxy ）、Object.getOwnPropertySyrnbols(proxy ）、 Object.keys(proxy ），返回 个数组。该方法返回目标对象所有自身属性的属性名，而 Object .k eys （）的返回结果仅包括目标对象自身的可遍历属性。
 - getOwnPropertyDescriptor(target, propKey)
 - defineProperty(target, propKey, propDesc)
 - preventExtensions(target)
 - getPrototypeOf(target)
- apply(target, object, args)
拦截 Proxy 实例，并将其作为函数调用的操作 ，比 proxy ( ... args), proxy call(object , ... args )proxy apply ( ...）
- construct( target, args)
拦截 Proxy 实例作为构造函数调用的操作 ，比 new proxy ( . . . args)

可见上述Proxy可代理的操作很多很全面，因此Vue3.0在数据双向处理上也采用了Proxy进行代理，相比Vue2.0采用的Object.defineProperty可以更全面代理对象，实现更好的响应。

利用 set 方法还可以实现数据梆定 即每当对象发生变化时会自动更新 DOM

## proxy的this问题
虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下也无法保证与目标对象的行为 致。主要原因就是在 Proxy 理的情况下，目标对象内部的 this 关键字会指向 Proxy 代理。

```javascript
const target = { 
	m: function () { 
	console . log(this ===proxy); 
	}
}；
const handler= {}; 
const proxy= new Proxy(target , handler) ; 
target.m() //false 
proxy.m () // true
```
代码中，一旦 proxy 代理 target ，后者内部的 this 就指向 proxy ，而不是target


# Reflect
Reflect 对象与 Proxy 对象一样，也是 ES6 为了操作对象而提供的新的 API Reflect 对象的设计目的有以下几个。

 -  Object 对象的 些明显属于语言内部的方法（比如 Object defineProperty)放到 Reflect 对象上。
 - 修改某些 Object 方法的返回结果，让其变得更合理。
 - Object 操作都变成函数行为。
 - Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。
 
## reflect的方法
Reflect 对象 共有 13 个静态方法
• Reflect pl ）仰rget thisArg,args)
• Reflect.construct( target,args) 
• Reflect.get(target,name,receiver) 
• Reflect.set(target,name, value,receiver) 
• Reflect.defineProperty( target,name,desc) 
•Reflect.deleteProperty( target, name) 
•Reflect.has( target,name) 
•Reflect.ownKeys(target) 
• Reflect.isExtensible(target) 
•Reflect. preventExtensions( target) 
•Reflect.getOwnPropertyDescriptor(target, name) 
•Reflect.getPrototypeOf(target) 
•Reflect.setPrototypeOf(target, prototype）

上面这些方法的作用大部分与 Object 对象的同名方法的作用是相同的，而且 Proxy对象的方法是一一对应的。


