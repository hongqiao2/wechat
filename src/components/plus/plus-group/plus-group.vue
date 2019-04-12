<template>
  <transition name="slide">
    <div class="group" ref="content">
      <yd-navbar title="发起群聊">
        <router-link to @click.native="$router.back(-1)" slot="left">
          <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
        <p slot="right" @click="createGuoup">完成({{checkbox1.length}})</p>
      </yd-navbar>
      <yd-search v-model="value1" :on-submit="submitHandler"></yd-search>
      <mt-index-list>
        <mt-index-section v-for="(item, index) in personnelList" :index="index" :key="item.id">
          <!-- :key="item.id" 
          :index="item.group"-->
          <mt-cell
            class="address-item"
            v-for="items in item"
            :key="items.id"
            :title="items.dissname"
          >
            <div class="mt-cell-wrapper">
              <yd-checkbox-group v-model="checkbox1">
                <yd-checkbox :val="items.id" shape="circle"></yd-checkbox>
              </yd-checkbox-group>
              <img v-lazy="items.imgurl" height="40" width="40">
            </div>
          </mt-cell>
          <!-- <mt-cell 
                class="address-item" 
                v-for="info in item.info" 
                :key="info.id" 
                :title="info.dissname"
                >
                <div class="mt-cell-wrapper">
                    <yd-checkbox-group v-model="checkbox1"><yd-checkbox :val="info.value" shape="circle"></yd-checkbox></yd-checkbox-group>
                    <img v-lazy="info.imgurl" height="40" width="40" />
                </div> 
          </mt-cell>-->
        </mt-index-section>
      </mt-index-list>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { IndexList, IndexSection, Toast, MessageBox } from "mint-ui";
import { mapGetters, mapMutations } from "vuex";
import api from "@/api/resource.js";
export default {
  components: {
    IndexList,
    IndexSection,
    Toast,
    MessageBox
  },
  created() {
    // console.log(this.personnelList)
  },
  computed: {
    ...mapGetters([
      // 拿到info的状态
      "userFriendList"
    ])
  },
  mounted() {
    this.accessToken = JSON.parse(localStorage.getItem("access_token"));
    let userFriendList = this.userFriendList;
    let personnelList = {};
    for (let key in userFriendList) {
      let userName =
        userFriendList[key].remark_name || userFriendList[key].nick_name;
      var isChinese = /^[\u4e00-\u9fa5]+$/;
      let subVal = userName.substring(0, 1);
      if (isChinese.test(subVal)) {
        let keyV = chineseTurn(subVal).substring(0, 1);
        if (!personnelList[keyV]) {
          personnelList[keyV] = [];
        }
        personnelList[keyV].push({
          id: userFriendList[key].chat_bject,
          dissname: userName,
          imgurl: userFriendList[key].head_portrait
        });
      } else {
        // 判读是否是英文字母
        isChinese = /^[A-Za-z]/;
        if (isChinese.test(subVal)) {
          let keyV = subVal.toUpperCase();
          if (!personnelList[keyV]) {
            personnelList[keyV] = [];
          }
          personnelList[keyV].push({
            id: userFriendList[key].chat_bject,
            dissname: userName,
            imgurl: userFriendList[key].head_portrait
          });
        } else {
          if (!personnelList["#"]) {
            personnelList["#"] = [];
          }
          personnelList["#"].push({
            id: userFriendList[key].chat_bject,
            dissname: userName,
            imgurl: userFriendList[key].head_portrait
          });
        }
      }
    }
    this.personnelList = personnelList;
  },
  methods: {
    // 创建群聊， 如果所选人数少于两个，不创建
    createGuoup() {
      let checkGroupList = this.checkbox1;
      if (checkGroupList.length < 2) {
        this.$dialog.toast({
          mes: "建群成员必须大于两人",
          icon: "error",
          timeout: 1500
        });
      }
      this.$dialog.loading.open("创建中...");
      // api 调用
      api.saveSysUserGroup(this, {
        groupMember: JSON.stringify(checkGroupList)
      }).then( res => {
        let _val = res.body;
        if(_val.code == 200){
          // 跳转到聊天列表
          let sug = _val.sug;
          this.setAddress(_val.chatList);
          this.$router.push({
              path: `/chatroomGroup`
          });
        }
        this.$dialog.loading.close();
      }).catch( err => {
        this.$dialog.loading.close();
        console.log(err)
      })
    },

    ...mapMutations({
      setAddress: "SET_INFO"
    }),
    //   gotoChat (info) {
    //     this.$router.push({
    //       path: `/chatroom`
    //     })
    //   },
    submitHandler(value) {
      console.log(this.personnelList);
      this.personnelList = this.personnelList.filter(item => {
        //   console.log(item)
        return item.indexOf(value) !== -1;
      });
      // this.$dialog.toast({mes: `搜索：${value}`})
    }
  },
  data() {
    return {
      value1: "",
      checkbox1: [], // 创建群聊被选人数组
      personnelList: {},
      accessToken: {}
    };
  }
};
</script>

<style>
.yd-checkbox-text {
  color: transparent;
}
.yd-checkbox > input[type="checkbox"]:checked + .yd-checkbox-icon {
  color: #956eff !important;
}
.yd-checkbox {
  display: inline-block;
  padding-right: 10px;
  position: absolute;
  left: 0.3rem;
  top: 0.3rem;
}
.yd-navbar-item p {
  color: #8d66fa;
  font-size: 0.28rem;
}
.group {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 200;
  background-color: #ebebeb;
}
.group .address-item {
  background-color: #fff;
  padding-left: 1.8rem;
  height: 1rem;
  padding-left: 1.7rem;
}
.group .address-item img {
  position: absolute;
  left: 0.9rem;
  top: 0.1rem;
}
.group .mint-cell img {
  vertical-align: middle;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 5px;
}
.group .mint-cell-wrapper {
  background-image: -webkit-linear-gradient(
    top,
    #eee,
    #eee 50%,
    transparent 50%
  );
  background-image: linear-gradient(180deg, #eee, #eee 50%, transparent 50%);
}
.mint-indexlist-nav {
  background: transparent;
  border-left: none;
}
.mint-indexlist-content {
  margin: 0 !important;
}
.group .yd-input > input {
  text-align: left;
}
</style>
