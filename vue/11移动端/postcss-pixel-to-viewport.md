 # 雪碧图：由许多小图合并到一张大图，减少http请求
 # 移动端UI库 mint-ui库 vux(适合于微信项目)
移动端处理尺寸 插件 postcss-pixel-to-viewport 自动适配浏览器
# 1.安装 yarn add postcss-pixel-to-viewport
# 2.配置 在.postcssrc.js添加配置
  "viewportWidth":720,          //设计稿的宽度
      "viewportUnit":"vmin",       //预设计算单位
      "propertyBlacklist":[],      //要过滤的黑名单
      "minPixelValue":2,            //要转换的px最小的数值
      "enableConvertComment": 'on',
      "disableConvertComment": 'off',
      "mediaQuery": false
# 3.本项目使用 muse-ui组件库  yarn add muse-ui


