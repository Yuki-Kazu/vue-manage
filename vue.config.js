const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
});
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
const webpack = require('webpack')
const timeStamp = new Date().getTime();

module.exports = {
    configureWebpack: { // webpack 配置
        output: { // 把应用打包成umd库格式
            library: 'myLibrary', // 输出重构  打包编译后的文件名称  【模块名称.时间戳】
            filename: `[name].${timeStamp}.js`,
            libraryTarget: 'umd',
            globalObject: 'this',
        },
    },
    chainWebpack(config) {
        // 设置 svg-sprite-loader
        // config 为 webpack 配置对象
        // config.module 表示创建一个具名规则，以后用来修改规则
        config.module
            // 规则
            .rule('svg')
            // 忽略
            .exclude.add(resolve('src/icons'))
            // 结束
            .end()
        // config.module 表示创建一个具名规则，以后用来修改规则
        config.module
            // 规则
            .rule('icons')
            // 正则，解析 .svg 格式文件
            .test(/\.svg$/)
            // 解析的文件
            .include.add(resolve('src/icons'))
            // 结束
            .end()
            // 新增了一个解析的loader
            .use('svg-sprite-loader')
            // 具体的loader
            .loader('svg-sprite-loader')
            // loader 的配置
            .options({
                symbolId: 'icon-[name]'
            })
            // 结束
            .end()
        config
            .plugin('ignore')
            .use(
                new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
            )
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    },
    devServer: {
        https: false,
        hot: "only",
        proxy: {
            "/api": {
                target: "http://22d8ee53.r7.cpolar.top",
                changeorigin: true,
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData:
                    `
              @import "@/styles/variables.scss";  // scss文件地址
              @import "@/styles/mixin.scss";     // scss文件地址
            `
            }
        }
    }
};
