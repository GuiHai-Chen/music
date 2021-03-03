// import Vue from 'vue'
import Loading from './Loading'

export default {
  // 如果需要将一个组件封装成一个插件，那么需要提供一个install方法，在install方法中注册组件
  install: function (vue, option) {
    // Vue.component(Loading.name, Loading)
    // 创建构造器(这在vue创建组件时说过，是创建组件的方法之一)
    const Profile = vue.extend(Loading)
    // 创建dom元素
    const oDiv = document.createElement('div')
    document.body.appendChild(oDiv)
    // 创建Profile实例，并将构造器的组件挂载到创建的dom 元素上
    const loadingInstance = new Profile()
    loadingInstance.$mount(oDiv)
    // console.log(option.title)
    // 通过构造器的实例对象可以拿到构造器中接收的组件的数据
    // console.log(loadingInstance.title)

    // 把组件中的显示的数据修改为main传过来的数据
    if (option !== null && loadingInstance.title !== null && loadingInstance.title !== undefined) {
      loadingInstance.title = option.title
    }

    // 给vue添加两个全局的方法
    vue.showGlobalMethod = function () {
      loadingInstance.isShow = true
    }
    vue.hiddenGlobalMethod = function () {
      loadingInstance.isShow = false
    }

    // 添加两个局部的方法
    vue.prototype.$showGMethod = function (methodOptions) {
      loadingInstance.isShow = true
    }
    vue.prototype.$hiddenGMethod = function (methodOptions) {
      loadingInstance.isShow = false
    }
  }
}
