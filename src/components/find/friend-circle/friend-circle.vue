<template>
  <yd-layout class="friend-circle">
    <yd-navbar @click="back" slot="navbar" title="朋友圈">
      <router-link to="/find" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
      <router-link slot="right" to @click.native="show1 = true">
        <i class="iconfont icon-paizhao"></i>
      </router-link>
    </yd-navbar>
    <scroller @click.native="hidePinLun">
      <div class="content-top">
        <img class="circle-bg" src="../../../assets/find/bg.png">
        <div class="user">
          <span>{{accessToken.nickName}}</span>
          <img :src="accessToken.headPortrait" @click="goAlbum">
        </div>
      </div>
      <div class="content-body">
        <ul v-for="(item, index) in sysUserCircleOfFriends" :key="index">
          <li @click="MoreHide(item)">
            <div class="everyuser">
              <img class="userphoto" :src="item.imgurl">
              <div class="circle-right">
                <div class="username">
                  <h2 v-html="item.remarkName || item.nickName"></h2>
                  <p v-html="item.textContent"></p>
                </div>
                <div class="useralbum" v-if="item.imgContent">
                  <div v-for="(img, index) in formatStringToArray(item.imgContent)" :key="index">
                    <img :src="img" height="100" width="100">
                  </div>
                </div>
                <div class="usertime">
                  <p v-html="formatDate(item.rtime)"></p>
                  <div class="circle-more" @click.stop="showHide(item)">
                    <div class="son" :class="{sonactive: item.show}">
                      <div class="circle-zan" @click.stop="goZan(item, index)" v-if="item.praise">取消</div>
                      <div class="circle-zan" @click.stop="goZan(item, index)" v-else>赞</div>
                      <div class="circle-pinlun" @click.stop="goPinlun(item, index, '')">评论</div>
                    </div>
                  </div>
                </div>
                <!-- item.likeds  //comments  -->
                <div class="Assist-box" v-if="item.likeds.length > 0">
                  <span v-for="(items,index) in item.likeds" :key="index">{{items}}</span>
                </div>
                <div class="assist-comments" v-for="(comm, commIndex) in item.comments" :key="commIndex">
                  <div @click.stop="goPinlun(item, index, commIndex)">
                    <a class="assist-name">{{comm.commentRemarkName || comm.commentNickName }}:</a>
                    <a v-if="comm.beCommentedId" class="assist-name">{{comm.beCommentRemarkName || comm.beCommentNickName }}</a>
                    <i>{{comm.commentCon}}</i>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div style="text-align: center;opacity: 0.6;margin-top: 20px;">----没有更多动态了----</div>
      </div>
     
    </scroller>
     <div class="comments" v-show="comment">
        <yd-input slot="left" v-model="input1" :placeholder="beCommentName ? '回复' + beCommentName : '评论'" :show-clear-icon="false"></yd-input>
        <yd-button slot="left" bgcolor="#8d66fa" color="#FFF" @click.native="SendComment">发送</yd-button>
      </div>
    <router-view></router-view>
    <yd-actionsheet :items="myItems1" v-model="show1" cancel="取消"></yd-actionsheet>
  </yd-layout>
</template>

