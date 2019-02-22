/*
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [ // 配置规则
            {
                test: /\.css$/,
                use: [ 
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(jp|jpe|pn)g$/,
                use: 'file-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)/,
                use: 'url-loader'
            },
            {
                test: /\.js$/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve('index.html'), //提供模板
            filename: 'index.html'
        })
    ],
    mode: 'development', // 'production'
    resolve: {
        extensions: ['.vue', '.js', '.jsx'], // 自动解析扩展名(懒人配置)
        alias: { // 懒人配置（少些路径）
            'vue': 'vue/dist/vue.esm.js',
            '@': path.resolve('src')
        }
    },
    devServer: { // 开发服务器
        proxy: {}, // 跨域代理
        contentBase: path.resolve('dist'), // html文件在哪里加载 绝对路径
        port: 8081,
        compress: true,
        open: true
    }
}
*/


const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
    //入口，告诉webpack从哪个文件开始编译
    entry:'./src/main.js',
    //出口，告诉webpack编译好的文件放哪
    output:{
        path:path.resolve('dist'),
        filename:'bundle.js'
    },
    //模块处理器（module） 用来处理 非javascript模块
    module:{
        rules:[//配置规则
            //npm i style-loader css-loader -D
          {
              test:/\.css$/,
              use:[
                  'style-loader',//把css字符串动态添加到dom中
                  'css-loader'//解析css文件的
              ]
          },
          {//npm i less less-loader -D
            test:/\.less$/,
            use:[
                'style-loader',//把css字符串动态添加到dom中（容器）
                'css-loader',//解析css文件的
                'less-loader' 
            ]
        },
        {//npm i vue-loader -D
            test:/\.vue$/,
            use:'vue-loader'
        }
        ]
    },
    //webpack的插件（plugins）
    //给webpack扩展功能的
    plugins:[
        new VueLoaderPlugin()
    ],
    
    //webpack的运行模式（mode)
    //1.development 开发模式（不会压缩代码，速度快）
    //2.production 生产模式（会压缩代码，速度非常慢）
    mode:'development',
    resolve:{
        extensions:['.vue','.js','.jsx'],//自动解析扩展名
        alias:{//懒人配置（少些路径）
          'vue':'vue/dist/vue.esm.js',
          //相对路径变成绝对路径
          // eg:./src/App.vue
          // 可改成：@/App.vue
          '@':path.resolve('src') //@代表src目录
        }
    },
    //热更新
    //需下载  npm i -g webpack-dev-server
    //启动 输入：webpack-dev-server
    devServer:{//开发服务器
       contentBase:path.resolve('dist'),//html文件在哪里加载 绝对路径
       port:8081
    }


}











