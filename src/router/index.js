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
import AddressFriend from '../components/address/address-friend/address-friend'
import AddressLabel from '../components/address/address-label/address-label'
import LabelEdit from '../components/address/label-edit/label-edit'
import GroupChat from '../components/address/group-chat/group-chat'
import GroupDetail from '../components/address/group-chat/group-detail/group-detail'
import FriendCircle from '../components/find/friend-circle/friend-circle'
import FriendAlbum from '../components/find/friend-circle/album/album'
import MsgList from '../components/find/friend-circle/msg-list/msg-list'
import Scan from '../components/find/scan/scan'
import Shake from '../components/find/shake/shake'
import Contact from '../components/find/contact/contact'
import Invite from '../components/find/invite/invite'
import ChatroomUser from '../components/chatroom/chatroom-user/chatroom-user'
import ChatroomPacket from '../components/chatroom/chatroom-packet/chatroom-packet'
import ChatroomCard from '../components/chatroom/chatroom-card/chatroom-card'
import ChatroomComplain from '../components/chatroom/chatroom-complain/chatroom-complain'
import ChatroomNotice from '../components/chatroom/chatroom-notice/chatroom-notice'
import ChatroomSuit from '../components/chatroom/chatroom-suit/chatroom-suit'
import AddressMore from '../components/address/address-detail/address-more/address-more'
import AddressSet from '../components/address/address-detail/address-set/address-set'
import AddressRemark from '../components/address/address-detail/address-remark/address-remark'
import AddFriends from '../components/address/address-detail/add-friends/add-friends'
import Money from '../components/me/money/money'
import MoneyRecharge from '../components/me/money/money-recharge/money-recharge'
import MoneyWithdraw from '../components/me/money/money-withd/money-withd'
import MoneyPacket from '../components/me/money/money-packet/money-packet'
import MoneyAccount from '../components/me/money/money-account/money-account'
import MoneyRecord from '../components/me/money/money-trecord/money-trecord'
import MoneySafety from '../components/me/money/money-safety/money-safety'
import AmendPwd from '../components/me/money/amend-pwd/amend-pwd'
import FindPwd from '../components/me/money/find-pwd/find-pwd'
import BankSet from '../components/me/money/bank-set/bank-set'
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
  // mode: 'history',
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
      name: 'chat',
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
          path: 'friend',
          component: AddressFriend
        },
        {
          path: 'group',
          component: GroupChat,
          children: [
            {
              path: 'groupdetail',
              component: GroupDetail
            }
          ]
        },
        {
          path: 'label',
          component: AddressLabel
        },
        {
          path: 'labeledit',
          component: LabelEdit
        },
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
            },
            {
              path: 'remark',
              meta: {
                navShow: false,
                menuShow: false
              },
              component: AddressRemark
            },
            {
              path: 'addfriend',
              meta: {
                navShow: false,
                menuShow: false
              },
              component: AddFriends
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
          component: FriendCircle,
          children: [
            {
              path: 'falbum',
              meta: {
                navShow: false,
                menuShow: false
              },
              component: FriendAlbum
            },
            {
              path: 'msglist',
              meta: {
                navShow: false,
                menuShow: false
              },
              component: MsgList
            }
          ]
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
          path: 'contact',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: Contact
        },
        {
          path: 'shake',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: Shake
        },
        {
          path: 'invite',
          meta: {
            navShow: false,
            menuShow: false
          },
          component: Invite
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
              path: 'withdraw',
              component: MoneyWithdraw
            },
            {
              path: 'packet',
              component: MoneyPacket
            },
            {
              path: 'account/:type',
              // path: 'account',
              component: MoneyAccount
            },
            {
              path: 'moneyadd',
              component: MoneyAdd
            },
            {
              path: 'moneypwd',
              component: MoneyPwd
            },
            {
              path: 'bankset',
              component: BankSet
            },
            {
              path: 'trecord',
              component: MoneyRecord
            },
            {
              path: 'safety',
              component: MoneySafety
            },
            {
              path: 'amendpwd',
              component: AmendPwd
            },
            {
              path: 'findpwd',
              component: FindPwd
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
                  path: 'accountpwd/:type',
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
