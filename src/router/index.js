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
import Collection from '../components/me/collection/collection'
import Album from '../components/me/album/album'
import Card from '../components/me/card/card'
import Set from '../components/me/set/set'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/chat'
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/group',
      component: PlusGroup
    },
    {
      path: '/add',
      component: PlusAdd
    },
    {
      path: '/chatroom',  // 聊天打字界面
      component: Chatroom,
      children: [
        {
          path: 'user',
          component: ChatroomUser
        },
        {
          path: 'packet',
          component: ChatroomPacket
        },
        {
          path: 'percard',
          component: ChatroomCard
        },
        {
          path: 'complain',
          component: ChatroomComplain
        },
        {
          path: 'notice',
          component: ChatroomNotice
        },
        {
          path: 'suit',
          component: ChatroomSuit
        }
      ]
    },
    {
      path: '/chat',  // 第一栏：微信
      component: Chat
    },
    {
      path: '/address',  // 第二栏：通讯录
      component: Address,
      children: [
        {
          path: ':id', // 传入不同的id,就可以跳转到不同的子路由
          component: AddressDetail,
          children: [
            {
              path: 'more',
              component: AddressMore
            },
            {
              path: 'dset',
              component: AddressSet
            }
          ]
        }
      ]
    },
    {
      path: '/find',  // 第三栏：发现
      component: Find,
      children: [
        {
          path: 'friendcircle',
          component: FriendCircle
        },
        {
          path: 'scan',
          component: Scan
        },
        {
          path: 'shake',
          component: Shake
        }
      ]
    },
    {
      path: '/me',  // 第四栏：我
      component: Me,
      children: [
        {
          path: 'money',
          component: Money
        },
        {
          path: 'collection',
          component: Collection
        },
        {
          path: 'album',
          component: Album
        },
        {
          path: 'card',
          component: Card
        },
        {
          path: 'set',
          component: Set
        }
      ]
    }
  ]
})
