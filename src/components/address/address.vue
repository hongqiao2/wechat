<template>
  <yd-layout>
    <mt-index-list>
      <!-- <mt-cell class="top" title="" > -->
      <yd-cell-item class="addr-list" type="link" href="/address/friend">
        <img slot="icon" src="../../assets/address/newfriend.png">
        <span slot="left">新的朋友</span>
      </yd-cell-item>
      <yd-cell-item class="addr-list" type="link" href="/address/group">
        <img slot="icon" src="../../assets/address/groupchat.png">
        <span slot="left">群聊</span>
      </yd-cell-item>
      <yd-cell-item class="addr-list" type="link" href="/address/label">
        <img slot="icon" src="../../assets/address/label.png">
        <span slot="left">标签</span>
      </yd-cell-item>
      <mt-index-section v-for="(item, index) in personnelList" :index="index" :key="item.id">
        <mt-cell
          class="address-item"
          v-for="items in item"
          :key="items.id"
          :title="items.dissname"
          v-on:click.native="gotoDetail(items)"
        >
          <div class="mt-cell-wrapper">
            <img v-lazy="items.imgurl" height="40" width="40">
          </div>
        </mt-cell>
      </mt-index-section>
      <div style="height:1rem;"></div>
    </mt-index-list>
    <router-view></router-view>
  </yd-layout>
</template>

<script type="text/ecmascript-6">
import { IndexList, IndexSection, Toast, MessageBox } from "mint-ui";
import { mapMutations } from "vuex";
import api from "@/api/resource.js";
import chineseTurn from "@/api/chineseTurnEnglish.js";

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
  mounted() {
    let userinfo = JSON.parse(localStorage.getItem("access_token"));
    // 获取好友列表
    api
      .findSysUserFriendList(this, {
        id: userinfo.id
      })
      .then(res => {
        let _val = res.body;
        if (_val.code == "200") {
          let friendList = JSON.parse(_val.friendList);
          // 需要进行排序的好友列表
          let personnelList = {};
          friendList.forEach(function(item, index) {
            let userName = typeof(item.remark_name) != "undefined" ? item.remark_name : item.nick_name;
            // 判断是否是文字，判断是否是字母
            var isChinese = /^[\u4e00-\u9fa5]+$/;
            let subVal = userName.substring(0, 1);
            if (isChinese.test(subVal)) {
              let keyV = chineseTurn(subVal).substring(0, 1);
              if (!personnelList[keyV]) {
                personnelList[keyV] = [];
              }
              personnelList[keyV].push({
                id: item.griend_id,
                dissname: userName,
                imgurl: item.head_portrait
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
                id: item.griend_id,
                dissname: userName,
                imgurl: item.head_portrait
              });
              } else {
                if (!personnelList["#"]) {
                  personnelList["#"] = [];
                }
                personnelList["#"].push({
                id: item.griend_id,
                dissname: userName,
                imgurl: item.head_portrait
              });
              }
            }
          });
           this.personnelList = personnelList;
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  },
  methods: {
    gotoDetail(info) {
      this.$router.push({
        path: `/address/${info.id}`
      });
      this.setAddress(info);
    },
    ...mapMutations({
      setAddress: "SET_INFO"
    }),
    warn() {
      MessageBox({
        title: "提示",
        message: "尚未开发，还是和下面的人聊聊天吧",
        showCancelButton: true
      });
    }
  },
  data() {
    return {
      personnelList: {
      }
    };
  }
};
</script>

<style >
.addr-list {
  width: 100%;
  padding: 0.1rem 0.2rem;
  background: #fff;
  display: flex;
  align-items: center;
}
.addr-list .yd-cell-icon img {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 5px;
  margin-right: 0.2rem;
}
.addr-list span {
  font-size: 0.32rem;
  color: #464646;
}
.address-item {
  /* border-bottom: 0.2px solid #eee; */
  background-color: #fff;
  padding-left: 1.2rem;
  height: 1rem;
}
.address-item img {
  position: absolute;
  left: 0.3rem;
  top: 0.1rem;
}
.mint-cell img {
  vertical-align: middle;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 5px;
}
.mint-cell-wrapper {
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
</style>
