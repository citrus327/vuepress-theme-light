---
title: 控制滚动条滚动scrollTo方法的使用
tags:
  - Web
date: 2018-10-31 17:20:18
---

>在工作中碰到控制滚动条滚动的需求，原有代码使用scrollTo进行滚动，
在现代浏览器上都可以正常运行，但是到了IE11上却不行了，于是对scrollTo做了一层小小的封装。
于是在这里分享一下...

## window.scrollTo

关于在document上滚动的问题，直接可以使用window.scrollTo方法，用法如下：

{% blockquote @MDN https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo %}
{% codeblock window.scrollTo lang:javascript%}
  var x = 0, y = 100
  window.scrollTo(x, y)
{% endcodeblock%}
{% endblockquote %}

在mdn上说明了，如果想对elements进行滚动条操作，可以使用element.scrollTop和scrollLeft。
在这里要补充说明一下element.scrollTo方法

## element.scrollTo

element.scrollTo方法也是无意间发现，mdn和caniuse上是没有对该方法进行说明的。
该方法入参与window上的scrollTo一致，用法如下：

{% codeblock element.scrollTo lang:javascript%}
  var $el = document.querySelector('#container')
  var x = 0, y = 100
  $el.scrollTo(x, y)
{% endcodeblock%}

## 兼容性问题

window.scrollTo的兼容性如下
{% img /images/mdn-scroll-to.png 100% %}

window.scrollTo看上去十分理想，但是element.scrollTo就没那么理想化了。
经过几个主流浏览器的测试之后，发现IE 11下的element.scrollTo为undefined。

这里我简单封装了一下scrollTo，做了一个小小的polyfill。代码如下：

{% codeblock lang:javascript %}
/**
 * polyfill for scrollTo on element
 * @param {HtmlElement} el
 * @param {number} x
 * @param {number} y
 */
scrollTo: function (el, x, y) {
  if (!el) {
    return
  }

  if (el.scrollTo) {
    el.scrollTo(x, y)
  } else {
    el.scrollLeft = x
    el.scrollTop = y
  }
}
{% endcodeblock %}

这里也简单说明下scrollLeft和scrollTop做滚动条操作的用法
如果滚动条在容器最底部，假设$el为容器

{% codeblock 判断滚动条是否在最底部 lang:javascript %}
  $el.clientHeight + $el.scrollTop === $el.scrollHeight // true
{% endcodeblock %}

scrollTop可以理解为滚动条距离容器顶部的距离，当然其实这里有很大的坑。
具体可以看mdn的scrollTop描述。

那scrollLeft就是滚动条距离容器左侧的距离了。

那其实scrollLeft = 0就等价于滚动条在最左边，scrollTop = 0就等价于滚动条在最顶层。
scrollLeft就是原有api参数中的x，scrollTop就是原有api参数中的y。

## Reference
https://www.w3.org/TR/cssom-view-1/#extension-to-the-element-interface
https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop
https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft


## Updates
https://github.com/Fyrd/caniuse/issues/4251
这位小哥测试了Chrome, Chrome66支持element.scrollTo, Chrome48不支持