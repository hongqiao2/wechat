<template>
  <div class="contact">
    <div class="content-wrapper" ref="wrapper">
      <yd-navbar @click="back" slot="navbar" title="手机联系人">
        <router-link to="/find" slot="left">
          <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
      </yd-navbar>
      
      <yd-cell-item v-for="(item, index) in userInfoList" :key="item.id">
        <img slot="icon" :src="item.headPortrait">
        <span slot="left">{{item.realName ? item.realName : nickName}}</span>
        <yd-button slot="right" bgcolor="#8D66FA" color="#FFF">{{item.isFriend ? "已添加" : "添加"}}</yd-button>
      </yd-cell-item>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import api from "@/api/resource.js";

export default {
  components: {},
  data() {
    return {
      userInfoList: []
    };
  },
  mounted() {
    let userIphone = JSON.parse(localStorage.getItem("userIphones"));
    if (userIphone == null) {
      userIphone = this.getMailList();
    }
    // 根据手机号码查询所有的联系人
    let userInfo = JSON.parse(localStorage.getItem("access_token"));
    api
      .findUsersByIphones(this, {
        params: {
          "id": userInfo.id,
          "iphones": JSON.stringify(userIphone)
        }
      })
      .then(res => {
        let val = res.body;
        if(val.code == "200"){
          if(val.userInfo){
            this.userInfo = val.userInfo;
          }
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  },
  methods: {
    back(event) {
      this.$router.back(); // 返回上一级
    },
    goBlacklist() {
      this.$router.push({
        path: `/me/privacy/blacklist`
      });
    },
    // 获取手机通讯录
    getMailList() {
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
              let mailLists = [];
              for (let key in mailList) {
                for (let ikey in mailList[key]) {
                  if (ikey != "name") {
                    mailLists.push(ikey.replace("+86", "").replace(/\s/g, ""));
                  }
                }
              }
              mailLists = JSON.stringify(mailLists);
              localStorage.setItem("userIphones", mailLists);
              return mailLists;
            },
            function() {},
            { multiple: true }
          );
          // 可通过addressbook进行通讯录操作
        },
        function(e) {}
      );
    }
  }
};
</script>

<style>
.contact {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 203;
  background-color: #f9f9f9;
}
.contact .yd-cell-icon img {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 5px;
}
.contact .yd-cell-item {
  background: #fff;
  padding: 0.1rem 0 0.1rem 0.2rem;
}
.contact .yd-btn {
  height: 0.5rem;
}
</style>
