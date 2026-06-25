const path = require('path');
const webpack = require('webpack');

const MODULE_RULES = [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
    },
];

const COMMON_CONFIG = {
    mode: 'production',
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
    resolve: {
        extensions: ['.js'],
    },
    node: {
        fs: 'empty',
    },
};

let WebpackConfig;
if (process.env.ENV !== 'test') {
    WebpackConfig = [
        {
            ...COMMON_CONFIG,
            entry: { popup: ['./scripts/popup.js'] },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
                }),
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                }),
            ],
            devServer: {
                hostname: 'localhost',
                port: '5000',
                inline: true,
            },
        },
        {
            ...COMMON_CONFIG,
            entry: { background: ['./scripts/background.js'] },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
                }),
            ],
            resolve: {
                extensions: ['.js'],
                alias: {
                    'epub-press-js': path.resolve(__dirname, '../epub-press-js/build/index.js'),
                },
            },
        },
    ];
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
