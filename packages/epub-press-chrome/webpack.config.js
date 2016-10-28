'use strict';
const path = require('path');
const webpack = require('webpack');

const MODULE_LOADERS = [
    {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader',
    },
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
    },
];

let WebpackConfig;
if (process.env.ENV !== 'test') {
    WebpackConfig = {
        entry: {
            popup: ['whatwg-fetch', './scripts/popup.js'],
            background: ['whatwg-fetch', './scripts/background.js'],
        },
        output: {
            filename: '[name].js',
            path: path.join(__dirname, 'app', 'build'),
        },
        module: {
            loaders: MODULE_LOADERS,
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.ENV': JSON.stringify(process.env.NODE_ENV || 'development')
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
            }),
        ],
        resolve: {
            extensions: ['', '.js'],
        },
        devServer: {
            hostname: 'localhost',
            port: '5000',
            inline: true,
        },
        node: {
            fs: 'empty',
        }
    };
} else {
    WebpackConfig = {
        entry: ['fetch-mock', 'mocha!./tests/index.js'],
        output: {
            filename: 'test.build.js',
            path: path.join(__dirname, 'tests'),
        },
        module: {
            loaders: MODULE_LOADERS,
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.ENV': JSON.stringify(process.env.NODE_ENV || 'test')
            }),
        ],
        resolve: {
            extensions: ['', '.js'],
        },
        devServer: {
            hostname: 'localhost',
            port: '5001',
            inline: true,
        },
        node: {
            fs: 'empty',
        },
    };
}

module.exports = WebpackConfig;
