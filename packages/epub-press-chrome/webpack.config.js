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
    const popupConfig = {
        mode: 'production',
        entry: './scripts/popup.js',
        output: {
            filename: 'popup.js',
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

    const backgroundConfig = {
        mode: 'production',
        entry: './scripts/background.js',
        output: {
            filename: 'background.js',
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
        ],
        resolve: {
            extensions: ['.js'],
        },
        target: 'webworker',
        node: {
            fs: 'empty',
        },
    };

    WebpackConfig = [popupConfig, backgroundConfig];
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
