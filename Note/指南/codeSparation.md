代码分离
====================

代码分离是 ``webpack` 中最引人注目的特性之一。此特性能够把代码分离到不同的 `bundle` 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 `bundle`，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

有三种常用的代码分离方法：

入口起点：使用 `entry` 配置手动地分离代码。  
防止重复：使用 `CommonsChunkPlugin` 去重和分离 `chunk`。  
动态导入：通过模块的内联函数调用来分离代码。

入口起点(`entry points`)
---------------------------

这是迄今为止最简单、最直观的分离代码的方式。不过，这种方式手动配置较多，并有一些陷阱，我们将会解决这些问题

`webpack.config.js`

```javascript
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another-module.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
        title: 'Code Splitting'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
```

正如前面提到的，这种方法存在一些问题:

如果入口 `chunks` 之间包含重复的模块，那些重复模块都会被引入到各个 `bundle` 中。
这种方法不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码。
以上两点中，第一点对我们的示例来说无疑是个问题，因为之前我们在 `./src/index.js` 中也引入过 `lodash`，这样就在两个 `bundle` 中造成重复引用。接着，我们通过使用 `CommonsChunkPlugin` 来移除重复的模块。

防止重复(`prevent duplication`)
-------------------------------

貌似 `CommonsChunkPlugin` 不再按官方文档那样用了，不做详细

动态导入(`dynamic imports`)
----------------------------

涉及到动态代码拆分时，`webpack` 提供了两个类似的技术。对于动态导入，第一种，也是优先选择的方式是，使用符合 `ECMAScript` 提案 的 `import()` 语法。第二种，则是使用 `webpack` 特定的 `require.ensure`。让我们先尝试使用第一种……

webpack.config.js

```javascript
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Code Splitting'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
```