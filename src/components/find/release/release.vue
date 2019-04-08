<template>
    <div class="release">
      <div class="content-wrapper" ref="wrapper">
        <div class="content-text">
          <yd-navbar  slot="navbar" title="">
              <router-link to=""  @click.native="back" slot="left">
                  <yd-navbar-back-icon></yd-navbar-back-icon>
              </router-link>
              <button class="release-btn" @click="submitCircle" slot="right" >发表</button>
          </yd-navbar>
          <yd-cell-group>
            <yd-cell-item>
                <yd-textarea slot="right" v-model="textContent" placeholder="这一刻的想法..."></yd-textarea>
            </yd-cell-item>
            <div class="release-img" >
                <div  v-for="(item, index) in imgList" :key="index">
                    <img :src="item"/> 
                </div>
                <div v-if="imgList.length < 9 ? true : false" class="add-img" @click="show1 = true"></div>
            </div>
        
        </yd-cell-group>
        </div>
        <yd-actionsheet :items="myItems1" v-model="show1" cancel="取消"></yd-actionsheet>
      </div>
      <router-view></router-view>
       
    </div>
</template>

<script type="text/ecmascript-6">
  import api from '@/api/resource.js'
  import { mapMutations, mapGetters } from "vuex";
  export default {
    components: {
    },
    data () {
      return {
        show1: false,
        myItems1: [
          {
            label: '拍照',
            callback: () => {
                /* 注意： callback: function() {} 和 callback() {}  这样是无法正常使用当前this的 */
                let that = this;
                let cmr = plus.camera.getCamera();
                cmr.captureImage(
                  function(path) {
                    // 显示后的content
                    let upList = new Array();
                    // 上传的信息
                    let upContList = new Array();
                    plus.io.resolveLocalFileSystemURL(
                      path,
                      function(entry) {
                        let reader = new plus.io.FileReader();
                        reader.readAsDataURL(entry.toLocalURL());
                        reader.onload = function(e) {
                          that.imgList.push(e.target.result)
                        };
                      },
                      function(e) {
                        plus.nativeUI.toast("文件读取错误：" + e.message);
                      }
                    );
                    //alert("Capture image success: " + path);
                  },
                  function(error) {
                    console.log("Capture image failed: " + error.message);
                  },
                  {}
                );
            }
          },
          {
            label: '从相册中偷取',
            callback: () => {
              let that = this;
              plus.gallery.pick(
                function(path) {
                  let files = path.files;
                  // 显示后的content
                  let i = 0;
                  // 需要优化
                  for (i; i < files.length; i++) {
                    let file = files[i];
                    plus.io.resolveLocalFileSystemURL(
                      file,
                      function(entry) {
                        let reader = new plus.io.FileReader();
                        reader.onloadend = function(e) {
                          that.imgList.push(e.target.result)
                        };
                        reader.readAsDataURL(entry.toLocalURL());
                      },
                      function(e) {
                        plus.nativeUI.toast("文件读取错误：" + e.message);
                      }
                    );
                  }
                },
                function(e) {
                  console.log("取消选择图片")
                },
                {
                  filter: "image",
                  multiple: true,
                  maximum: 9 - that.imgList.length,
                  system: false,
                  onmaxed: function() {
                    plus.nativeUI.alert("已达到最大图片数量了。。");
                  }
                }
              );
              // this.$router.push({
              //   path: `/find/release`
              // });
            }
          }
        ],
        imgList: [], // 需要发表的图片列表
        textContent: "", // 需要发表的文字内容
      }
    },
    computed: {
      ...mapGetters(["sysUserCircleOfFriendsList"])
    },
    mounted () {
      this.imgList = this.$route.params.imgList;
    },
    methods: {
      back (event) {
        this.$router.back()   // 返回上一级
      },
      // 发表
      submitCircle(){
        // 需要验证图片以及文字不为空
        if(this.imgList.length > 0 || this.textContent){
          let accessToken = JSON.parse(localStorage.getItem("access_token"));
          api.saveSysUserCircleOfFriends(this, {
            userId: accessToken.id,
            textContent: this.textContent,
            imgContent: JSON.stringify(this.imgList)
          }).then( res => {
            let _val = res.body;
            if(_val.code == 200){
              // 返回添加的发表数据
              let sysUserCircleOfFriends = _val.sysUserCircleOfFriends;
              let _sysUserCircleOfFriendsList = JSON.parse(JSON.stringify(this.sysUserCircleOfFriendsList));
              _sysUserCircleOfFriendsList.unshift(sysUserCircleOfFriends);
              this.setSysUserCircleOfFriends(_sysUserCircleOfFriendsList);
              this.$router.push({
                name: `friendcircle`
              });
            }
            console.log(JSON.stringify(res))
          }).catch( err => {
            console.log(JSON.stringify(err))
          })
        }
      },
      ...mapMutations({
        setSysUserCircleOfFriends: "SET_SYSUSER_CIRCLE_OF_FRIENDS_LIST"
      })
    }
  }
</script>

<style>
  .release{
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color: #fff;
  }
  .release .yd-cell:after{
      background-image: none;
  }
  .release  .release-btn{
    background: rgb(141, 102, 250);
    color: #fff;
    min-width:1.1rem;
    border-radius: 5px;
    height: 0.6rem;
    padding: 0;
    display: inline-block;
    text-align: center;
    line-height: 0.6rem;
    border: none;
  }
  .release-img{
    clear: both;
    overflow: hidden;
    text-align: center;
    margin: auto;
    padding: 0.2rem 0.3rem;
  }
  .release-img div{
    float: left;
  }
  .release-img img{
    float: left;
    width: 2rem;
    height: 2rem;
    margin-right: 0.1rem;
    margin-top: 0.1rem;
  }
  .add-img{
    background: url(../../../assets/add.png) #eee no-repeat;
    background-size: 40%;
    background-position: center;
    width: 2rem;
    height: 2rem;
    float: left;
    margin: 0.1rem 0;
    }
</style>
