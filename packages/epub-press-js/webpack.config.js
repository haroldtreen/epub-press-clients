'use strict';
const path = require('path');
const webpack = require('webpack');

const MODULE_RULES = [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
    },
];

let WebpackConfig;
if (process.env.NODE_ENV !== 'test') {
    WebpackConfig = {
        mode: 'production',
        entry: ['isomorphic-fetch', './epub-press.js'],
        output: {
            filename: 'index.js',
            path: path.join(__dirname, 'build'),
            library: 'EpubPress',
            libraryTarget: 'umd',
        },
        module: {
            rules: MODULE_RULES,
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            }),
        ],
        resolve: {
            extensions: ['.js'],
        },
        externals: [{
            fs: true,
            'isomorphic-fetch': true,
        }],
        devServer: {
            port: '5000',
            inline: true,
        },
    };
} else {
    WebpackConfig = {
        mode: 'development',
        entry: ['fetch-mock', 'mocha-loader!./tests/index.js'],
        output: {
            filename: 'test.build.js',
            path: path.join(__dirname, 'tests'),
        },
        module: {
            rules: MODULE_RULES,
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'test'),
            }),
        ],
        resolve: {
            extensions: ['.js'],
        },
        externals: [{
            fs: true,
            'isomorphic-fetch': true,
        }],
        devServer: {
            port: '5001',
            inline: true,
        },
    };
}

module.exports = WebpackConfig;
