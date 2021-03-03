<template>
  <div class="search">
    <div class="search-box">
      <img class="search-icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="/>
      <input type="text" :placeholder="isShowPlaceholder?'搜索歌曲、歌手、专辑':''" @blur="showPlace" @focus="hiddenPlace" v-model="keywords" v-throttle="search">
    </div>
    <div class="search-hot">
      <h3>热门搜索</h3>
      <ul>
        <li v-for="value in hots" :key="value.first" @click="selectedHot(value.first)">{{value.first}}</li>
      </ul>
    </div>
    <ul class="search-history">
      <li v-for="value in searchHistory" :key="value" @click.stop="selectedHistory(value)">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+" alt="">
        <p>{{value}}</p>
        <img @click.stop="delHistory(value)" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=" alt="">
      </li>
    </ul>
    <div class="list-wrapper" v-show="keywords !== ''">
      <ScrollView>
        <ul class="search-list">
          <li v-for="value in searchList" :key="value.id" @click="selectedItem(value)">
            <img class="search-icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="/>
            <p>{{value.name}} - {{value.artists[0].name}}</p>
          </li>
        </ul>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import { getSearchHot, getSearchSuggest } from '../api/index'
import { setLocalStorage, getLocalStorage } from '../tools/tools'
import ScrollView from '../components/ScrollView'
import { mapActions } from 'vuex'
export default {
  name: 'Search',
  components: {
    ScrollView
  },
  data () {
    return {
      keywords: '',
      searchList: [],
      hots: [],
      searchHistory: [],
      isShowPlaceholder: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    //热门搜索
    selectedHot (key) {
      this.keywords = key
      this.search()
    },
    //搜索历史
    selectedHistory (key) {
      this.keywords = key
      this.search()
    },
    //删除搜索历史
    delHistory (key) {
      this.searchHistory = this.searchHistory.filter(function (item) {
        return item !== key
      })
      setLocalStorage('searchHistory', this.searchHistory)
    },
    //搜索结果的项
    selectedItem (value) {
      if (!this.searchHistory.includes(this.keywords)) {
        this.searchHistory.push(this.keywords)
        setLocalStorage('searchHistory', this.searchHistory)
      }
      this.keywords = ''
      this.setFullScreen(true)
      this.setSongDetail([value.id])
    },
    //搜索
    search () {
      if (this.keywords === '') {
        return
      }
      getSearchSuggest({ keywords: this.keywords })
        .then((result) => {
          this.searchList = result.result.songs
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    //显示搜索框的占位文字
    showPlace () {
      this.isShowPlaceholder = true
    },
    //隐藏搜索框的占位文字
    hiddenPlace () {
      // console.log(0)
      this.isShowPlaceholder = false
    }
  },
  directives: {
    //自定义函数节流指令
    throttle: {
      inserted: function (el, obj) {
        let timerId = null
        let flag = true
        el.addEventListener('input', () => {
          if (!flag) return
          flag = false
          timerId && clearTimeout(timerId)
          timerId = setTimeout(() => {
            flag = true
            obj.value()
          }, 1000)
        })
      }
    }
  },
  created () {
    //获取热门搜索信息
    getSearchHot()
      .then((result) => {
        this.hots = result.result.hots
      })
      .catch(function (err) {
        console.log(err)
      })
    if (getLocalStorage('searchHistory')) {
      this.searchHistory = getLocalStorage('searchHistory')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/variable";
  @import "../assets/css/mixin";
  .search{
    position: fixed;
    left: 0;
    right: 0;
    top: 184px;
    bottom: 0;
    @include bg_sub_color();
    .search-box{
      margin: 40px 20px;
      background: #ebecec;
      border-radius: 30px;
      overflow: hidden;
      display: flex;
      padding: 10px 10px;
      border-bottom: 1px solid #ccc;
      .search-icon{
        width: 40px;
        height: 40px;
      }
      input{
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        @include font_size($font_medium);
        color: #000;
        padding-left: 10px;
      }
    }
    .search-hot{
      h3{
        @include font_size($font_medium_s);
        @include font_color();
        margin-left: 20px;
      }
      ul{
        display: flex;
        flex-wrap: wrap;
        li{
          margin: 10px 20px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 30px;
          @include font_color();
        }
      }
    }
    .search-history{
      li{
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        img{
          &:nth-of-type(1){
            width: 36px;
            height: 36px;
          }
          &:nth-of-type(2){
            width: 30px;
            height: 30px;
          }
        }
        p{
          flex: 1;
          padding-left: 20px;
          @include font_size($font_medium);
          @include font_color();
        }
      }
    }
    .list-wrapper{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      top: 324px;
      overflow: hidden;
      @include bg_sub_color();
      .search-list{
        li{
          padding: 20px;
          box-sizing: border-box;
          border-bottom: 1px solid #ccc;
          display: flex;
          align-items: center;
          @include no-wrap();
          img{
            width: 40px;
            height: 40px;
          }
          p{
            @include font_color();
            @include font_size($font_medium);
            margin-left: 20px;
          }
        }
      }
    }
  }
</style>
