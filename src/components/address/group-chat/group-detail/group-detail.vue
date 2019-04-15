<template>
  <yd-layout class="chatroom-user">
    <div class="content-wrapper" ref="wrapper">
      <div class="content-text">
        <yd-navbar slot="navbar" title="聊天详情">
          <router-link to @click.native="back" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
          </router-link>
        </yd-navbar>
        <div class="user" v-if="groupInfo.groupLeaguer && groupInfo.groupLeaguer.list">
          <div
            v-for="(item, index) in groupInfo.groupLeaguer.list"
            :key="index"
            @click="goInfo(item)"
          >
            <!-- 如果创始人ID,等于当前ID 证明是创始人 -->
            <p class="groupOwner" v-if="groupInfo.createUserId == item.user_id">群主</p>
            <img class="smallImg" :src="item.head_portrait">
            <p v-html="item.group_name || item.nick_name"></p>
          </div>
          <div class="addGroup">
            <i class="iconfont icon-jia"></i>
          </div>
          <div class="jianGroup">
            <i class="iconfont icon-jian"></i>
          </div>
        </div>
        <yd-cell-group>
          <yd-cell-item
            arrow
            type="label"
            @click.native="isUpdateGroupName(groupInfo.createUserId)"
          >
            <div slot="left">群聊名称</div>
            <div slot="right" class="groupName">{{groupInfo.groupName}}</div>
          </yd-cell-item>
          <yd-cell-item type="label" arrow @click.native="show2 = true">
            <div slot="left">我在本群的昵称:</div>
            <div slot="right">{{groupInfo.byGroupName}}</div>
          </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group>
          <yd-cell-item type="label" arrow>
            <div slot="left">查找聊天内容</div>
          </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group title>
          <yd-cell-item>
            <span slot="left">聊天置顶</span>
            <yd-switch slot="right" v-model="chatRoofPlacement" @click.native="UpChatRoofPlacement"></yd-switch>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">消息免打扰</span>
            <yd-switch slot="right" v-model="newsInterruption" @click.native="UpNewsInterruption"></yd-switch>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">保存到通讯录</span>
            <yd-switch slot="right" v-model="saveMailList" @click.native="UpSaveMailList"></yd-switch>
          </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group title>
          <yd-cell-item arrow href="" type="link" v-on:click.native="deleteall">
            <span slot="left">清空聊天记录</span>
          </yd-cell-item>
        </yd-cell-group>
      </div>
      <div
        class="group-detail-btn"
        @click="dissolutionGroup"
        v-if="groupInfo.createUserId == accessToken.id"
      >
        <yd-button size="large" type="danger">解散该群</yd-button>
      </div>
      <router-view></router-view>
      <yd-popup class="groupInputBox" v-model="show1" position="center" width="75%">
        <div style="background-color:#fff;">
          <p class="groupTitle">群聊名称</p>
          <yd-cell-item>
            <yd-input slot="right" v-model="upGroupName" max="20" placeholder="请输入群聊名称"></yd-input>
          </yd-cell-item>
          <div class="groupBtnBox">
            <yd-button class="groupBtn" @click.native="show1 = false">取消</yd-button>
            <yd-button class="groupBtn" @click.native="updateGroupName">确定</yd-button>
          </div>
        </div>
      </yd-popup>
      <yd-popup class="groupInputBox" v-model="show2" position="center" width="75%">
        <div style="background-color:#fff;">
          <p class="groupTitle">我在本群的昵称</p>
          <yd-cell-item>
            <yd-input slot="right" v-model="groupInput" max="20" placeholder="请输入昵称"></yd-input>
          </yd-cell-item>
          <div class="groupBtnBox">
            <yd-button class="groupBtn" @click.native="show2 = false">取消</yd-button>
            <yd-button class="groupBtn" @click.native="updateGroupNickName">确定</yd-button>
          </div>
        </div>
      </yd-popup>
    </div>
  </yd-layout>
</template>

<script type="text/ecmascript-6">
import { Switch, MessageBox, Toast } from "mint-ui";
import { mapMutations, mapGetters } from "vuex";
import api from "@/api/resource.js";

