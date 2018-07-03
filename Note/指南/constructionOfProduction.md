生成环境构建
===================

配置
--------------------

开发环境 `development` 和生产环境 `production`的构建目标差异很大，在开发环境中，我们需要强大的，具有实时重新加载 `live reloading` 或者热模块替换 `hot module replacement` 能力的 `source map` 和 `localhost server`  
生产环境中，我们的目标则转向于关注更小的 `bundle`,更轻量的 `source map`，已经更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 `webpack` 配置

虽然，我们将生产环境与开发环境做了略微区分，但我们还是会遵循*不重复原则*，保留一个*通用*配置.为了将这些配置合并在一起，利用 `webpack-merge` 工具。将代码分离

>npm install --save-dev webpack-merge

`project`

    webpack-demo
    |- package.json
    - |- webpack.config.js
    + |- webpack.common.js
    + |- webpack.dev.js
    + |- webpack.prod.js
    |- /dist
    |- /src
        |- index.js
        |- math.js
    |- /node_modules

`webpack.common.js`

    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    module.exports = {
        // entry: './src/index.js',
        entry: {
            app: './src/index.js'
            // print:'./src/print.js'
        },
        output: {
            // filename: 'bundle.js',
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                title: 'Production'
            })
        ],
        module: {
            rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src'),
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
                exclude: /node_modules/
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
                exclude: /node_modules/
            }, {
                test: /\.(csv|tsv)$/,
                use: ['csv-loader'],
                exclude: /node_modules/
            }, {
                test: /\.xml$/,
                use: ['xml-loader'],
                exclude: /node_modules/
            }]
        }
    }

`webpack.dev.js`

    const merge = require('webpack-merge');
    const common = require('./webpack.common.js');
    const webpack = require('webpack');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');

    module.exports = merge(common, {
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist',
            hot: true,
            compress: true
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ],
    })

`webpack.prod.js`

    const merge = require('webpack-merge');
    const webpack = require('webpack');
    const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
    const common = require('./webpack.common.js');

    module.exports = merge(common, {
        devtool: 'source-map',
        plugins: [
            new UglifyJSPlugin({
                sourceMap: true
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]
    });

`webpack.common.js` 中，我们设置了 `entry` 和 `output` 配置，并且在其中引入这两个环境公用的全部插件。  
`webpack.dev.js` 中，我们为此环境添加了推荐的 `devtool`（强大的 `source map`）和简单的 `devServer` 配置。  
`webpack.prod.js` 中，我们引入了之前在 `tree shaking` 指南中介绍过的 `UglifyJSPlugin`。

`Npm Script`
--------------------

现在将 `scripts` 重新指向到新的配置，将 `npm start` 定义为开发环境脚本，并在其中使用 `webpack-dev-server` ,将 `npm run build` 定位为生成环境脚本

`package.json`

    {
        "scripts": {
    -     "start": "webpack-dev-server --open",
    +     "start": "webpack-dev-server --open --config webpack.dev.js",
    -     "build": "webpack"
    +     "build": "webpack --config webpack.prod.js"
        },
    }

`source map`
--------------------

虽然鼓励在生产环境中启用 `source map`，因为它们对于调试源码和运行基准测试很有帮助。然而还是应该针对生成环境用途，选择一个构建快速的推荐配置。

`webpack.prod.js`

    const merge = require('webpack-merge');
    const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
    const common = require('./webpack.common.js');
    module.exports = merge(common, {
    +   devtool: 'source-map',
        plugins: [
    -     new UglifyJSPlugin()
    +     new UglifyJSPlugin({
    +       sourceMap: true
    +     })
        ]
    });

>免在生产中使用 `inline-***` 和 `eval-***`，因为它们可以增加 `bundle` 大小，并降低整体性能。

指定环境
------------------

许多 `library` 将通过与 `process.env.NODE_ENV` 环境变量关联，以决定 `library` 中应该引用哪些内容。例如，当不处于生产环境中时，某些 `library` 为了使调试变得容易，可能会添加额外的日志记录(`log`)和测试(`test`)。其实，当使用 `process.env.NODE_ENV === 'production'` 时，一些 `library` 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。我们可以使用 `webpack` 内置的 `DefinePlugin` 为所有的依赖定义这个变量：

`webpack.prod.js`

    + const webpack = require('webpack');
    const merge = require('webpack-merge');
    const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
    const common = require('./webpack.common.js');

    module.exports = merge(common, {
        devtool: 'source-map',
        plugins: [
        new UglifyJSPlugin({
            sourceMap: true
    -     })
    +     }),
    +     new webpack.DefinePlugin({
    +       'process.env.NODE_ENV': JSON.stringify('production')
    +     })
        ]
    });

>技术上讲，NODE_ENV 是一个由 Node.js 暴露给执行脚本的系统环境变量。通常用于决定在开发环境与生产环境(dev-vs-prod)下，服务器工具、构建脚本和客户端 library 的行为。然而，与预期不同的是，无法在构建脚本 webpack.config.js 中，将 process.env.NODE_ENV 设置为 "production"，请查看 #2537。因此，例如 process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js' 这样的条件语句，在 webpack 配置文件中，无法按照预期运行。

`Split CSS`
-----------------------

具体看插件管理