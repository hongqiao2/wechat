<template>
  <transition name="slide">
    <div class="friend">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  slot="navbar" title="群聊">
            <router-link to="" slot="left" @click.native="back" >
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
       <template>
          <yd-cell-group>
              <yd-cell-item @click.native="goGroupdetail">
                <ul class="group-photo" slot="left">
                  <li v-for="item in arr" :style="{backgroundImage: 'url(' + item.imgurl + ')'}"></li>
                </ul>
                  <div slot="left">
                    <p>嘻嘻哈哈聚餐群</p>
                  </div>
              </yd-cell-item>
          </yd-cell-group>
      </template>
      </div>
      <router-view></router-view>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  export default {
    components: {
    },
    data () {
      return {
        arr: [
          {'imgurl': 'https://image.zhangxinxu.com/image/study/head/s180/14.jpeg'},
          {'imgurl': 'https://image.zhangxinxu.com/image/study/head/s180/14.jpeg'},
          {'imgurl': 'https://image.zhangxinxu.com/image/study/head/s180/14.jpeg'},
          {'imgurl': 'https://image.zhangxinxu.com/image/study/head/s180/14.jpeg'},
          {'imgurl': 'https://image.zhangxinxu.com/image/study/head/s180/14.jpeg'},
          {'imgurl': 'https://image.zhangxinxu.com/image/study/head/s180/14.jpeg'}
        ]
      }
    },
    mounted () {
    },
    methods: {
      back (event) {
        this.$router.back()   // 返回上一级
      },
      goGroupdetail () {
        this.$router.push({
          path: `/address/group/groupdetail`
        });
      }
    }
  }
</script>

<style>
.friend{
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color:#F9F9F9;
}
.group-photo{
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 5px;
    border: 3px solid #eee;
    background: #eee;
    padding: 0;
    margin: 0;
    list-style-type: none;
    margin-right: 0.2rem;
}
.friend li {
  background: url(https://image.zhangxinxu.com/image/study/head/s180/14.jpeg);
  background-size: 100%;
  outline: 1px solid #eee;
}
/* 1个 */
.friend li:only-child {
  height: 100%;
}
/* 2个 */
.friend li:first-child:nth-last-child(2),
.friend li:first-child:nth-last-child(2) + li {
  width: 50%; height: 50%;
}
.friend li:first-child:nth-last-child(2) + li {
  margin-left: auto;
}
/* 3个 */
.friend li:first-child:nth-last-child(3),
.friend li:first-child:nth-last-child(3) ~ li {
  width: 50%; height: 50%;
}
.friend li:first-child:nth-last-child(3) {
  margin: auto;
}
.friend li:first-child:nth-last-child(3) ~ li {
  float: left;
}
/* 4个 */
.friend li:first-child:nth-last-child(4),
.friend li:first-child:nth-last-child(4) ~ li {
  width: 50%; height: 50%;
  float: left;
}
/* 5个和6个 */
.friend li:first-child:nth-last-child(5),
.friend li:first-child:nth-last-child(6) {
  width: 63%;
  height: 63%;
  float: left;
}
.friend li:first-child:nth-last-child(5) ~ li,
.friend li:first-child:nth-last-child(6) ~ li {
  width:  32%;
  height: 32%;
  float: left;
}
/* 7个 8个 9个 */
.friend li:first-child:nth-last-child(7),
.friend li:first-child:nth-last-child(8),
.friend li:first-child:nth-last-child(9),
.friend li:first-child:nth-last-child(7) ~ li,
.friend li:first-child:nth-last-child(8) ~ li,
.friend li:first-child:nth-last-child(9) ~ li {
  width: 32%;
  height: 32%;
  float: left;
}
.friend li:first-child:nth-last-child(7) {
  float: none;
  margin: auto;
}
.friend .yd-cell-left p{
  font-size: 0.32rem;
  color: #464646;
}
</style>
