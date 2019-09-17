---
title: 如何搭建一个Typescript + Express的简易Nodejs环境
tags:
  - Node.js
  - TypeScript
date: 2019-09-02
---

# 前言

最近在学习Typescript。老婆一直想要一个记账的小系统，
就准备开发一个express的node后端，使用ts去写。
但是除了官方的一些ts+express的整合之外，别的内容并不是很多，且不容易理解。
在这分享一下整个项目搭建的过程

在搭建之前，也是考虑过干脆不用express官方提供的generator-cli，而是自己从零开始搭建。
然后慢慢的添加需要的依赖。

# 初始化

1. 建立一个git仓库，建立nodejs的gitignore文件和readme.md说明文件
2. 使用 `npm init` 命令初始化一个最基本的node项目
3. 因为使用express + Typescript，那么其中最基本的2个依赖就是express和typescript
  命令如下：
  * `npm install express --save`
  * `npm install typescript @types/express @types/node --save-dev`
  别忘记安装@types依赖，同时这些依赖于typescript都属于devDependency
4. 因为使用Typescript, 我们可以使用tslint来lint我们的代码
  命令如下：
  * `npm install tslint --save-dev`
5. 开发nodejs项目，修改代码后需要频繁重启，我们可以使用nodemon来帮助我们重启服务器
  * `npm install nodemon --save-dev`
6. 之后的依赖都是express的常规依赖，我们一并加入
  * `npm install body-parser compression debug dotenv winston --save`

以上几部已经涵盖这个项目基本需要的几个依赖。下一步我们需要对各个依赖做配置。

# 配置

## 配置TypeScript
```Bash
cd ./node_modules/typescript/bin/
tsc --init
```
这会生成一个tsconfig.json，里面含有很多的配置项。
具体内容如下：
```JSON
{
  "compilerOptions": {
    "target": "es6",
    "sourceMap": true,
    "outDir": "./dist",
    "strict": true
  },
  "files": ["./node_modules/@types/node/index.d.ts"],
  "include": ["index.ts", "src/**/*.ts"],
  "exclude": ["node_modules"]
}
```
以上配置修改了
1. outDir: js源码输出路径
2. 开启严格模式
3. include: 需要解析的ts文件
4. exclude: 不需要解析的ts文件


## 配置tslint

```Bash
cd ./node_modules/tslint/bin
tslint --init
```

这会帮助我们生成tslint的配置文件。

在我的项目里，我加入了一部分自己的习惯，仅供参考：
```JSON
{
  "defaultSeverity": "error",
  "extends": [
      "tslint:recommended"
  ],
  "rules": {
    "quotemark": [true, "single", "avoid-escape", "avoid-template"],
    "semicolon": [true, "never"],
    "space-before-function-paren": [true, "always"],
    "no-console": [false],
    "object-literal-sort-keys": false,
    "variable-name": [true, 
      "allow-leading-underscore", 
      "allow-trailing-underscore"]
  }
}
```

## 修改package.json

我们修改package.json一般就是为了添加自定义脚本和修改一些项目的属性。
部分代码如下：

```JSON
{
  "name": "My Project",
  "version": "1.0.0",
  "description": "",
  "main": "index.ts",
  "scripts": {
    "lint": "tslint",
    "dev": "tsc --watch & NODE_ENV=development nodemon dist",
    "build": "tsc"
  }
}
``` 
* dev命令是使用tsc编译并监视ts代码，设置NODE_ENV为development，并且使用Nodemon热启动编译后的文件。
* build命令是只用tsc编译，仅此而已。

## 添加index.ts文件

2019-11-21 未完待续