export default {
  components: {
    Switchch: Switch, // switch为预留元素，这里换了个名字
    MessageBox,
    Toast
  },
  data() {
    return {
      value1: false,
      value2: true,
      title: 11,
      ydswitch1: false,
      ydswitch2: false,
      ydswitch3: true,
      groupInfo: {}, // 群信息
      accessToken: {},
      show1: false,
      show2: false,
      groupInput: "",
      upGroupName: "",
      upGroupLeaguerInfo: "",
    };
  },
  computed: {
    ...mapGetters(["chatListCache", "info"])
  },
  mounted() {
    let groupId = this.$route.params.groupId;
    if (groupId) {
      this.$dialog.loading.open("加载中...");
      this.accessToken = JSON.parse(localStorage.getItem("access_token"));
      // 群ID不为空， 就查询群的组成信息
      api
        .findGroupInformation(this, {
          groupId: groupId,
          pageNum: 1,
          pageSize: 50
        })
        .then(res => {
          let val = res.body;
          if (val.code == 200) {
            this.groupInfo = val.groupInfo;
          }
          this.$dialog.loading.close();
          //console.log(res);
        })
        .catch(err => {
          this.$dialog.loading.close();
        });
    }
  },
  computed: {
    chatRoofPlacement: {
      get() {
        return this.groupInfo.chatRoofPlacement == 0 ? false : true;
      },
      set(bool) {
        this.groupInfo.chatRoofPlacement = bool ? 1 : 0;
      }
    },
    newsInterruption: {
      get() {
        return this.groupInfo.newsInterruption == 0 ? false : true;
      },
      set(bool) {
        this.groupInfo.newsInterruption = bool ? 1 : 0;
      }
    },
    saveMailList: {
      get() {
        return this.groupInfo.saveMailList == 0 ? true : false;
      },
      set(bool) {
        this.groupInfo.saveMailList = bool ? 0 : 1;
      }
    }
  },
  methods: {
    ...mapMutations({
      setAddress: "SET_INFO"
    }),
    deleteall() {
      MessageBox.confirm("确定清空当前聊天信息?")
        .then(action => {
          this.$dialog.loading.open("清除中...");
          api
            .updateGroupByUserLog(this, {
              groupId: this.groupInfo.groupId
            })
            .then(res => {
              let val = res.body;
              if (val.code == 200) {
                // 清除缓存中的数据，
                let userChatRecordCaching = JSON.parse(
                  localStorage.getItem("userChatRecordCaching")
                );
                if (userChatRecordCaching) {
                  let groupCaching =
                    userChatRecordCaching[this.groupInfo.groupId + "_group"];
                  if (groupCaching) {
                    userChatRecordCaching[
                      this.groupInfo.groupId + "_group"
                    ] = [];
                    localStorage.setItem(
                      "userChatRecordCaching",
                      JSON.stringify(userChatRecordCaching)
                    );
                  }
                }
                let info = JSON.parse(JSON.stringify(this.info));
                info.news_number = 0
                info.latest_news = "";
                this.setAddress(info);
              }
              this.$dialog.loading.close();
            })
            .catch(err => {
              this.$dialog.loading.close();
            });
        })
        .catch(err => {
          // 用户取消操作
        });
    },
    // 解散群
    dissolutionGroup() {
      this.$dialog.loading.open("解散中...");
      api
        .dissolutionGroupByGroupId(this, {
          groupId: this.groupInfo.groupId
        })
        .then(res => {
          let val = res.body;
          if (val.code == 200) {
            debugger;
            // 清除聊天信息
            let userChatRecordCaching = JSON.parse(
              localStorage.getItem("userChatRecordCaching")
            );
            if (userChatRecordCaching) {
              let groupCaching =
                userChatRecordCaching[this.groupInfo.groupId + "_group"];
              if (groupCaching) {
                userChatRecordCaching[this.groupInfo.groupId + "_group"] = [];
                localStorage.setItem(
                  "userChatRecordCaching",
                  JSON.stringify(userChatRecordCaching)
                );
              }
            }
            // 清除聊天列表，
            let userChatListCache = JSON.parse(
              localStorage.getItem("userChatListCache")
            );
            if (userChatListCache) {
              let groupCache =
                userChatListCache[this.groupInfo.groupId + "_group"];
              if (groupCache) {
                delete userChatListCache[this.groupInfo.groupId + "_group"];
                localStorage.setItem(
                  "userChatListCache",
                  JSON.stringify(userChatListCache)
                );
              }
            }
            
            if (this.chatListCache) {
              let chatListCache = JSON.parse(JSON.stringify(this.chatListCache));
              let groupCache = chatListCache[this.groupInfo.groupId + "_group"];
              if (groupCache) {
                delete chatListCache[this.groupInfo.groupId + "_group"];
                this.setChatListCache(chatListCache);
              }
            }
            this.$router.push({
              name: `chat`,
              params:{
                refresh: true
              }
            });
          }
          this.$dialog.loading.close();
        })
        .catch(err => {
          this.$dialog.loading.close();
        });
    },
    // 修改群名称
    updateGroupName() {
      if (this.upGroupName !== this.groupInfo.groupName) {
        this.groupInfo.groupName = this.upGroupName;
        api
          .updateGroupInfo(this, {
            groupId: this.groupInfo.groupId,
            groupName: this.groupInfo.groupName
          })
          .then(res => {})
          .catch(err => {});
      }
      this.show1 = false;
    },
    // 是否可以修改群名称
    isUpdateGroupName(id) {
      if (this.accessToken.id == id) {
        this.show1 = true;
        this.upGroupName = this.groupInfo.groupName;
      }
    },
    // 修改昵称
    updateGroupNickName() {
      if (this.groupInfo.byGroupName !== this.groupInput) {
        this.groupInfo.byGroupName = this.groupInput;
        api
          .updateGroupLeaguerInfo(this, {
            groupId: this.groupInfo.groupId,
            groupName: this.groupInput,
            newsInterruption: this.groupInfo.newsInterruption,
            chatRoofPlacement: this.groupInfo.chatRoofPlacement,
            saveMailList: this.groupInfo.saveMailList
          })
          .then(res => {})
          .catch(err => {});
      }
      this.show2 = false;
    },
    //聊天置顶修改
    UpChatRoofPlacement() {
      clearTimeout(this.upGroupLeaguerInfo);
      this.upGroupLeaguerInfo = setTimeout(() => {
        api
          .updateGroupLeaguerInfo(this, {
            groupId: this.groupInfo.groupId,
            newsInterruption: this.groupInfo.newsInterruption,
            chatRoofPlacement: this.groupInfo.chatRoofPlacement,
            saveMailList: this.groupInfo.saveMailList
          })
          .then(res => {})
          .catch(err => {});
      }, 1000);
    },
    //免打扰修改
    UpNewsInterruption() {
      clearTimeout(this.upGroupLeaguerInfo);
      this.upGroupLeaguerInfo = setTimeout(() => {
        api
          .updateGroupLeaguerInfo(this, {
            groupId: this.groupInfo.groupId,
            newsInterruption: this.groupInfo.newsInterruption,
            chatRoofPlacement: this.groupInfo.chatRoofPlacement,
            saveMailList: this.groupInfo.saveMailList
          })
          .then(res => {})
          .catch(err => {});
      }, 1000);
    },
    //保存到通讯录修改
    UpSaveMailList() {
      clearTimeout(this.upGroupLeaguerInfo);
      this.upGroupLeaguerInfo = setTimeout(() => {
        api
          .updateGroupLeaguerInfo(this, {
            groupId: this.groupInfo.groupId,
            newsInterruption: this.groupInfo.newsInterruption,
            chatRoofPlacement: this.groupInfo.chatRoofPlacement,
            saveMailList: this.groupInfo.saveMailList
          })
          .then(res => {})
          .catch(err => {});
      }, 1000);
    },
    ...mapMutations({
      setChatListCache: "SET_CHAT_LIST_CACHE"
    }),
    goInfo(info) {
      this.$router.push({
        name: `addressDetail`,
        params: {
          id: info.user_id,
          groupId: info.group_id
        }
      });
    },
    back(event) {
      //this.$router.back(); // 返回上一级
      this.$router.push({
              path: `/chatroomGroup`
        });
    },
    modeShow(item) {
      return item == 0 ? true : false;
    }
  }
};
</script>

