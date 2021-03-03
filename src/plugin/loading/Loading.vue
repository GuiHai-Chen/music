<template>
    <div class="contain" v-show="isShow">
        <div class="loading"></div>
        <p>{{title}}</p>
    </div>
</template>

<script>
export default {
  name: 'Loading',
  data: function () {
    return {
      title: '正在加载...',
      isShow: false
    }
  }
}
</script>

<style scoped lang="scss">
  *{
      margin:0;
      padding:0;
  }
  .contain{
    width: 200px;
    height: 200px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #cccccc;
    border-radius: 10px;
    padding-top: 30px;
    box-sizing: border-box;
    .loading{
      width: 100px;
      height: 100px;
      border:5px solid #ffffff;
      border-radius: 50%;
      background-color: #cccccc;
      margin: 0 auto;
      border-right-color:skyblue;
      animation: myLoading 3s linear infinite;
    }
    p{
      text-align: center;
      margin-top: 10px;
      font-size: 24px;
    }
    @keyframes myLoading {
        from{
          transform: rotate(0);
        }
      to{
        transform: rotate(360deg);
      }
    }
  }
</style>
