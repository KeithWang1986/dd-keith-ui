const resolveApp = require('./common');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
    devtool: 'cheap-module-source-map',
    entry: {
        "index": resolveApp("public/src/index.jsx")
    },
    output: {
        path: resolveApp('public/dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    /public\\src/
                ],
                //include: module_list,
                //exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true //css压缩
                            }
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true //css压缩
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                minimize: true //css压缩
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new webpack.DllReferencePlugin({
            manifest: path.join(resolveApp('public/dll'),'vendor-manifest.json') // 指定manifest.json，也就是上面生成的。
        })
    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    }
};

module.exports = config;