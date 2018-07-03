`tree shaking`
==================

`tree shaking` 是一个术语，通常用于描述移除 `JavaScript` 上下文中的未引用代码 `dead-code`.它依赖于 `ES2015` 模块系统中的静态结构特性，例如 `import` 或者 `export`。

增加一个模块
----------------

`src/math.js`

    export function square(x){
        return x*x;
    }
    export function cube(x){
        return x*x*x;
    }

`src/index.js`

    import './style.css';
    import { cube } from './main.js'
    function component() {
        var element = document.createElement('pre');
        element.innerHTML = [
            'Hello webpack!',
            '5 cubed is equal to ' + cube(5)
        ].join('\n\n');
        return element;
    }
    document.body.appendChild(component());

上例中没有引入 `square` 但是仍然包含在 `bundle` 中

将文件标记为无副作用[`side-effect-free`]
------------------------------------

在一个纯粹的 `ESM` 模块世界中，识别哪些文件有副作用很贱，然而我们的项目没法达到这种纯度，所以，此时有必要向 `webpack` 的 `compiler` 提供哪些代码是 "纯粹部分"

`package.json`

    {
        "name": "webpack-setting",
        "sideEffects" : false
    }

如果代码都不包含副作用，那么可以简单地将该属性标记为 `false`,来告知 `webpack` 它可以安全地删除未用到的 `export` 导出

>`副作用` 的定义，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 `export` 或多个 `export`

如果代码确实有一些副作用，那么可以使用另外一个数组

`package.json`

    {
        "name": "webpack-setting",
        "sideEffects" : [
            "./src/some-side-effectful-file.js"
        ]
    }

>注意，任何导入的文件都会受到 `tree shaking` 的影响。这意味着，如果在项目中使用类似 `css-loader` 并导入 `CSS` 文件，则需要将其添加到 `side effect` 列表中，以免在生产模式中无意中将它删除：

`package.json`

    {
        "name": "webpack-setting",
        "sideEffects" : [
            "./src/some-side-effectful-file.js",
            "*.css"
        ]
    }

压缩输出
------------------

`webpack.config.js`

    module.exports = {
        mode: "production"
    }