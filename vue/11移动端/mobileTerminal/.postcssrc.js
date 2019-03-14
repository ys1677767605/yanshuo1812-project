// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-pixel-to-viewport":{
      "viewportWidth":720,          //设计稿的宽度
      "viewportUnit":"vmin",       //预设计算单位
      "propertyBlacklist":[],      //要过滤的黑名单
      "minPixelValue":2,            //要转换的px最小的数值
      "enableConvertComment": 'on',
      "disableConvertComment": 'off',
      "mediaQuery": false
  }
  }
}
