# 全局控制变动

All notable changes to `home-v5-frontend` will be documented in this file

## 2017-4-28
- 修改`element ui`中table标题的背景色改为蓝色，照常引用即可
- 在`src/common/assets/styles/yundun-theme/tools-class.css`中增加五中颜色的小圆点,在`i`标签中直接定义`class`即可

## 2017-5-2
- 修改`element ui`中`el-button--primary`&&`el-button--info`背景色以及hover颜色，照常引用即可

## 2017-5-10
- 在`src/common/assets/styles/color-conf.css`中定义全局颜色，如果多个地方用到同一个颜色，在这个`/color-conf.css`文件中查找，如果没有需要的颜色，可以自己扩展(拓展后群里通知一声)。
- 具体用法请参考：[postcss-inject](https://github.com/iamfrntdv/postcss-inject)

## 2017-5-12
- 在`src/common/assets/styles/yundun-theme/button.css`
定义了四种 button 样式
.el-button  默认的按钮样式
.el-button--primary  背景色为蓝色 文字白色
.el-button--info.is-plain   背景色为透明淡蓝色 文字为黑色
.el-button--text    文本按钮
默认样式 宽度为100px
1~2个字的 小按钮 增加 size="small"
3~7个字的 为默认样式
超过7个字的  增加 size="large"

## 2017-5-24
- 在`src/common/assets/styles/yundun-theme/dialog.css`
- 修改了dialog框的标题的样式和头部增加下划线

## 2017-5-25
- 在`src/common/assets/utils/verify.js`
- 添加全局正则验证规则，待扩展
