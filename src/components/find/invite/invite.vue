<template>
  <transition name="slide">
    <div class="chatroom-card" ref="content">
      <yd-navbar title="邀请手机联系人">
        <router-link to="#" slot="left">
          <yd-navbar-back-icon @click.native="$router.back(-1)"></yd-navbar-back-icon>
        </router-link>
        <!-- <p slot="right">完成({{checkbox1.length}})</p> -->
      </yd-navbar>
      <yd-search v-model="value1" :on-submit="submitHandler"></yd-search>
      <mt-index-list>
        <mt-index-section v-for="(item, index) in personnelList" :key="item.id" :index="item.group">
          <mt-cell
            class="address-item"
            v-for="info in item.info"
            :key="info.id"
            :title="info.dissname"
          >
            <div class="mt-cell-wrapper">
              <yd-checkbox-group v-model="checkbox1">
                <yd-checkbox :val="info.value" shape="circle"></yd-checkbox>
              </yd-checkbox-group>
              <img v-lazy="info.imgurl" height="40" width="40">
            </div>
          </mt-cell>
        </mt-index-section>
        <div style="height: 0.9rem;"></div>
      </mt-index-list>

      <div class="invite-bottom">邀请使用微聊({{checkbox1.length}})</div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { IndexList, IndexSection, Toast, MessageBox } from "mint-ui";
import { mapMutations } from "vuex";
import chineseTurn from '@/api/chineseTurnEnglish.js'

export default {
  components: {
    IndexList,
    IndexSection,
    Toast,
    MessageBox
  },
  mounted() {
    // 获取用户手机通讯录
    let mailList = JSON.parse(localStorage.getItem("mailList"));
    if (!mailList) {
      this.getMailList();
    }
  },
  created() {
    // console.log(this.personnelList)
  },
  methods: {
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
    },
    // 获取手机通讯录
    getMailList() {
      let that = this;
      plus.contacts.getAddressBook(
        plus.contacts.ADDRESSBOOK_PHONE,
        function(addressbook) {
          addressbook.find(
            ["displayName", "phoneNumbers"],
            function(contacts) {
              let mailList = {};
              contacts.forEach(function(item, index) {
                let name = item.displayName
                  ? item.displayName
                  : item.phoneNumbers[0].value; // 联系人名称
                let phoneNumbers = mailList[name]; // 是否有联系人
                if (phoneNumbers) {
                  item.phoneNumbers.forEach(function(item, index) {
                    if (item.value) {
                      phoneNumbers[item.value] = "";
                    }
                  });
                } else {
                  let phoneNumbers = {};
                  phoneNumbers["name"] = name;
                  item.phoneNumbers.forEach(function(item, index) {
                    if (item.value) {
                      phoneNumbers[item.value] = "";
                    }
                  });
                  mailList[name] = phoneNumbers;
                }
              });
              let list = that.personnelList;
              let mailLists = [];
              for (let key in mailList) {
                for (let ikey in mailList[key]) {
                  if (ikey != "name") {
                    mailLists.push(ikey.replace("+86", "").replace(/\s/g, ""));
                    // 判断是否是文字，判断是否是字母
                     var isChinese = /^[\u4e00-\u9fa5]+$/;
                     let subVal = key.substring(0,1);
                     if(isChinese.test(subVal)){
                       let keyV = chineseTurn(subVal).substring(0,1);
                       if(!list[keyV]) {
                         list[keyV] = [];
                       }
                       list[keyV].push({
                         dissname: key,
                         phone: ikey
                       });
                     }else{
                       // 判读是否是英文字母
                      isChinese = /^[A-Za-z]/;
                      if(isChinese.test(subVal)){
                        let keyV = subVal.toUpperCase();
                        if(!list[keyV]){
                          list[keyV] = [];
                        }
                        list[keyV].push({
                         dissname: key,
                         phone: ikey
                       });
                      }else{
                        if(!list["#"]){
                          list["#"] = [];
                        }
                        list["#"].push({
                         dissname: key,
                         phone: ikey
                       });
                      }
                     }
                  }
                }
              }
              localStorage.setItem("userIphones", JSON.stringify(mailLists));
              that.personnelList = list;
            },
            function() {},
            { multiple: true }
          );
          // 可通过addressbook进行通讯录操作
        },
        function(e) {}
      );
    }
  },
  data() {
    return {
      value1: "",
      checkbox1: ["0"],
      personnelList: {
      
      }
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
.chatroom-card {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 200;
  background-color: #ebebeb;
}
.address-item {
  /* border-bottom: 0.2px solid #eee; */
  background-color: #fff;
  padding-left: 1.8rem;
  height: 1rem;
}
.address-item img {
  position: absolute;
  left: 0.9rem;
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
.invite-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  background: #f8f8f8;
  text-align: center;
  width: 100%;
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.32rem;
  z-index: 111;
  color: #8d66fa;
}
</style>
