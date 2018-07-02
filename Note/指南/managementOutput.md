管理输出
==============

在 `index.html` 配置好引入的文件，然后在 `webpack.config.js` 中配置好 `entry` 与 `output` ，进行打包后就可以看到具体的 `js`被分离打包出来了，但问题是现在我们的入口文件时定死的， `html` 的引入也是人为的，那要怎么自动化入口呢，这个时候就要用到 `html-webpack-plugin`

设定 `HtmlWebpackPlugin`
-----------------------

安装插件，调整 `webpack.config.js` 文件
>npm install --save-dev html-webpack-plugin

清理 `/dist` 文件夹
--------------------

在每次构建前清理 `/dist` 文件夹，这样只会生成用到的文件
>npm install clean-webpack-plugin --save-dev

`webpack.config.js`

    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin'); +
    const CleanWebpackPlugin = require('clean-webpack-plugin'); +
    module.exports = {
        // entry: './src/index.js',
      + entry: {
            app:'./src/index.js',
            print:'./src/print.js'
        },
        output: {
            // filename: 'bundle.js',
          + filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
      + plugins:[
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                title:'Output Management'
            })
        ],
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