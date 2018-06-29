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

    -   // Lodash, currently included via a script, is required for this line to work
    +   // Lodash, now imported by this script
        element.innerHTML = _.join(['Hello', 'webpack'], ' ');

        return element;
    }

    document.body.appendChild(component());