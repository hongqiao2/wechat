<template>
  <yd-layout class="chatroom">
    <yd-navbar slot="navbar" :title="info.remark_name ? info.remark_name : info.nick_name">
      <router-link to @click.native="back" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
      <img
        class="person-icon"
        @click="gotoUser(info)"
        slot="right"
        src="../../assets/chatroom/person.png"
      >
    </yd-navbar>
    <div class="content">
      <div class="content-wrapper" ref="wrapper">
        <div class="content-text">
          <div class="content-body" ref="body">
            <ul class="inHtml" v-for="(item, index) in content" :key="item.sendMsg">
              <div v-if="item.msgType == 0">
                <span v-if="item.isAddFriend == 1" class="chatroom-hint">{{item.sendMsg}}</span>
                <li class="ask" v-if="item.isSend == 0 && item.isAddFriend == 0">
                  <img :src="item.userImg">
                  <div>
                      <p>{{item.sendMsg}}</p>
                  </div>
                  
                  <div class="loading" v-if="item.loadding"></div>
                  <div class="failure iconfont icon-tixingtishi" v-if="item.fail"></div>
                </li>
                <li class="reply" v-if="item.isSend == 1 && item.isAddFriend == 0">
                  <img :src="item.userImg">
                  <div>
                      <span class="groupName">{{item.userName}}</span>
                      <p>{{item.sendMsg}}</p>
                  </div>
                  <div class="loading" v-if="item.loadding"></div>
                </li>
              </div>
              <div v-else-if="item.msgType == 1">
                <!-- 图片 -->
                <li class="ask" v-if="item.isSend == 0 && item.isAddFriend == 0">
                  <img :src="item.userImg">
                  <!-- <yd-lightbox>
                    <img class="contont-img" slot="right" :src="item.sendMsg">
                  </yd-lightbox> -->
                  <img class="contont-img" slot="right" :src="item.sendMsg">
                  <!-- <img class="contont-img" slot="right" src="../../assets/find/test.png"> -->
                  <div class="failure iconfont icon-tixingtishi" v-if="fail"></div>
                </li>
                <li class="reply" v-if="item.isSend == 1 && item.isAddFriend == 0">
                  <img :src="item.userImg">
                  <yd-lightbox>
                    <yd-lightbox-img class="contont-img" :src="item.sendMsg"></yd-lightbox-img>
                  </yd-lightbox>
                </li>
              </div>
              <div v-else>
                <!-- 语音 -->
                <li class="ask" v-if="item.isSend == 0 && item.isAddFriend == 0">
                  <img :src="item.userImg">
                  <!-- item.audioTime //录音时长 -->
                  <p class="audioBox" style="width: 25%;" @click="goPlay(item.sendMsg,index)">
                    <audio preload="auto" hidden="true">
                      <source :src="item.sendMsg" type="audio/mpeg">
                    </audio>
                    <span>{{item.audioTime }}''</span>
                    <span :class="{animation1:item.isShow}" class="voiceIcon1"></span>
                    
                  </p>
                  <!-- <audio :src="item.sendMsg"></audio>
                  <div class="failure iconfont icon-tixingtishi" v-if="fail"></div> -->
                </li>
                <li class="reply" v-if="item.isSend == 1 && item.isAddFriend == 0">
                  <img :src="item.userImg">
                  <!-- item.audioTime //录音时长 -->
                  <p class="audioBox" style="width: 25%;" @click="goPlay(item.sendMsg, index)">
                    <audio preload="auto" hidden="true">
                      <source :src="item.sendMsg" type="audio/mpeg">
                    </audio>
                    <span :class="{animation:item.isShow}" class="voiceIcon"></span>
                    <span>{{item.audioTime }}''</span>
                  </p>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
     
      <a id="bottom" class="Backbottom">回到底部</a>
    </div>
    <div class="chatroom-bottom" v-bind:class="{ popHeight:popHeight}">
      <button
        class="voice-btn"
        v-if="showVoice"
        @click="changeStatus"
        @touchstart="startSoundRecording"
        @touchmove="moveSoundRecording"
        @touchend="gtouchend"
      >语音</button>
      <button class="text-btn" v-if="showText" @click="changeStatus">键盘</button>
      <div class="send" v-if="showVoice">
        <input
          type="text"
          placeholder="请输入聊天内容"
          v-model="value"
          class="sText"
          ref="sTest"
          @input="sendInput"
        >
      </div>
      <div
        class="speak"
        v-if="showText"
        @touchstart="startSoundRecording"
        @touchmove="moveSoundRecording"
        @touchend="gtouchend"
      >按住 说话</div>
      <yd-button
        bgcolor="#8D66FA"
        color="#FFF"
        class="btn"
        v-if="sendShow"
        @click.native="sendContent"
      >发送
        <!-- <a href="#bottom">发送</a> -->
      </yd-button>
      <button class="express-btn">表情</button>
      <button class="more-btn" @click="moreBtn">更多</button>
    </div>
    <div class="chat-more" v-if="showPop" @click="goAlbum">
      <div>
        <img src="../../assets/chatroom/album.png">
        <p>相册</p>
      </div>
      <div @click="goPhotograph">
        <img src="../../assets/chatroom/photograph.png">
        <p>拍照</p>
      </div>
      <div @click="goPacket">
        <img src="../../assets/chatroom/packet2.png">
        <p>云红包</p>
      </div>
      <div @click="goPacket">
        <img src="../../assets/chatroom/alipay1.png">
        <p>支付宝红包</p>
      </div>
      <div @click="goCard">
        <img src="../../assets/chatroom/card.png">
        <p>个人名片</p>
      </div>
      <div>
        <img src="../../assets/chatroom/collect1.png">
        <p>收藏</p>
      </div>
    </div>
  </yd-layout>
