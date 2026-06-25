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
if (process.env.ENV !== 'test') {
    WebpackConfig = {
        mode: 'production',
        entry: {
            popup: ['./scripts/popup.js'],
            background: ['./scripts/background.js'],
        },
        output: {
            filename: '[name].js',
            path: path.join(__dirname, 'app', 'build'),
        },
        optimization: {
            minimize: false,
        },
        module: {
            rules: MODULE_RULES,
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
            }),
        ],
        resolve: {
            extensions: ['.js'],
            alias: {
                // Compile epub-press-js from source instead of its prebuilt UMD
                // bundle, which inlines file-saver and crashes a MV3 service
                // worker (file-saver touches `document` at import time).
                'epub-press-js$': path.join(__dirname, '../epub-press-js/epub-press.js'),
                // The extension downloads via chrome.downloads, never file-saver.
                'file-saver': path.join(__dirname, 'scripts/file-saver-stub.js'),
            },
        },
        devServer: {
            hostname: 'localhost',
            port: '5000',
            inline: true,
        },
        node: {
            fs: 'empty',
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
                'process.env.ENV': JSON.stringify(process.env.NODE_ENV || 'test'),
            }),
        ],
        resolve: {
            extensions: ['.js'],
        },
        devServer: {
            port: '5001',
            inline: true,
        },
        node: {
            fs: 'empty',
        },
    };
}

module.exports = WebpackConfig;
