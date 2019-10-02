const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let entry = {
    app: './src/index.ts',
};
let outputPath = path.resolve(__dirname, './dist');
let devtool = '';
let plugins = [
    new MiniCssExtractPlugin({
        filename: '[name].css',
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    }),
];

if (process.env.TESTBUILD){
    entry = {
        app: './test/index.spec.js'
    };
    outputPath = path.resolve(__dirname, './test-dist');
    devtool = "source-map";

}else{
    plugins.push(
        new HtmlWebpackPlugin({
            filename: "example1.html",
            template: './examples/example1.pug'
        })
    );
}

module.exports = {
    entry: entry,
    output: {
        path: outputPath,
        filename: '[name].bundle.js',
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    devtool: devtool,
    plugins: plugins
};