</template>
<script type="text/ecmascript-6">
// import BScroll from "better-scroll";
import { mapMutations, mapGetters } from "vuex";
import api from "@/api/resource.js";
export default {
  components: {
    // BScroll
  },
  computed: {
    ...mapGetters(["info", "num", "chatListCache", "userFriendList", "groupInfo"])
  },
  data() {
    return {
      text: "", // 输入框的文字
      showVoice: false, // 语音按钮
      showText: true, // 键盘按钮
      popHeight: false, // 更多弹出
      showPop: false, // 更多显示
      sendShow: false, // 发送按钮
      loading: false,
      fail: false,
      value: "",
      content: [], // 聊天内容[{userImg: "用户头像", sendMsg: "内容", isSend: "是否发送者", isAddFriend: "是否是好友通知"]
      userinfo: {},
      updateStateType: false, // 如果有新消息，或者发送了消息，就需要在返回时运行findSysUserNewLogList方法
      _infoId: "",
      screenHeight: document.body.clientHeight,
      recordingControl: true, // 录音控制
      recorder: {},
      isShow: false,
      isShow1: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      //location.href ="#bottom";//页面加载完后，跳到底部
    });
    // 获取最新信息
    let _infoId = this.info.griend_id
      ? this.info.griend_id
      : this.info.chat_bject;
    this._infoId = _infoId;
    let chatList = JSON.parse(JSON.stringify(this.chatListCache));
    let _userinfo = this.info;//chatList[_infoId];
    let userinfo = JSON.parse(localStorage.getItem("access_token"));
    this.userinfo = userinfo;
    if (_userinfo && _userinfo.news_number > 0) {
      api
        .findSysUserNewLogList(this, {
          id: userinfo.id,
          chat_bject: _infoId,
          msgState: 0,
          isGroup: 1,
          pageNo: 1,
          pageSize: 10
        })
        .then(res => {
          let _val = res.body;
          if (_val.code == "200") {
            let _list = _val.listPageInfo.list;
            let _content = [];
            for (let index in _list) {
              if (_list[index].sendType == 0) {
                _content.push({
                  userImg: _list[index].headPortrait,
                  userName: _list[index].groupName || _list[index].nickName,
                  sendMsg: _list[index].sendMsg,
                  isSend: _list[index].sendType,
                  isAddFriend: _list[index].isAddFriend,
                  msgType: _list[index].msgType,
                  audioTime: _list[index].msgTime, // 录音时间
                  loadding: false, // 圈圈
                  isShow: false, // 语音播放
                  fail: false, // 未发送成功标志
                });
              } else {
                _content.push({
                  userImg: _list[index].headPortrait,
                  userName: _list[index].groupName || _list[index].nickName,
                  sendMsg: _list[index].sendMsg,
                  isSend: _list[index].sendType,
                  isAddFriend: _list[index].isAddFriend,
                  msgType: _list[index].msgType,
                  audioTime: _list[index].msgTime, // 录音时间
                  loadding: false, // 圈圈
                  isShow: false,// 语音播放
                  fail: false, // 未发送成功标志
                });
              }
            }
            this.content = _content;
            let userChatRecordCaching = {};
            userChatRecordCaching[_infoId + "_group"] = _content;
            localStorage.setItem(
              "userChatRecordCaching",
              JSON.stringify(userChatRecordCaching)
            );
          }
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    } else {
      let userChatRecordCaching = JSON.parse(
        localStorage.getItem("userChatRecordCaching")
      );
      let recordCach = userChatRecordCaching
        ? userChatRecordCaching[_infoId + "_group"]
        : "";
      if (recordCach) {
        recordCach.forEach((item, index) => {
          this.content.push(item);
        });
      }
    }
  },
  methods: {
    ...mapMutations({
      setGroupInfo: "SET_GROUP_INFO"
    }),
    back(event) {
      let info = JSON.parse(JSON.stringify(this.info));
      info.news_number =
        typeof info.news_number != "undefined" ? info.news_number : 0;
      info.latest_news = this.text !== "" ? this.text : "";
      this.$router.push({ name: "chat", params: info });
    },
    // 录音操作
    startSoundRecording() {
      // format : "amr"
      this.recorder = plus.audio.getRecorder();
      // 获取当前的时间毫秒，用于判断录音时长
      let startTime = new Date().getTime();
      let that = this;
      this.recorder.record(
        { format: "amr" },
        function(recordFile) {
          if (that.recordingControl) {
            // 获取当前时间，
            let endTime = new Date().getTime();
            if (endTime - startTime < 1100) {
              // 录音时间太小，不进行请求， 需要提示TODO
              return;
            }
            // 减去录音开始时间，如果大于1秒就上传文件，并显示到聊天界面
            //console.log("Audio record success!" + JSON.stringify(recordFile));
            plus.io.resolveLocalFileSystemURL(
              recordFile,
              function(entry) {
                let reader = new plus.io.FileReader();
                reader.onloadend = function(e) {
                  that.text = "[语音]";
                  let audioTime = parseInt((endTime - startTime) / 1000);
                  let _content = {
                    userImg: that.userinfo.headPortrait,
                    sendMsg: e.target.result,
                    isSend: 0,
                    isAddFriend: 0,
                    loadding: true, // 圈圈
                    isShow: false, // 语音播放
                    msgType: 2,
                    imgName: entry.name,
                    audioTime: audioTime, // 录音时间
                    fail: false, // 未发送成功标志
                  };
                  that.content.push(_content);
                  // 在这里调用API, 修改loadding的状态
                  //that.imgUpload(that, upContList, upList);
                  let upLength = that.content.length;
                  api
                    .saveGroupSendMsg(that, {
                      id: that.userinfo.id,
                      chat_bject: that._infoId,
                      sendMsg: e.target.result,
                      is_group: 1,
                      msg_type: 2,
                      msg_time: audioTime,
                      imgBase64: ""
                    })
                    .then(res => {
                      let _val = res.body;
                      if (_val.code == "200") {
                        // 修改状态开始
                        that.content[upLength - 1].loadding = false;
                        that.content[upLength - 1].sendMsg = _val.sendMsg;
                        _content.loadding = false;
                        _content.sendMsg = _val.sendMsg;
                        // 修改状态结束

                        that.updateStateType = true; // 要修改消息状态
                        // 加入聊天缓存
                        let userChatRecordCaching = _content;
                        var userChatRecordCachings = localStorage.getItem(
                          "userChatRecordCaching"
                        );
                        if (
                          userChatRecordCachings != null &&
                          userChatRecordCachings.length > 0
                        ) {
                          userChatRecordCachings = JSON.parse(
                            userChatRecordCachings
                          );
                          if (userChatRecordCachings[that._infoId + "_group"]) {
                            // 若果聊天信息缓存有
                            userChatRecordCachings[that._infoId  + "_group"].push(
                              userChatRecordCaching
                            );
                          } else {
                            userChatRecordCachings[that._infoId  + "_group"] = [];
                            userChatRecordCachings[that._infoId  + "_group"].push(
                              userChatRecordCaching
                            );
                          }
                        } else {
                          // 如果聊天缓存没有
                          userChatRecordCachings = {};
                          userChatRecordCachings[that._infoId  + "_group"] = [];
                          userChatRecordCachings[that._infoId  + "_group"].push(
                            userChatRecordCaching
                          );
                        }
                        localStorage.setItem(
                          "userChatRecordCaching",
                          JSON.stringify(userChatRecordCachings)
                        );
                      }
                    })
                    .catch(err => {
                      that.content[upLength - 1].loadding = false;
                      that.content[upLength - 1].fail = true;
                      console.log(JSON.stringify(err));
                    });
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
          console.log("Audio record failed: " + JSON.stringify(e));
        }
      );
    },
    goPlay(recordFile,index) {
      // 需要传length, 修改content
      let that = this;
      that.content[index].isShow = true;
      var p = plus.audio.createPlayer(recordFile);
      p.play(
        function() {
          //语音播放完
          that.content[index].isShow = false;
        },
        function(e) {
          // 录音时间过短
          console.log("Audio play error: " + e.message);
        }
      );
    },
    moveSoundRecording() {
      // 取消录音
      this.recordingControl = false;
      this.recorder.stop();
    },
    gtouchend() {
      this.recorder.stop();
    },
    // 拍照
    goPhotograph() {
      let cmr = plus.camera.getCamera();
      let that = this;
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
                that.text = "[图片]";
                let _content = {
                  userImg: that.userinfo.headPortrait,
                  sendMsg: e.target.result,
                  isSend: 0,
                  isAddFriend: 0,
                  loadding: true, // 圈圈
                  isShow: false, // 语音播放
                  msgType: 1,
                  imgName: entry.name,
                  fail: false, // 未发送成功标志
                };
                that.content.push(_content);
                // 存入要修改状态的content
                upList.push(that.content.length);
                upContList.push(_content);
                // 在这里调用API
                that.imgUpload(that, upContList, upList);
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
    },
    // 相册图片操作
    goAlbum() {
      let that = this;
      plus.gallery.pick(
        function(path) {
          let files = path.files;
          // 显示后的content
          let upList = new Array();
          // 上传的信息
          let upContList = new Array();
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
                  that.text = "[图片]";
                  let _content = {
                    userImg: that.userinfo.headPortrait,
                    sendMsg: e.target.result,
                    isSend: 0,
                    isAddFriend: 0,
                    loadding: true, // 圈圈
                    isShow: false, // 语音播放
                    msgType: 1,
                    imgName: entry.name,
                    fail: false, // 未发送成功标志
                  };
                  that.content.push(_content);
                  // 存入要修改状态的content
                  upList.push(that.content.length);
                  upContList.push(_content);
                  // 在这里调用API
                  if (judge == files.length) {
                    that.imgUpload(that, upContList, upList);
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
        function(e) {},
        {
          filter: "image",
          multiple: true,
          maximum: 9,
          onmaxed: function() {
            plus.nativeUI.alert("最多只能选择9张图片");
          }
        }
      );
    },
    imgUpload(_that, upContList, upList) {
      // 上传到服务器， 然后替换_content中的图片信息
      api
        .saveGroupSendMsg(_that, {
          id: _that.userinfo.id,
          chat_bject: _that._infoId,
          sendMsg: "",
          is_group: 1,
          msg_type: 1,
          msg_time: 0,
          imgBase64: JSON.stringify(upContList)
        })
        .then(res => {
          let _val = res.body;
          if (_val.code == "200") {
            // 修改状态开始
            let listUrl = _val.listUrl;
            let i = 0;
            let newContent = [];
            for (i; i < listUrl.length; i++) {
              (function(index) {
                let newIndex = upList[index] - 1;
                _that.content[newIndex].loadding = false;
                _that.content[newIndex].sendMsg = listUrl[i];
                newContent.push(
                  JSON.parse(JSON.stringify(_that.content[newIndex]))
                );
              })(i);
            }
            _that.updateStateType = true; // 要修改消息状态
            // 修改状态结束

            // 加入聊天缓存
            let userChatRecordCaching = newContent;
            var userChatRecordCachings = localStorage.getItem(
              "userChatRecordCaching"
            );
            if (
              userChatRecordCachings != null &&
              userChatRecordCachings.length > 0
            ) {
              userChatRecordCachings = JSON.parse(userChatRecordCachings);
              if (userChatRecordCachings[_that._infoId  + "_group"]) {
                // 若果聊天信息缓存有
                // 数组合并
                let newChatRecord = userChatRecordCachings[
                  _that._infoId
                ].concat(userChatRecordCaching);
                userChatRecordCachings[_that._infoId  + "_group"] = newChatRecord;
              } else {
                userChatRecordCachings[_that._infoId  + "_group"] = userChatRecordCaching;
              }
            } else {
              // 如果聊天缓存没有
              userChatRecordCachings = {};
              userChatRecordCachings[_that._infoId  + "_group"] = userChatRecordCaching;
            }
            localStorage.setItem(
              "userChatRecordCaching",
              JSON.stringify(userChatRecordCachings)
            );
          }
        })
        .catch(err => {
          for (i; i < listUrl.length; i++) {
              (function(index) {
                let newIndex = upList[index] - 1;
                _that.content[newIndex].loadding = false;
                _that.content[newIndex].fail = true;
              })(i);
            }
          console.log("err");
          console.log(JSON.stringify(err));
        });
    },
    gotoUser(info) {
      // 跳到群信息展示
      this.$router.push({
        name: `groupdetail`,
        params: {
          groupId: info.chat_bject
        }
      });
    },
    goPacket(info) {
      this.$router.push({
        path: `/chatroom/packet`
      });
    },
    goCard() {
      this.$router.push({
        path: `/chatroom/percard`
      });
    },
    changeStatus() {
      if (this.showVoice) {
        this.sendShow = false;
        this.showVoice = false;
        this.showText = true;
      } else if (this.showText) {
        if (this.value !== "") {
          this.sendShow = true;
        }
        this.showVoice = true;
        this.showText = false;
      }
    },
    sendContent() {
      this.value = "";
      this.sendShow = false;
      this.text = this.$refs.sTest.value;
      if (this.text !== "") {
        // 发送消息到服务器
        let _content = {
          userImg: this.userinfo.headPortrait,
          sendMsg: this.text,
          isSend: 0,
          isAddFriend: 0,
          loadding: true, // 圈圈
          isShow: false, // 语音播放
          msgType: 0,
          fail: false
        };
        this.content.push(_content);
        let upLength = this.content.length;
        api
          .saveGroupSendMsg(this, {
            id: this.userinfo.id,
            chat_bject: this._infoId,
            sendMsg: this.text,
            is_group: 1,
            msg_type: 0,
            msg_time: 0,
            imgBase64: ""
          })
          .then(res => {
            let _val = res.body;
            if (_val.code == "200") {
              // 修改状态开始
              let len = this.content.length;
              this.content[upLength - 1].loadding = false;
              // 修改状态结束

              this.updateStateType = true; // 要修改消息状态
              this.loading = false;
              // 加入聊天缓存
              let userChatRecordCaching = _content;
              var userChatRecordCachings = localStorage.getItem(
                "userChatRecordCaching"
              );
              if (
                userChatRecordCachings != null &&
                userChatRecordCachings.length > 0
              ) {
                userChatRecordCachings = JSON.parse(userChatRecordCachings);
                if (userChatRecordCachings[this._infoId  + "_group"]) {
                  // 若果聊天信息缓存有
                  userChatRecordCachings[this._infoId  + "_group"].push(
                    userChatRecordCaching
                  );
                } else {
                  userChatRecordCachings[this._infoId  + "_group"] = [];
                  userChatRecordCachings[this._infoId  + "_group"].push(
                    userChatRecordCaching
                  );
                }
              } else {
                // 如果聊天缓存没有
                userChatRecordCachings = {};
                userChatRecordCachings[this._infoId  + "_group"] = [];
                userChatRecordCachings[this._infoId  + "_group"] .push(
                  userChatRecordCaching
                );
              }
              localStorage.setItem(
                "userChatRecordCaching",
                JSON.stringify(userChatRecordCachings)
              );
            }
          })
          .catch(err => {
            this.content[upLength - 1].loading = false;
            this.content[upLength - 1].fail = true;
            console.log(JSON.stringify(err));
          });
      }
      this.$refs.sTest.value = ""; // 清空输入框的内容
    },
    moreBtn() {
      if (this.showPop) {
        this.showPop = false;
        this.popHeight = false;
      } else {
        this.showPop = true;
        this.popHeight = true;
      }
    },
    sendInput() {
      if (this.value !== "") {
        this.sendShow = true;
      } else {
        this.sendShow = false;
      }
    },
    ...mapMutations({
      setChatListCache: "SET_CHAT_LIST_CACHE"
    }),
    ...mapMutations({
      setShowNun: "SET_NUM"
    }),
    ...mapMutations({
      setAddress: "SET_INFO"
    })
  },
  watch: {
    info: function(val) {
      let _val = JSON.parse(JSON.stringify(val));
      this.text = _val.latest_news;
      var userChatRecordCachings = JSON.parse(
        localStorage.getItem("userChatRecordCaching")
      );
      if (_val.msg_type == 1) {
        let msgList = JSON.parse(_val.latest_news);
        let i = 0;
        var that = this;
        for (i; i < msgList.length; i++) {
          (function(index) {
            let _content = {
              userName: _val.userName,
              userImg: _val.head_portrait,
              sendMsg: msgList[i],
              isSend: 1,
              isAddFriend: 0,
              msgType: _val.msg_type,
              loadding: true, // 圈圈
              isShow: false, // 语音播放
              fail: false
            };
            that.content.push(_content);
            that.text = "[图片]";
            userChatRecordCachings[_val.chat_bject + "_group"].push(_content);
          })(i);
        }
      } else {
        let _content = {
          userName: _val.userName,
          userImg: _val.head_portrait,
          sendMsg: _val.latest_news,
          isSend: 1,
          isAddFriend: 0,
          msgType: _val.msg_type,
          loadding: false, // 圈圈
          isShow: false, // 语音播放
          fail: false
        };
        if (_val.msg_type == 2) {
          _content["msg_time"] = _val.msg_time;
          this.text = "[语音]";
          this.content.push(_content);
          userChatRecordCachings[_val.chat_bject + "_group"].push(_content);
        } else {
          this.text = _val.latest_news;
          this.content.push(_content);
          userChatRecordCachings[_val.chat_bject + "_group"].push(_content);
        }
      }
      //localStorage.setItem("userChatRecordCaching", JSON.stringify(userChatRecordCachings))
    }
  }
};
</script>
<style>
.chatroom .content {
  padding: 0.4rem 0.2rem;
  margin-bottom: 0.6rem;
}

.yd-scrollview:after {
  height: 0;
}
.person-icon {
  width: 0.55rem;
  height: 0.55rem;
}
.inHtml li {
  position: relative;
  overflow: hidden;
  margin-bottom: 0.3rem;
}
.voice-btn {
  background: url("../../assets/chatroom/voice.png");
  background-size: 100%;
  width: 0.5rem;
  height: 0.5rem;
  background-repeat: no-repeat;
  color: transparent;
  border: none;
  margin-left: 0.25rem;
}
.text-btn {
  background: url("../../assets/chatroom/keyboard.png");
  background-size: 100%;
  width: 0.5rem;
  height: 0.5rem;
  background-repeat: no-repeat;
  color: transparent;
  border: none;
  margin-left: 0.25rem;
}
.express-btn {
  background: url("../../assets/chatroom/face.png");
  background-size: 100%;
  width: 0.5rem;
  height: 0.5rem;
  background-repeat: no-repeat;
  color: transparent;
  border: none;
  margin-right: 0.25rem;
}
.more-btn {
  background: url("../../assets/chatroom/more.png");
  background-size: 100%;
  width: 0.5rem;
  height: 0.5rem;
  background-repeat: no-repeat;
  color: transparent;
  border: none;
  margin-right: 0.25rem;
}
.send {
  display: flex;
  width: 70%;
}
.sText {
  -webkit-box-flex: 6;
  -ms-flex: 6;
  flex: 6;
  height: 0.7rem;
  line-height: 0.7rem;
  margin: 0.2rem;
  padding-left: 8px;
  border: 1px solid #eee;
  font-size: 0.3rem;
  border-radius: 0.1rem;
  outline: none;
  -webkit-appearance: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.content-body li {
  position: relative;
  overflow: hidden;
  margin-bottom: 0.3rem;
}
.btn {
  position: absolute;
  right: 0.1rem;
  color: #fff;
  border: none;
  width: 0.8rem;
  height: 0.5rem;
  padding: 0;
  border-radius: 5px;
}
.speak {
  height: 0.7rem;
  margin: 0.2rem;
  border: 1px solid #eee;
  font-size: 0.3rem;
  border-radius: 0.1rem;
  line-height: 0.65rem;
  text-align: center;
  justify-content: center;
  color: #565656;
  font-weight: 500;
  width: 64%;
}
.inHtml {
  text-align: center;
}
.inHtml img {
  position: relative;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 5px;
}
.ask {
  text-align: right;
}
.reply {
  text-align: left;
}
.ask img {
  float: right;
  margin-left: 0.3rem;
}
.reply img {
  float: left;
  margin-right: 0.3rem;
}
.reply p,
.ask p {
  border-radius: 4px;
  text-align: left;
  font: 0.28rem Microsoft YaHei;
  line-height: 0.6rem;
}
.ask p {
  float: right;
  padding: 0.1rem 0.25rem;
  max-width: 4rem;
  background: #c2acff;
  color: #101010;
  white-space: pre-wrap;
  word-break: break-all;
}
.reply p {
  float: left;
  padding: 0.09rem 0.2rem;
  max-width: 4rem;
  min-height: 0.8rem;
  background: #fff;
  position: relative;
  left: 0;
}
.send {
  display: flex;
  width: 70%;
}
.sText {
  -webkit-box-flex: 6;
  -ms-flex: 6;
  flex: 6;
  height: 0.7rem;
  margin: 0.2rem;
  padding-left: 8px;
  border: 1px solid #eee;
  font-size: 0.3rem;
  border-radius: 0.1rem;
}
.chat-more {
  background: #f8f8f8;
  position: fixed;
  height: 3.8rem;
  z-index: 11;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-flow: wrap;
  padding: 0 0.2rem;
  align-items: center;
}
.popHeight {
  bottom: 3.8rem !important;
}
.chat-more div {
  width: 25%;
  text-align: center;
}
.chat-more img {
  width: 0.9rem;
  height: 0.9rem;
}

.chatroom-hint {
  background: #bbb;
  color: #fff;
  opacity: 0.9;
  padding: 0 0.2rem;
  border-radius: 5px;
  /* height: 0.55rem; */
  display: inline-block;
  margin-bottom: 0.3rem;
  line-height: 0.56rem;
}
.chatroom [class*="loading"] {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  color: #bbb;
  vertical-align: middle;
  pointer-events: none;
}

.loading {
  border: 0.2em solid transparent;
  border-top-color: currentcolor;
  border-radius: 50%;
  -webkit-animation: 1s loading linear infinite;
  animation: 1s loading linear infinite;
  position: relative;
  margin: 0.2rem 0.1rem;
}
.loading:before {
  content: "";
  display: block;
  width: inherit;
  height: inherit;
  position: absolute;
  top: -0.2em;
  left: -0.2em;
  border: 0.2em solid currentcolor;
  border-radius: 50%;
  opacity: 0.5;
}
.chatroom-bottom {
  height: 50px;
  background-color: #fff;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 111;
}
.Backbottom {
  opacity: 0;
}
.inHtml .contont-img {
  width: 1.8rem;
  height: auto;
  border-radius: 4px;
}
@-webkit-keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.audioBox {
  background: #fff;
}
.voiceIcon {
  width: 0.5rem;
  height: 0.5rem;
  display: block;
  background: url(../../assets/chatroom/yuyin.png) no-repeat;
  background-size: cover;
  background-position: 0;
  float: left;
  margin-right: 0.1rem;
}
.voiceIcon1 {
  width: 0.5rem;
  height: 0.5rem;
  display: block;
  background: url(../../assets/chatroom/yuyin2.png) no-repeat;
  background-size: cover;
  background-position: 0;
  float: left;
}
.animation {
  width: 0.5rem;
  height: 0.5rem;
  background: url(../../assets/chatroom/yuyin.png) no-repeat;
  animation: run 1s steps(1, start) infinite;
  -webkit-animation: run 2s steps(1, start) infinite;
  background-size: cover;
  background-position: 0;
  float: left;
  margin-right: 0.1rem;
}
.animation1 {
  width: 0.5rem;
  height: 0.5rem;
  background: url(../../assets/chatroom/yuyin2.png) no-repeat;
  animation: run 1s steps(1, start) infinite;
  -webkit-animation: run1 2s steps(1, start) infinite;
  background-size: cover;
  background-position: 0;
  float: left;
  margin-right: 0.1rem;
}
@keyframes run {
  0% {
    background-position: 0 0;
  }
  25% {
    background-position: 0px 0;
  }
  50% {
    background-position: -0.5rem -0.5px;
  }
  75% {
    background-position: -0.95rem 0;
  }
  100% {
    background-position: -1.4rem 0;
  }
}
@-webkit-keyframes run {
  0% {
    background-position: 0 0;
  }
  25% {
    background-position: 0px 0;
  }
  50% {
    background-position: -0.5rem -0.5px;
  }
  75% {
    background-position: -0.95rem 0;
  }
  100% {
    background-position: -1.4rem 0;
  }
}
@keyframes run1 {
  0% {
    background-position: 0 0;
  }
  25% {
     background-position: -1.4rem 0;
    
  }
  50% {
    background-position: -0.95rem 0;
    
  }
  75% {
    background-position: -0.5rem 0;
  }
  100% {
    background-position: 0px 0;
  }
}
@-webkit-keyframes run1 {
  0% {
    background-position: 0 0;
  }
  25% {
     background-position: -1.4rem 0;
    
  }
  50% {
    background-position: -0.95rem 0;
    
  }
  75% {
    background-position: -0.5rem 0;
  }
  100% {
    background-position: 0px 0;
  }
}
.groupName{
  display:block;
  color: #383838;
  margin-bottom: 0.12rem;
}
</style>