<script type="text/ecmascript-6">
import api from "@/api/resource.js";
import { mapMutations, mapGetters } from "vuex";
export default {
  components: {
    // BScroll
  },
  computed: {
    ...mapGetters(["sysUserCircleOfFriendsList"])
  },
  data() {
    return {
      sysUserCircleOfFriends: [],
      show1: false,
      comment: false,
      input1: '', // 评论内容
      myItems1: [
        {
          label: "拍照",
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
                      upList.push(e.target.result);
                      // 获取到了所有的图片base64的信息
                      that.$router.push({
                        name: `release`,
                        params: {
                          imgList: upList
                        }
                      });
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
          label: "从相册中偷取",
          callback: () => {
            let that = this;
            plus.gallery.pick(
              function(path) {
                let files = path.files;
                // 显示后的content
                let upList = [];
                let i = 0;
                let judge = 0;
                // 需要优化
                for (i; i < files.length; i++) {
                  let file = files[i];
                  plus.io.resolveLocalFileSystemURL(
                    file,
                    function(entry) {
                      let reader = new plus.io.FileReader();
                      reader.onloadend = function(e) {
                        judge += 1;
                        upList.push(e.target.result);
                        if (judge == files.length) {
                          // 获取到了所有的图片base64的信息
                          that.$router.push({
                            name: `release`,
                            params: {
                              imgList: upList
                            }
                          });
                        }
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
                console.log("取消选择图片");
              },
              {
                filter: "image",
                multiple: true,
                maximum: 9,
                system: false,
                onmaxed: function() {
                  plus.nativeUI.alert("最多只能选择9张图片");
                }
              }
            );
          }
        }
      ],
      accessToken: {}, // 用户信息
      commentItem: {}, // 评论的朋友圈信息
      commentIndex: 0, // 评论的朋友圈数组下标
      beCommentedIdIndex: "", // 具体的评论下标
      beCommentName: "", // 被评论人名称
      pageNo: 1,
      pageSize: 10
    };
  },
  mounted() {
    this.sysUserCircleOfFriends = JSON.parse(JSON.stringify(this.sysUserCircleOfFriendsList));
    // 用户信息
    let accessToken = JSON.parse(localStorage.getItem("access_token"));
    this.accessToken = accessToken;
    // 获取朋友圈信息
    api
      .findSysUserCircleOfFriends(this, {
        id: accessToken.id,
        pageNo: 1,
        pageSize: 10
      })
      .then(res => {
        let _val = res.body;
        if (_val.code == 200) {
          if (!_val.circleOfFriends) {
            return;
          }
          this.setSysUserCircleOfFriends(_val.circleOfFriends.list);
          this.sysUserCircleOfFriends = JSON.parse(
            JSON.stringify(_val.circleOfFriends.list)
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    back(event) {
      this.setCircleNum(0);
      this.$router.back(); // 返回上一级
    },
    admire(item) {
      item.num += 1;
    },
    goAlbum() {
      this.$router.push({
        path: `/find/friendcircle/falbum`
      });
    },
    showHide(item) {
      item.show = !item.show;
    },
    MoreHide(item) {
      item.show = false;
    },
    // 点赞
    goZan(item, index) {
      //console.log(item.likeds)
      this.$dialog.loading.open("疯狂点赞中...");
      if (item.praise) {
        // 删除
        let likedsList = this.sysUserCircleOfFriends[index].likeds;
        let delIndex = 0;
        likedsList.forEach((item, index) => {
          if (item == this.accessToken.nickName) {
            delIndex = index;
          }
        });
        api
          .addSysUserCircleOfFriendsLiked(this, {
            circleId: item.id,
            likedId: this.accessToken.id,
            isType: 1
          })
          .then(res => {
            // 移除点赞数据
            this.sysUserCircleOfFriends[index].likeds.splice(delIndex, 1);
            this.$dialog.loading.close();
            //this.sysUserCircleOfFriends[index].likeds.push(this.accessToken.nickName);
          })
          .catch(err => {
            this.$dialog.loading.close();
          });
      } else {
        api
          .addSysUserCircleOfFriendsLiked(this, {
            circleId: item.id,
            likedId: this.accessToken.id,
            isType: 0
          })
          .then(res => {
            this.sysUserCircleOfFriends[index].likeds.push(
              this.accessToken.nickName
            );
            this.$dialog.loading.close();
          })
          .catch(err => {
            this.$dialog.loading.close();
          });
      }
      item.show = false;
      item.praise = !item.praise;
    },
    // 评论
    circleCommentCommit(commentItem, commentIndex, commentCont, beCommentedIdIndex) {
      this.$dialog.loading.open("添加评论中...");
      let comment = {};
      if(beCommentedIdIndex){
        comment = this.sysUserCircleOfFriends[commentIndex].comments[beCommentedIdIndex];
      }
      api.addSysUserCircleOfFriendsComment(this, {
          circleId: commentItem.id,
          commentId: this.accessToken.id,
          beCommentedId: comment.commentId || 0, // 被回复者ID
          commentCon: commentCont, // 回复内容
        })
        .then(res => {
          this.sysUserCircleOfFriends[commentIndex].comments.push({
            circleId: commentItem.id,
            commentId: this.accessToken.id,
            commentNickName: this.accessToken.nickName,
            beCommentedId: comment.commentId || "",
            beCommentNickName: comment.commentNickName || "",
            beCommentRemarkName: comment.commentRemarkName || "",
            commentCon: commentCont
          })
          this.commentItem = {};
          this.commentIndex = 0
          this.beCommentedIdIndex = "";
          this.beCommentName = "";
          this.$dialog.loading.close();
        })
        .catch(err => {
          this.commentItem = {};
          this.commentIndex = 0
          this.beCommentedIdIndex = "";
          this.beCommentName = "";
          this.$dialog.loading.close();
        });
    },
    // 清空评论信息
    hidePinLun(){
      this.comment = false;
      this.commentItem = {};
      this.commentIndex = 0
      this.beCommentedIdIndex = "";
      this.beCommentName = "";
    },
    goPinlun(item, index, commIndex) {
      if(commIndex >= 0){
        let comm = this.sysUserCircleOfFriends[index].comments[commIndex];
        let accessToken = this.accessToken;
        if(comm.commentId == accessToken.id){
          return;
        }
        this.beCommentName = comm.commentRemarkName || comm.commentNickName;
      }
      this.commentItem = item;
      this.commentIndex = index;
      this.beCommentedIdIndex = commIndex;
      this.comment = true;
      item.show = false;
      
    },
    SendComment (){
      // 在没有评论的时候需要清楚commentItem, commentIndex, beCommentedId
      let commentCont = this.input1;// 评论内容
      let commentItem = this.commentItem;
      let commentIndex = this.commentIndex;
      let commIndex = this.beCommentedIdIndex;
      this.circleCommentCommit(commentItem, commentIndex, commentCont, commIndex);
      this.comment = false;
    },
    formatStringToArray: function(item) {
      return JSON.parse(item);
    },
    ...mapMutations({
      setSysUserCircleOfFriends: "SET_SYSUSER_CIRCLE_OF_FRIENDS_LIST"
    }),
    ...mapMutations({
      setCircleNum: "SET_CIRCLE_NUM"
    }),
    // 时间格式化
    formatDate(time) {
      let dateTimeStamp = time * 1000;
      var now = new Date();
      var y = now.getFullYear();
      var m = now.getMonth() + 1;
      var d = now.getDate();
      // 兼容苹果替换日期yyyy-MM-dd格式为yyyy/MM/dd
      if (typeof dateTimeStamp == "string") {
        var reg = getRegExp("-", "g");
        dateTimeStamp = dateTimeStamp.replace(reg, "/");
      }
      var date = new Date(dateTimeStamp);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();

      var result = "";
      if (year == y) {
        var n1 = new Date(y + "/" + m + "/" + d);
        var d1 = new Date(year + "/" + month + "/" + day);
        var diff = parseInt(n1 - d1);
        var cMinute = 1000 * 60;
        var cHour = cMinute * 60;
        var cDay = cHour * 24;
        var dayC = diff / cDay;
        // 补0
        month = month < 10 ? "0" + month + "" : "" + month + "";
        day = day < 10 ? "0" + day + "" : "" + day + "";
        hour = hour < 10 ? "0" + hour + "" : "" + hour + "";
        minute = minute < 10 ? "0" + minute + "" : "" + minute + "";

        if (dayC == 0) {
          result = "今天 " + hour + ":" + minute + "";
        } else if (dayC == 1) {
          result = "昨天 " + hour + ":" + minute + "";
        } else {
          result = month + "-" + day + " " + hour + ":" + minute + "";
        }
      } else {
        result =
          year + "-" + month + "-" + day + " " + hour + ":" + minute + "";
      }
      return result;
    }
  }
};
</script>

<style>
.friend-circle {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 203;
  background-color: #fff;
}
.friend-circle a i {
  font-size: 0.5rem;
}
.friend-circle .content-top {
  position: relative;
}
.friend-circle .circle-bg {
  width: 100%;
  margin-bottom: 20px;
}
.friend-circle .user {
  position: absolute;
  bottom: 0px;
  right: 10px;
  display: flex;
  align-items: center;
  color: #fff;
}
.friend-circle .user span {
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 20px;
  margin-right: 10px;
}
.friend-circle .user img {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 5px;
}
.friend-circle .everyuser {
  position: relative;
  border-bottom: 1px solid #e9e9e9;
  margin: 0;
  padding: 0.3rem 0.3rem;
  display: flex;
}
.friend-circle .everyuser img {
  margin-right: 10px;
}
.friend-circle .userphoto {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 5px;
}
.friend-circle .content {
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
}
.friend-circle .content-wrapper {
  height: 100%;
  overflow: hidden;
}
.friend-circle .content-top {
  position: relative;
}
.friend-circle .circle-bg {
  width: 100%;
  margin-bottom: 20px;
}
.friend-circle .usertime {
  font-size: 0.26rem;
  margin-top: 0.2rem;
  color: #b7b7b7;
  position: relative;
}
.friend-circle .usertime span {
  position: absolute;
  right: 20px;
  bottom: 20px;
  font-size: 14px;
  line-height: 14px;
}
.friend-circle .usertime img {
  position: absolute;
  right: 0.1rem;
  bottom: 0.2rem;
  z-index: 999;
}
.friend-circle .circle-more {
  background: url("../../../assets/find/more.png");
  width: 0.6rem;
  height: 0.36rem;
  background-size: cover;
  position: absolute;
  right: 0;
  bottom: 0;
}
.friend-circle .circle-more .son {
  height: 0.72rem;
  width: 0rem;
  background-color: #4d5154;
  position: absolute;
  top: -0.2rem;
  right: -3rem;
  border-radius: 5px;
  /* 收回的时候快一点 */
  transition: width 100ms;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.28rem;
}
.friend-circle .circle-more .sonactive {
  width: 2.6rem;
  transition: width 200ms;
  right: 1rem;
}
.friend-circle .username h2 {
  color: #404040;
  font-family: "楷体";
  font-size: 0.32rem;
  font-weight: bold;
  line-height: 0.32rem;
  margin-bottom: 0.1rem;
}
.friend-circle .username p {
  font-size: 0.3rem;
  line-height: 0.4rem;
  color: #383838;
}
.friend-circle .usertime {
  color: #a2a2a2;
  font-size: 0.24rem;
  margin-top: 0.1rem;
}
.friend-circle .circle-zan {
  background: url("../../../assets/find/dot.png") no-repeat;
  background-size: contain;
  color: #fff;
  background-position: 0.1rem center;
  padding-left: 0.4rem;
  border-right: 1px solid #373b3e;
  width: 1.2rem;
  text-align: center;
}
.friend-circle .circle-pinlun {
  background: url("../../../assets/find/review.png") no-repeat;
  background-size: 0.35rem;
  background-position: 0.2rem center;
  color: #fff;
  padding-left: 0.6rem;
  width: 1.2rem;
}
.assist-comments {
    border-top: 1px solid #eee;
    margin-top: 0.1rem;
    padding: 0.1rem;
    background: #f3f3f5;
}
.assist-name {
  color: #5b6894;
  font-weight: bold;
}
.circle-right {
  width: 86%;
}
.Assist-box {
  width: 5.9rem;
  padding: 0.1rem;
  background: #f3f3f5;
  position: relative;
  top: 0.3rem;
  margin-bottom: 0.2rem;
}
.Assist-box:after {
  content: "";
  position: absolute;
  border-style: solid;
  /* border-color: lightgreen transparent transparent; */
  border-color: transparent transparent #f3f3f5 transparent;
  border-width: 0.2rem;
  top: -0.4rem;
  left: 0.4rem;
}
.Assist-box span {
  background: url("../../../assets/find/dot1.png") no-repeat;
  color: #5b6894;
  background-size: contain;
  padding-left: 0.3rem;
  font-weight: bold;
  margin-right: 0.1rem;
  margin-bottom: 0.1rem;
}
.useralbum {
  clear: both;
  overflow: hidden;
}
.useralbum div {
  float: left;
}
.comments{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.8rem;
  border-top: 1px solid #eee;
  background: #f8f8f8;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
}
.comments .yd-input>input{
    background: #fff;
    height: 0.66rem;
    padding: 0 0.2rem;
    width: 97%;
}
</style>
