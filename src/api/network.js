import axios from 'axios'
import Vue from 'vue'

// 进行一些全局配置
// axios.defaults.baseURL = 'http://127.0.0.1:3000/'
axios.defaults.baseURL = 'http://leedaohuan.cn:3000'
// axios.defaults.baseURL = 'http://192.168.0.105:3000/'
axios.defaults.timeout = 5000
const CancelToken = axios.CancelToken;
//用于记录每次请求的相关信息和取消函数
let cancel=[];
let count = 0
//对重复请求进行取消请求
function cancelDuplicate(config){
  let {url,method,params,data}=config

  // console.log(url, method, params, data);
  cancel.forEach((value,index,arr)=>{
        if(value.url===`${url}&${method}`){
          // return false
          value.cancelRequest()
          arr.splice(index,1)
        }

  })

}
// axios拦截器请求时(用于请求数据时,如果数据没有渲染出来就显示那个转圈圈的插件)
axios.interceptors.request.use(
  config => {
    //取消前一个相同的请求
    cancelDuplicate(config)
    //记录当前的请求
    let cancelToken=new CancelToken(function executor(c) {
      // executor 函数接收一个 cancel 函数作为参数
      //执行cancel函数对发起的请求进行取消
      cancel.push({
        url:`${config.url}&${config.method}`, //拼接请求路径跟请求方式
        cancelRequest:c   //记录对请求进行取消的函数
      })

    })
    count++
    // 这是自己写的那个转圈圈的插件
    Vue.showGlobalMethod()
    return config
  },
  error => {
    Vue.hiddenGlobalMethod()
    return Promise.reject(error)
  }
)
// axios拦截器响应时
axios.interceptors.response.use(
  response => { // 成功请求到数据
    cancelDuplicate(response.config)
    count--
    if (count === 0) {
      Vue.hiddenGlobalMethod()
    }
    return response
  },
  error => { // 响应错误处理
    cancelDuplicate(error.config)
    count=0
    Vue.hiddenGlobalMethod()
    console.log("加载失败,请刷新重试!");
    return Promise.reject(error)
  }
)
// 封装get/post方法
export default {
  get: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(path, {
        params: data
      })
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  post: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.post(path, data)
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  all: function (list) {
    return new Promise(function (resolve, reject) {
      axios.all(list)
        .then(axios.spread(function (...result) {
          resolve(result)
        }))
        .catch(function (error) {
          reject(error)
        })
    })
  }
}
