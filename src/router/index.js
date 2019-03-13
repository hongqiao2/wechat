import Vue from 'vue'
import Router from 'vue-router'
import Chat from '../components/chat/chat'
import PlusGroup from '../components/plus/plus-group/plus-group'
import PlusAdd from '../components/plus/plus-add/plus-add'
import Address from '../components/address/address'
import Find from '../components/find/find'
import Me from '../components/me/me'
import Chatroom from '../components/chatroom/chatroom'
import Search from '../components/search/search'
import AddressDetail from '../components/address/address-detail/address-detail'
import FriendCircle from '../components/find/friend-circle/friend-circle'
import Scan from '../components/find/scan/scan'
import Shake from '../components/find/shake/shake'
import ChatroomUser from '../components/chatroom/chatroom-user/chatroom-user'
import ChatroomPacket from '../components/chatroom/chatroom-packet/chatroom-packet'
import ChatroomCard from '../components/chatroom/chatroom-card/chatroom-card'
import ChatroomComplain from '../components/chatroom/chatroom-complain/chatroom-complain'
import ChatroomNotice from '../components/chatroom/chatroom-notice/chatroom-notice'
import ChatroomSuit from '../components/chatroom/chatroom-suit/chatroom-suit'
import AddressMore from '../components/address/address-detail/address-more/address-more'
import AddressSet from '../components/address/address-detail/address-set/address-set'
import Money from '../components/me/money/money'
import MoneyRecharge from '../components/me/money/money-recharge/money-recharge'
import MoneyAdd from '../components/me/money/money-add/money-add'
import MoneyPwd from '../components/me/money/money-pwd/money-pwd'
import Collection from '../components/me/collection/collection'
import CollectDetail from '../components/me/collection/collect-detail/collect-detail'
import Auth from '../components/me/auth/auth'
import Privacy from '../components/me/privacy/privacy'
import PrivacyBlacklist from '../components/me/privacy/privacy-blacklist/privacy-blacklist'
import About from '../components/me/about/about'
import Help from '../components/me/help/help'
import HelpDetail from '../components/me/help/help-detail/help-detail'
import Album from '../components/me/album/album'
import Bill from '../components/me/bill/bill'
import BillRecord from '../components/me/bill/bill-record/bill-record'
import Card from '../components/me/card/card'
import SetUp from '../components/me/set/set'
import SetBind from '../components/me/set/set-bind/set-bind'
import SetRemind from '../components/me/set/set-remind/set-remind'
import SetAccount from '../components/me/set/set-account/set-account'
import AccountPwd from '../components/me/set/set-account/account-pwd/account-pwd'
import Personal from '../components/me/personal/personal'
import PersonalName from '../components/me/personal/personal-name/personal-name'
import PersonalSign from '../components/me/personal/personal-sign/personal-sign'
import PersonalHobby from '../components/me/personal/personal-hobby/personal-hobby'
import Login from '../components/login/login'
import LoginPwd from '../components/login/login-pwd/login-pwd'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      meta: {
        navShow: true,
        menuShow: true
      },
      redirect: '/chat'
    },
    {
      path: '/search',
      meta: {
        navShow: false,
        menuShow: false
      },
      component: Search
    },
    {
      path: '/group',
      meta: {
        navShow: false,
        menuShow: false
      },
      component: PlusGroup
    },
    {
      path: '/add',
      meta: {
        navShow: false,
        menuShow: false
      },
      component: PlusAdd
    },
    {
      path: '/chatroom',  // 聊天打字界面
      meta: {
        navShow: false,
        menuShow: false
      },
      component: Chatroom,
      children: [
        {
          path: 'user',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: ChatroomUser
        },
        {
          path: 'packet',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: ChatroomPacket
        },
        {
          path: 'percard',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: ChatroomCard
        },
        {
          path: 'complain',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: ChatroomComplain
        },
        {
          path: 'notice',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: ChatroomNotice
        },
        {
          path: 'suit',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: ChatroomSuit
        }
      ]
    },
    {
      path: '/chat',  // 第一栏：微信
      meta: {
        navShow: true,
        menuShow: true
      },
      component: Chat
    },
    {
      path: '/address',  // 第二栏：通讯录
      meta: {
        navShow: true,
        menuShow: true
      },
      component: Address,
      children: [
        {
          path: ':id', // 传入不同的id,就可以跳转到不同的子路由
          meta: {
            navShow: false,
            menuShow: false
          },
          component: AddressDetail,
          children: [
            {
              path: 'more',
              meta: {
                navShow: false,
                menuShow: false
              },
              component: AddressMore
            },
            {
              path: 'dset',
              meta: {
                navShow: false,
                menuShow: false
              },
              component: AddressSet
            }
          ]
        }
      ]
    },
    {
      path: '/find',  // 第三栏：发现
      meta: {
        navShow: true,
        menuShow: true
      },
      component: Find,
      children: [
        {
          path: 'friendcircle',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: FriendCircle
        },
        {
          path: 'scan',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: Scan
        },
        {
          path: 'shake',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: Shake
        }
      ]
    },
    {
      path: '/me',  // 第四栏：我
      meta: {
        navShow: true,
        menuShow: true
      },
      component: Me,
      children: [
        {
          path: 'personal',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: Personal,
          children: [
            {
              path: 'Pname',
              component: PersonalName
            },
            {
              path: 'sign',
              component: PersonalSign
            },
            {
              path: 'hobby',
              component: PersonalHobby
            }
          ]
        },
        {
          path: 'money',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: Money,
          children: [
            {
              path: 'recharge',
              component: MoneyRecharge
            },
            {
              path: 'moneyadd',
              component: MoneyAdd
            },
            {
              path: 'moneypwd',
              component: MoneyPwd
            }
          ]
        },
        {
          path: 'collection',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: Collection,
          children: [
            {
              path: 'coDetail',
              component: CollectDetail
            }
          ]
        },
        {
          path: 'auth',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: Auth
        },
        {
          path: 'privacy',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: Privacy,
          children: [
            {
              path: 'blacklist',
              component: PrivacyBlacklist
            }
          ]
        },
        {
          path: 'about',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: About
        },
        {
          path: 'help',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: Help,
          children: [
            {
              path: 'hedetail',
              component: HelpDetail
            }
          ]
        },
        {
          path: 'album',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: Album
        },
        {
          path: 'bill',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: Bill,
          children: [
            {
              path: 'record',
              component: BillRecord
            }
          ]
        },
        {
          path: 'card',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: Card
        },
        {
          path: 'set',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: SetUp,
          children: [
            {
              path: 'bind',
              component: SetBind
            },
            {
              path: 'remind',
              component: SetRemind
            },
            {
              path: 'account',
              component: SetAccount,
              children: [
                {
                  path: 'accountpwd',
                  component: AccountPwd
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      meta: {
        navShow: false,
        menuShow: false
      },
      component: Login,
      children: [
        {
          path: 'pwd',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: LoginPwd
        }
      ]
    }
  ]
})
