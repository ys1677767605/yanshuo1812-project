const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
//npm i html-webpack-plugin -D
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./src/main.js',
    output:{
        path:path.resolve('dist'),
        filename:'bundle.js'

    },
    module:{
      rules:[
          {
              test:/\.css$/,
              use:[
                  'style-loader',
                  'css-loader'
              ]
          },
          {
            test:/\.less$/,
            use:[
                'style-loader',
                'css-loader',
                'less-loader'
            ]
        },
        //sass-loader
        {
            test:/\.less$/,
            use:[
                'style-loader',
                'css-loader',
                'less-loader'
            ]
        },
        {
            test:/\.vue$/,
            use:'vue-loader'
        },
        {//npm i file-loader url-loader -D
         //加载图片   
            test:/\.(jp|jpe|pn)g$/,
            use:'file-loader'
        },
        {
         //加载图标   
         test:/\.(eot|svg|ttf|woff|woff2)/,
         use:'url-loader'
     },
     {
         test:/\.js$/,
         use:{
             loader:'babel-loader',
             options:{
                 presets:['@babel/preset-env']
             }
         }
     }
      ]
    },
    plugins:[
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({//可自动使index.html加载bundle.js
          template:path.resolve('index.html')//index.html文件中不需要再引入bundle.js
      })                                     //提供模版
    ],
    mode:"development",
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
    devServer:{//开发服务器
        proxy:{},//跨域代理
        contentBase:path.resolve('dist'),//html文件在哪里加载 绝对路径
        port:8082,
        compress:true,//压缩文件功能，可让加载速度快一些
        open:true//自动打开浏览器
    }
}



