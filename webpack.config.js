/* eslint-disable fp/no-mutation */
/* eslint-disable prettier/prettier */
const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const AsyncChunkNames = require('webpack-async-chunk-names-plugin')


module.exports = {
    devtool: 'source-map',
    entry: "./src/index.jsx",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js",
        chunkFilename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.jsx']
      },
      optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
    
                // vendor chunk
                vendor: {
                    // name of the chunk
                    name: 'vendor',
    
                    // async + async chunks
                    chunks: 'all',
    
                    // import file path containing node_modules
                    test: /node_modules/,
    
                    // priority
                    priority: 20
                },
    
                // common chunk
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract(
                {
                    fallback: 'style-loader',
                    use: ['css-loader']
                }
            )
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader'
                }
            ]
        }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            hash: true,
            filename: "index.html",  // target html
            template: "./public/index.html" // source html
        }),
        new ExtractTextPlugin({ filename: 'css/style.css' }),
        
        new AsyncChunkNames()
    ]
}
