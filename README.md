# Vue音乐项目
用vue做的一个移动端的音乐小项目
#### 技术栈
Vue2：采用最新Vue2的语法

Vuex：管理公共组件状态量

vue-router：管理单页面应用路由

axios：发起http请求

Sass：css预处理语言

Webpack：自动化构建工具，主要配置vue-cli脚手架提供。

ES6：采用ES6语法。

#### 部署
```
git clone git@github.com:sqaiyan/netmusic-node.git

cd music

npm install 

npm run dev 
```
#### 调试
其中使用到了iScroll,由于iScroll禁止了鼠标的点击行为,所以如果要在真机上运行,需要找到"/src/components/ScrollView.vue",把click属性修改改为true
```
this.iscroll = new IScroll(this.$refs.wrapper, {
      click: false //默认属性为false
    })
```
