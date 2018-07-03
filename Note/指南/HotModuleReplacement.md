模块热替换
================

出现问题：按照文档配没法模块热更替，而是热刷新，暂时没有解决方法，标记先

启动HMR的方法
-----------------

`webpack.config.js`

    const webpack = require('webpack);
    module.exports = {
        entry:{
            app:'./src/index.js'
        },
        devServer:{
            hot:true
        },
        plugins:[
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ]
    }

`NamedModulesPlugin` 以便于更容易查看要修补的 `patch` 依赖

`index.js`

    if(mudule.hot){
        module.hot.accept('./print.js',function(){
            ...
        });
    }

`通过 Node.js API`
想要启动 `HMR`,还需要修改 `webpack` 的配置对象，使其包含 `HMR` 入口起点， `webpack-dev-server` `package` 中具有一个叫做 `addDevServerEntrypoints` 的方法，可以通过这个方法来实现

`dev-server.js`

    const webpackDevServer = require('webpack-dev-server');
    const webpack = require('webpack');

    const config = require('./webpack.config.js');
    const options = {
        contentBase: './dist',
        hot: true,
        host: 'localhost'
    };

    webpackDevServer.addDevServerEntrypoints(config, options);
    const compiler = webpack(config);
    const server = new webpackDevServer(compiler, options);

    server.listen(5000, 'localhost', () => {
        console.log('dev server listening on port 5000');
    });

`HMR` 修改样式表  
借助于 `style-loader` 的帮助，`CSS` 模块热替换是非常简单的，当更新其依赖模块时，此 `loadder` 在后台使用 `module.hot.accept` 来修补 （`patch`） \<style> 标签

>npm install --save-dev style-loader css-loader

`webpack.config.js`

    module.exports = {
        module:{
            rules:[
                {
                    test:/.\css$/,
                    use:['style-loader','css-loader']
                }
            ]
        }
    }