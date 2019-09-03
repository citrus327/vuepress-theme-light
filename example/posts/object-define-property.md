---
title: Object.defineProperty的一点想法和解读
tags:
  - Web
date: 2018-10-31 17:20:18
---

{% blockquote %}
原来公司使用的要求的es版本太低，导致不能放开手使用高级的特性。
在新单位看到的一个使用Object.defineProperty去实现的常量存储，在这分享一下。

Object.defineProperty是可以对对象本身进行设置的方法。除了常见的对对象进行数据劫持的用法之外，
最基本的四个属性是可以做到保证属性不被任何改动影响的。
{% endblockquote %}

创建一个空的对象。为了保证这个常量对象的纯粹，我们让这个对象的原型为null


``` Javascript
let constant = Object.create(null)
```

为了保证这个常量下的任意Key-value值，在定义完之后，不可变动，我们可以采用Object.defineProperty对其赋值。

```Javascript
Object.defineProperty(constant, "MY_CONSTANT", {
  enumerable: true, // 可以被枚举
  configurable: false, // 不可以删除和设置该属性
  writable: false, // 不可以重写
  value: "MY_CONSTANT_VALUE"
})
```
这里有4个值，
1. enumerable: 是否可以被for...in和Object.keys()枚举。

2. configurable: 是否可以删除该key值，同时控制 "能否再次对该key值进行Object.defineProperty"的能力。

3. writable: 是否可以对该key值对应的value值重新赋值。 

4. value: value值本身

关于enumerbale，{% link mdn https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties%}上有很大篇幅的描述：

所以在对对象constant下的MY_CONSTANT这个属性进行Object.defineProperty之后，任何操作都无法更改该key-value值，启到常量的作用。

这对于一般常量使用来说，可能是一种overkill，但是设计思路值得一看。
   