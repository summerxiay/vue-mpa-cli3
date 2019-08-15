const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");
const projectName = require('./config/project');
const isWeb = projectName.name === 'web';
const isProduction = process.env.NODE_ENV === 'production';

function resolve(dir) {
    return path.join(__dirname, dir)
}

const conf = require('./config/projectConfig.js');

let projectPages = isWeb ? conf.pagesWeb : conf.pagesH5;

const externals = {
    vue: 'Vue',
    vuex: 'Vuex',
    axios: 'axios',
    fastclick: 'FastClick',
    jquery: 'jQuery',
    'vue-router': 'VueRouter',
    'vue-awesome-swiper': 'VueAwesomeSwiper',
    'vue-lazyload': 'VueLazyload',
    'crypto-js': 'CryptoJS',
    imagesloaded: 'imagesLoaded'
}

const cssCdn = [
        // iconfont css
        '//at.alicdn.com/t/font_1166978_n8fporsn8x.css'
    ],
    h5CssCdn = [
        // swiper4 css
        '//cdn.staticfile.org/Swiper/4.5.0/css/swiper.min.css'
    ],
    jsCdn = [
        // vue
        '//cdn.staticfile.org/vue/2.6.10/vue.min.js',
        // vuex
        // '//cdn.staticfile.org/vuex/3.1.1/vuex.min.js',
        // axios
        '//cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
        // vue-router
        '//cdn.staticfile.org/vue-router/3.0.6/vue-router.min.js',
        // jquery js
        '//cdn.staticfile.org/jquery/3.4.1/jquery.min.js',
        // vue-lazyload js
        '//cdn.staticfile.org/vue-lazyload/1.2.6/vue-lazyload.js',
        // cryptojs加密集
        '//cdn.staticfile.org/crypto-js/3.1.9-1/crypto-js.min.js',
        // imagesloaded
        '//unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js'
    ],
    webJsCdn = [
        // vuex
        '//cdn.staticfile.org/vuex/3.1.1/vuex.min.js',
        // fontfaceonload
        '//zz-imgs.oss-cn-hangzhou.aliyuncs.com/model/cdn/fontfaceonload.js',
    ],
    h5JsCdn = [
        // fastclick
        '//cdn.staticfile.org/fastclick/1.0.6/fastclick.min.js',
        // swiper4 js
        '//cdn.staticfile.org/Swiper/4.5.0/js/swiper.min.js',
        // vue-awesome-swiper js
        '//cdn.jsdelivr.net/npm/vue-awesome-swiper@3.1.2/dist/vue-awesome-swiper.js'
    ];

if (!isWeb) {
    cssCdn.push(...h5CssCdn);
    jsCdn.push(...h5JsCdn);
} else {
    jsCdn.push(...webJsCdn);
}

const cdn = {
    dev: {
        css: cssCdn,
        js: webJsCdn
    },
    build: {
        css: cssCdn,
        js: jsCdn
    }
}
Object.keys(projectPages).forEach(key => projectPages[key].cdn = isProduction ? cdn.build : cdn.dev); // 挂上cdn参数

module.exports = {
    pages: projectPages,
    assetsDir: isWeb ? 'static_web' : 'static_h5', // 打包的静态资源放在static目录
    publicPath: isProduction ? isWeb ? 'https://static.xxx.com' : 'https://static.xxx.com' : '/', // 生产环境的静态资源上传到静态服务器，然后引用cdn，减少页面压力
    runtimeCompiler: false, // 是否使用运行时vue构建版本
    parallel: require('os').cpus().length > 1, // babel或typescript开启多核利用
    productionSourceMap: false, // 生产环境关闭sourcemap
    lintOnSave: !isProduction,
    transpileDependencies: ['vue-clamp', 'resize-detector'], // 需要babel转义的依赖
    configureWebpack: config => {
        const myConfig = {}
        if (isProduction) {
            myConfig.externals = externals;
        }
        myConfig.plugins = [];
        myConfig.plugins.push(
            new CompressionPlugin({
                test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            })
        )
        return myConfig;
    },
    // 允许对内部的 webpack 配置进行更细粒度的修改
    chainWebpack: config => {
        // 分析打包文件
        if (!isProduction) {
            const webpack = require('webpack');

            /* const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
            config.plugin().use(new BundleAnalyzerPlugin()) */

            config.resolve.alias.set('jquery', 'jquery')
            config.plugin('provide')
                .use(webpack.ProvidePlugin, [{
                    $: 'jquery',
                    jquery: 'jquery',
                    jQuery: 'jquery',
                    'window.jQuery': 'jquery'
                }])
        }
        // 路径重命名 
        config.resolve.alias
            .set('API', resolve('src/api/'))
            .set('ASSETS', resolve('src/assets'))
            .set('@', resolve('src/components'))
            .set('CONFIG', resolve('config'))
            .set('VIEWS', resolve('src/views'))
            .set('H5', resolve('src/views/h5/components'))
            .set('WEB', resolve('src/views/web/components'))
    },
    css: {
        modules: false, // css module
        extract: true, // 使用css分离插件
        sourceMap: false
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/assets/css/colors.less')
            ]
        },

    },
    devServer: { //跨域
        host: '0.0.0.0',
        port: 8081, // 端口号
        open: true, //配置自动启动浏览器
        hot: true,
        disableHostCheck: true,
        proxy: { // 配置跨域处理 可以设置多个
            // 开发环境
            '/api': {
                target: 'https://api.xxx.com',
                https: true,
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true
            },
            // mock地址
            '/yapi': {
                target: 'https://yapi.xxx.com/mock/11',
                https: true,
                pathRewrite: {
                    '^/yapi': ''
                },
                changeOrigin: true
            }
        }
    }
}