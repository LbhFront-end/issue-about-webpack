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