<style>
.chatroom-user {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #ebebeb;
  width: 100%;
  height: 100%;
  /*border: 1px solid red;*/
}
.chatroom-user .yd-cell-box:nth-child(2) {
  border-bottom: 0.2rem solid #eee;
}

.chatroom-user .yd-cell-left div {
  font-size: 0.3rem;
}
.chatroom-user .user {
  width: 100%;
  background-color: #fff;
  padding: 0.2rem 0.3rem;
  margin-bottom: 0.2rem;
  clear: both;
  overflow: hidden;
}
.chatroom-user .user .smallImg {
  height: 1rem;
  width: 1rem;
  border-radius: 5px;
  margin-right: 0.2rem;
}
.chatroom-user .user div {
  float: left;
  width: 1rem;
  position: relative;
  margin-right: 0.2rem;
}
.chatroom-user .user p {
  text-align: center;
  width: 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.chatroom-user .addIcon {
  width: 1rem;
  height: 1rem;
}
.group-detail-btn {
  width: 90%;
  margin: auto;
}
.groupOwner {
  position: absolute;
  right: 0;
  top: 0;
  background: #ffb203;
  color: #fff;
  width: 0.7rem !important;
}
.groupName {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 80%;
}
.groupTitle {
  font-size: 0.32rem;
  padding: 0.2rem 0.5rem;
}
.groupInputBox .yd-cell-item {
  border-bottom: 1px solid #eee;
  height: 0.9rem;
  margin-bottom: 0.2rem;
  width: 85%;
  margin: auto;
  text-align: left;
  padding: 0;
}
.groupBtnBox {
  text-align: center;
  padding: 0.1rem 0;
}
.groupBtnBox .groupBtn {
  background: transparent;
  color: #383838;
  font-size: 0.32rem;
  width: 34%;
}
.addGroup,
.jianGroup {
  width: 1rem;
  height: 1rem;
  border-radius: 5px;
  border: 1px solid #eee;
  background: #f5f5f5;
  line-height: 1rem;
  text-align: center;
}
.addGroup i,
.jianGroup i {
  font-size: 0.5rem;
  color: #8c8c8c;
}
</style>
