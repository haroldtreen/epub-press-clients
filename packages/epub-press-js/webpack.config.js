'use strict';
const path = require('path');

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
if (!process.env.TEST) {
    WebpackConfig = {
        devtool: 'inline-source-map',
        entry: ['whatwg-fetch', './epub-press.js'],
        output: {
            filename: 'build.js',
            path: path.join(__dirname, 'build'),
        },
        module: {
            loaders: MODULE_LOADERS,
        },
        resolve: {
            extensions: ['', '.js'],
        },
        devServer: {
            hostname: 'localhost',
            port: '5000',
            inline: true,
        },
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
        resolve: {
            extensions: ['', '.js'],
        },
        devServer: {
            hostname: 'localhost',
            port: '5001',
            inline: true,
        },
    };
}

module.exports = WebpackConfig;
