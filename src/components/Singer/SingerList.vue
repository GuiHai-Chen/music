<template>
  <div class="singer-list">
    <ScrollView ref="scrollView">
      <ul class="list-wrapper">
        <li v-for="(letter, index) in keys" :key="letter" ref="groups">
          <h2>{{letter}}</h2>
          <ul class="list-group">
            <li v-for="(item,i) in artists[index]" :key="i" class="group-item" @click="selectSinger(item.id)">
              <img v-lazy="item.picUrl">
              <p>{{item.name}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <ul class="list-shortcut"
        @touchstart.stop.prevent="touchstart"
        @touchmove.stop.prevent="touchmove">
      <li v-for="(value, index) in keys"
          :data-index="index"
          :key="value"
          :class="{'active': currentIndex === index}">{{value}}</li>
    </ul>
    <div class="list-title" v-show="listTitle !== ''" ref="listTitle">{{listTitle}}</div>
  </div>
</template>

<script>
import ScrollView from '../ScrollView'
export default {
  name: 'SingerList',
  components: {
    ScrollView
  },
  props: {
    keys: {
      type: Array,
      default: () => [],
      required: true
    },
    artists: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    _moveTo (index) {
      this.currentIndex = index
      const targetGroup = this.$refs.groups[index]
      const offsetY = targetGroup.offsetTop
      this.$refs.scrollView.scrollTo(0, -offsetY, 0)
    },
    touchstart (e) {
      const index = e.target.dataset.index
      this._moveTo(parseInt(index))

      this.touchStartY = e.touches[0].pageY
    },
    touchmove (e) {
      const moveY = e.touches[0].pageY
      const offsetY = (moveY - this.touchStartY) / e.target.offsetHeight
      let index = parseInt(e.target.dataset.index) + Math.floor(offsetY)
      if (index < 0) {
        index = 0
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1
      }
      this._moveTo(index)
    },
    _calculateTops () {
      this.$nextTick(() => {
        this.$refs.groups.forEach((group) => {
          this.groupsTops.push(group.offsetTop)
        })
      })
    },
    selectSinger (id) {
      // this.$router.push(`/music/singer/detail/${id}/singer`)
      this.$router.push(`/singer/detail/${id}/singer`)
    }
  },
  watch: {
    artists () {
      this._calculateTops()
    },
    listTitle () {
      this.$nextTick(() => {
        this.listTitleHeight = this.$refs.listTitle.offsetHeight
      })
    }
  },
  computed: {
    listTitle () {
      if (this.scrollY >= 0) {
        return ''
      }
      return this.keys[this.currentIndex] ? this.keys[this.currentIndex] : ''
    }
  },
  data () {
    return {
      currentIndex: 0,
      touchStartY: 0,
      groupsTops: [],
      scrollY: 0,
      listTitleHeight: 0,
      diffOffsetY: 0
    }
  },
  mounted () {
    this.$refs.scrollView.scrolling((y) => {
      this.scrollY = y
      // 处理第一组
      if (y > 0) {
        this.currentIndex = 0
        return
      }
      // 处理中间组
      for (let i = 0; i < this.groupsTops.length - 1; i++) {
        const preHeight = this.groupsTops[i]
        const nextHeight = this.groupsTops[i + 1]
        if (-y >= preHeight && -y < nextHeight) {
          this.currentIndex = i
          this.diffOffsetY = y + nextHeight
          // console.log(this.diffOffsetY)

          const fixTop = (this.diffOffsetY >= 0 && this.diffOffsetY <= this.listTitleHeight) ? this.diffOffsetY - this.listTitleHeight : 0
          if (this.fixTop === fixTop) {
            return
          }
          this.fixTop = fixTop
          this.$refs.listTitle.style.transform = `translateY(${fixTop}px)`
          return
        }
      }
      // 处理最后一组
      this.currentIndex = this.groupsTops.length - 1
    })
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .singer-list{
    width: 100%;
    height: 100%;
    .list-wrapper{
      h2{
        color: #fff;
        padding: 10px 20px;
        box-sizing: border-box;
        @include font_size($font_medium);
        @include bg_color();
      }
      .list-group{
        .group-item{
          padding: 20px;
          display: flex;
          justify-content: start;
          align-items: center;
          border-bottom: 1px solid #ccc;
          img{
            width: 124px;
            height: 100px;
            object-fit: cover;
            border-radius: 10px;
          }
          p{
            margin-left: 20px;
            @include font_color();
            @include font_size($font_medium);
          }
        }
      }
    }
    .list-shortcut{
      position: fixed;
      top: 55%;
      transform: translateY(-50%);
      right: 10px;
      @include font_size($font_samll);
      @include no-wrap();
      @include font_color();
      li{
        padding: 3px 10px;
        text-align: center;
        &.active{
          opacity: 0.5;
          text-shadow: 0 0 10px red;
        }
      }
    }
    .list-title{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      color: #fff;
      padding: 10px 20px;
      box-sizing: border-box;
      @include font_size($font_medium);
      @include bg_color();
    }
  }
</style>
