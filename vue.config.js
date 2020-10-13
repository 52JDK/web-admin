const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        open: true,
        port: 8044,
        disableHostCheck: true,
        /**
         * vue-cli3跨域的全配置！
         */
        proxy: {
            "/api": {
                //你要跨域的域名(包含host、端口号,切记：一定要带上http头);
                //同一个域名只能设置一次跨域，否则重复报错！
                target: "http://malladmin.52jdk.com",
                changeOrigin: true, //是否跨域，设置为true;(必须)
                pathRewrite: {
                    // 这里会把当前域名下路径/api开头的地方替换为http://127.0.0.1:8099/api【这样就可以和服务器nginx保持一致的路径】
                    "^/api": "/", // 设置/api路径重定向为根目录"/api";
                },
            }
        }

    },
    // ...
    configureWebpack: {
        plugins: [
            new CompressionPlugin({
                algorithm: 'gzip', // 使用gzip压缩
                test: /\.js$|\.html$|\.css$/, // 匹配文件名
                filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
                minRatio: 1, // 压缩率小于1才会压缩
                threshold: 10240, // 对超过10k的数据压缩
                deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
            }),
        ],
    }
}





