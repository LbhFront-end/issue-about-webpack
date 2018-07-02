开发
=========================

使用 `source map`
------------------

为了更容易地追踪警告和错误， `JavaScript` 提供了 `source map` 功能，将编译后的代码映射回原始源代码，可以明确地告诉报错的地方在哪里  
仅解释说明，不要拥戴生产环境，下例使用 `inline-source-map`,配置如下

`webpack.config.js`

    module.export = {
        devtool:'inline-source-map'
    }

选择一个开发工具
----------------------

每次编译代码的时候，手动运行 `npm run build` 会耗时耗力  
`webpack` 中有几个不同的选项，可以帮助我们在代码发生变化的时自动编译代码  
`webpack's Watch Mode`  
`webpack-dev-server`  
`webpack-dev-middleware`

使用观察模式
----------------------

如果一个文件被更新，代码将重新编译，但是缺点是不会自动刷新浏览器
`package.json`

    "scripts": {
        "watch": "webpack --watch"
    },

使用 `webpack-dev-server`
-------------------------

`webpack-dev-server` 提供了简单的 `web` 服务器，并且能够实时重新加载 `live reloading`,安装如下  
>npm install --save-dev webpack-dev-server

修改配置文件，告诉开发服务器（`dev server`）去哪里查找文件  
`webpack.config.js`

    module.export = {
        devServer:{
            contentBase:'./dist'
        }
    }
以上配置告知了 `webpack-dev-server` 在 `localhost:8080` 下建立服务，将 `dist` 目录下的文件，作为可访问的文件  
添加一个 `script` 脚本，可以直接运行开发服务器（`dev server`）
`package.json`

    "scripts": {
        "start": "webpack-dev-server --open"
    },

现在我们可以在命令行 `npm start` 就会看到浏览器自动加载页面，如果现在修改加载任意源文件， `web` 服务器就会自动重新加载编译后的代码

使用 `webpack-dev-middleware`
------------------------------

`webpack-dev-middleware` 是一个容器（`wrapper`） ,它可以把 `webpack` 处理后的文件传递给一个服务器 (`server`),可以配合`express server` 使用
>npm install --save-dev express webpack-dev-middleware

对 `webpack.config.js` 配置文件进行调整确保中间件 `middleware` 功能能够正常启用

`webpack.config.js`

    module.exports = {
        output:{
            publicPath:'/'
        }
    }

`publicPath` 也会在服务器脚本用到，以确保文件资源能在 `http://localhost:3000` 下正确访问，下面设置自定义 `express` 服务

根目录下增加 `server.js` 文件

    const express = require('express');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');

    const app = express();
    const config = require('./webpack.config.js');
    const compiler = webpack(config);

    // Tell express to use the webpack-dev-middleware and use the webpack.config.js
    // configuration file as a base.
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));

    // Serve the files on port 3000.
        app.listen(3000, function () {
        console.log('Example app listening on port 3000!\n');
    });

再添加一个 `npm script` 以便于我们更好地运行服务

`package.json`  

    {
        "server":"node server.js"
    }

接着打开浏览器，跳转到 `http://localhost:3000` 就应该看到 `webpack` 应用程序在运行了