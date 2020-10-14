const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin') // 打包进度条

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: '[name].js',
        publicPath: '/develop/'
    },

    devServer: {
		contentBase: __dirname + "/develop/",
		host: "localhost",
		port: 8044,
		historyApiFallback: false,
		inline: true,
		hot: true,
		hotOnly: true,
		progress: true,
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:8099',
				changeOrigin: true,
				pathRewrite: {
					'^/api/': ''
				}
			}
		}
	},
    plugins: [
        new SimpleProgressWebpackPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                ant: {
                    chunks: "initial",
                    test: /ant\-design\-vue/,
                    name: 'bundle_ant',
                    priority: 2,
                    minSize: 30000,
                    minChunks: 1,
                    enforce: true,
                    reuseExistingChunk: true // 可设置是否重用该chunk
                },
                bundle: {
                    chunks: "initial",
                    name: 'common',
                    priority: 1,
                    minSize: 30000,
                    minChunks: 1,
                    enforce: true,
                    reuseExistingChunk: true // 可设置是否重用该chunk
                },
                async: {
                    chunks: "async",
                    name: 'async_views',
                    priority: 0,
                    minSize: 30000,
                    minChunks: 1,
                    enforce: true,
                    maxAsyncRequests: 5, // 最大异步请求数， 默认1
                    maxInitialRequests: 3, // 最大初始化请求书，默认1
                    reuseExistingChunk: true // 可设置是否重用该chunk
                },
            }
        }
    }
})

