var path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')

const indextInput = './src/pages/index.html';
const indexOutput = './build/index.html';

const webpackInitConfig = {
    mode: 'development',
    resolve: {
        extensions: ['.js']
    },
    entry: {
        app: ['@babel/polyfill', './src/js/index.js'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[chunkhash][name].js'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            },
            {
                test: /\.css/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // outputPath: 'images/',
                            // publicPath: 'images/',
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: indexOutput,
            template: indextInput,
        })
    ]
};

module.exports = webpackInitConfig