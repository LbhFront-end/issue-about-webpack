管理资源
========================

加载 `CSS`
--------------

>npm install --save-dev style-loader css-loader

在依赖样式文件中导入样式 `import './xx.css'`。当该模块运行时候，含有 `css` 字符串的 `<style>` 标签，将被插入到 `html` 文件的 `<head>` 中

加载图片
---------------------

>npm install --save-dev file-loader

现在，当你 `import MyImage from './my-image.png'`，该图像将被处理并添加到 `output` 目录，`MyImage` 变量将包含该图像在处理后的最终 `url`。当使用 `css-loader` 时，如上所示，你的 CSS 中的 `url('./my-image.png')` 会使用类似的过程去处理。`loader` 会识别这是一个本地文件，并将 `'./my-image.png'` 路径，替换为输出目录中图像的最终路径。`html-loader` 以相同的方式处理 \<img src="./my-image.png" />。

加载字体
---------------------

通过配置好 `loader` 并讲字体文件放在合适的位置，可以通过 `@font-face` 声明引入，本地的 `url(..)` 指令会被 `webpack` 获取处理，就像它处理图片资源一样

     @font-face {
       font-family: 'MyFont';
       src:  url('./my-font.woff2') format('woff2'),
             url('./my-font.woff') format('woff');
       font-weight: 600;
       font-style: normal;
     }

加载数据
---------------------

>npm install --save-dev csv-loader xml-loader

你可以 `import` 这四种类型的数据(`JSON`, `CSV`, `TSV`, `XML`)中的任何一种，所导入的 `Data` 变量将包含可直接使用的已解析 `JSON`：

`webpack.config.js`

    const path = require('path');
    module.exports = {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },{
                test:/\.(csv|tsv)$/,
                use:['csv-loader']
            },{
                test:/\.xml$/,
                use:['xml-loader']
            }]
        }
    }