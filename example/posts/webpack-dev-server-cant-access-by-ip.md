---
title: webpack-dev-server无法通过IP访问的解决方案
tags:
  - Web
date: 2018-10-31 09:04:12
---

在公司碰到IE下兼容性问题，但是自己用的是MAC系统，没有IE环境，需要借用同事的一台windows环境进行DEBUG。
启动的项目在localhost:8080上，通过ip+端口形式在另一台电脑上无法访问，但是有一个nginx程序跑在8888端口上，
另一台电脑却可以通过ip+端口访问到。

**问题出现原因：webpack-dev-server
  问题解决方式：启动命令行加入 --host 0.0.0.0**