`Webpack` 学习指南
===================

安装
---------------

要安装最新版本或特定版本，请运行以下命令之一：

>npm install --save-dev webpack  
>npm install --save-dev webpack@\<version>

如果你使用 webpack 4+ 版本，你还需要安装 CLI。

>npm install --save-dev webpack-cli

对于大多数项目，我们建议本地安装。这可以使我们在引入破坏式变更(breaking change)的依赖时，更容易分别升级项目。通常，`webpack` 通过运行一个或多个 `npm scripts`，会在本地 `node_modules` 目录中查找安装的 `webpack`：

    "scripts": {
        "start": "webpack --config webpack.config.js"
    }

起步
-----------

创建一个目录 `Demo`  
>mkdir Demo && cd Demo  
npm init -y  
npm install webpack webpack-cli --save-dev

`package.json`

    {
        "name": "",
        "version": "",
        "private": true,
        "devDependencies": {
            "webpack": "^4.13.0",
            "webpack-cli": "^3.0.8"
    },
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": "webpack"
    },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "dependencies": {}
    }

安装 `lodash`
-----------------

>cnpm install --save lodash

`src/index.js`

    import _ from 'lodash';
    function component() {
        var element = document.createElement('div');
        element.innerHTML = _.join(['Hello', 'webpack'], ' ');

        return element;
    }

    document.body.appendChild(component());

`dist/index.html`

    <!doctype html>
    <html>
    <head>
        <title>起步</title>
    </head>
    <body>
           <script src="main.js"></script>
    </body>
    </html>

执行 `npx webpack`，会将我们的脚本作为入口起点，然后 输出 为 `main.js`

模块
------------------------

`webpack` 支持 `ES6` 中的 `import` 和 `export` 语句，它会在幕后进行代码'转译'

使用一个配置文件
-----------------------

文件夹根上添加一个文件 `webpack.config.js`

    const path = require('path');
    module.exports = {
        entry:'./src/index.js',
        output:{
            filename:'bundle.js',
            path:path.resolve(__dirname,'dist')
        }
    }

解释：  

1. `exports` 和 `module.exports` 的区别

`module.exports` 初始值为一个空对象 `{}`  
`exports` 是指向的 `module.exports` 的引用  
`require()` 返回的是 `module.exports` 而不是 `exports`

2. `path.resolve()`

这一方法将一系列路径或者路径段解析为 **绝对路径**  
语法：

>path.resolve([from,...],to)  

说明：将参数 `to` 位置的字符解析到了一个 **绝对路径里**  
参数说明  
`from` 源路径  
`to` 将被解析到绝对路径的字符串

3. `__dirname` 与 `__filename`

`__filename`  
在 `node.js` 中，任何模块文件内部，可以使用 `__filename` 变量获取当前模块文件的带有完整绝对路径的文件名

`__dirname` 可以获得当前文件所在目录的完整目录名

`NPM` 脚本
--------------------------

用 `CLI` 这种方式来运行本地的 `webpack` 不是特别方便，我们可以设置一个快捷方式。在 `package.json` 添加一个 `npm` 脚本(npm script)：

`package.json`

    {
        "name": "webpack-demo",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": "webpack"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "devDependencies": {
            "webpack": "^4.0.1",
            "webpack-cli": "^2.0.9",
            "lodash": "^4.17.5"
        }
    }

现在，可以使用 `npm run build` 命令，来替代我们之前使用的 `npx` 命令。注意，使用 `npm` 的 `scripts`，我们可以像使用 `npx` 那样通过模块名引用本地安装的 `npm`` 包。这是大多数基于 npm 的项目遵循的标准，因为它允许所有贡献者使用同一组通用脚本（如果必要，每个 flag 都带有 --config 标志）。