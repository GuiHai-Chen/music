<template>
  <div class="recommend">
    <div class="recommend-warpper">
      <ScrollView>
        <div>
        <Banner :banners="banners"></Banner>
        <Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelectItem"
                      :type="'personalized'"></Personalized>
        <Personalized :personalized="albums" :title="'最新专辑'" @select="fatherSelectItem"
                      :type="'album'"></Personalized>
        <SongList :songs="songs"></SongList>
      </div>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../api/index'
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import SongList from '../components/Recommend/NewSongs'
import ScrollView from '../components/ScrollView'

export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView
  },
  methods: {
    //跳转到歌单详情
    fatherSelectItem (id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  },
  data () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: []
    }
  },
  created () {
    //获取轮播图信息
    getBanner()
      .then((data) => {
        this.banners = data.banners
      })
      .catch(function (err) {
        console.log(err)
      })
    //获取推荐歌单
    getPersonalized()
      .then((data) => {
        this.personalized = data.result
      })
      .catch(function (err) {
        console.log(err)
      })
    //获取最新专辑
    getNewAlbum()
      .then((data) => {
        this.albums = data.albums.splice(0, 6)
      })
      .catch(function (err) {
        console.log(err)
      })
    //获取最新音乐
    getNewSong()
      .then((data) => {
        const list = []
        data.result.forEach((value) => {
          const obj = {}
          obj.id = value.id
          obj.name = value.name
          obj.picUrl = value.song.album.picUrl
          let singer = ''
          for (let i = 0; i < value.song.artists.length; i++) {
            if (i === 0) {
              singer = value.song.artists[i].name
            } else {
              singer += '-' + value.song.artists[i].name
            }
          }
          obj.singer = singer
          list.push(obj)
        })
        this.songs = list
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>

<style scoped lang="scss">
  .recommend {
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    .recommend-warpper{
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
  .v-enter {
    transform: translateX(100%);
  }

  .v-enter-to {
    transform: translateX(0%);
  }

  .v-enter-active {
    transition: transform 0.5s;
  }

  .v-leave {
    transform: translateX(0%);
  }

  .v-leave-to {
    transform: translateX(100%);
  }

  .v-leave-active {
    transition: transform 0.5s;
  }
</style>
