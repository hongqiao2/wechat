<template>
	<div class="me">
		<div class="me-wrapper" ref="wrapper">
			<div class="me-content">
				<div class="aboutme" v-on:click="goPersonal">
					<img class="aboutme-img" v-bind:src="userInfo.headPortrait" ref="aboutme" slot="left">
					<div slot="left">
						<h2>{{userInfo.nickName}}</h2>
						<p>微聊号：{{userInfo.username ? userInfo.username : "暂未设置"}}</p>
					</div>
					<div class="yd-cell-right yd-cell-arrow">
						<img src="../../assets/me/code.png" class="aboutme-code">
					</div>
				</div>
				<router-link tag="div" class="me-list" to="/me/bill">
					<img class="money-img" src="../../assets/me/packet.png" height="380" width="380" />
					<span class="money-name">支付宝红包</span>
				</router-link>
				<router-link tag="div" class="me-list me-spacing" to="/me/money">
					<img class="money-img" src="../../assets/me/wallet.png" height="380" width="380" />
					<span class="money-name">云钱包</span>
				</router-link>

				<router-link tag="div" class="me-list" :to="personalAuthentication">
					<img class="collection-img" src="../../assets/me/approve.png" height="32" width="32" />
					<span class="collection-name">个人认证</span>
				</router-link>
				<router-link tag="div" class="me-list" to="/me/collection">
					<img class="collection-img" src="../../assets/me/collect.png" height="32" width="32" />
					<span class="collection-name">收藏</span>
				</router-link>

				<router-link tag="div" class="me-list me-spacing" to="/me/privacy">
					<img class="photo-img" src="../../assets/me/identity.png" height="32" width="32" />
					<span class="photo-name">隐私</span>
				</router-link>
				<router-link tag="div" class="me-list me-spacing" to="/me/about">
					<img class="card-img" src="../../assets/me/about.png" height="32" width="32" />
					<span class="card-name">关于微聊</span>
				</router-link>
				<router-link tag="div" class="me-list me-spacing" to="/me/help">
					<img class="card-img" src="../../assets/me/help.png" height="32" width="32" />
					<span class="card-name">帮助与反馈</span>
				</router-link>
				<router-link tag="div" class="me-list me-spacing" to="/me/set">
					<img class="setup-img" src="../../assets/me/set.png" height="32" width="32" />
					<span class="setup-name">设置</span>
				</router-link>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
	import { MessageBox } from 'mint-ui'
	import BScroll from 'better-scroll'

	export default {
		components: {
			BScroll,
			MessageBox
		},
		data() {
			return {
				height: 60,
				codeheight: 30,
				width: 60,
				codewidth: 30,
				userInfo: {},
				personalAuthentication: "" //个人认证跳转路径
			};
		},
		mounted() {
			let userInfo = localStorage.getItem("access_token");
			this.userInfo = JSON.parse(userInfo);
			let user = this.userInfo;
			if(user.idNumber && user.realName) {
				this.personalAuthentication = "me/money/account/${0}";
			} else {
				// 如果没有身份信息
				this.personalAuthentication = "/me/auth"
			}
			this.$nextTick(() => {
				this.scroll = new BScroll(this.$refs.wrapper, {
					// better-scroll 会将点击事件去掉，要在这里开启，同时点击在PC 会被执行两次，要在这里控制
					click: true
				})
			})
		},
		methods: {
			warn() {
				this.$toast({
					message: '尚未添加表情包',
					duration: 1500
				})
			},
			goPersonal() {
				this.$router.push({
					path: `/me/personal`
				})
			}
		}
	}
</script>

<style scoped>
	.me {
		position: fixed;
		top: 50px;
		bottom: 50px;
		left: 0;
		right: 0;
		z-index: 99;
		background-color:#f9f9f9;
	}
	
	.me-wrapper {
		/*border: 1px solid red;*/
		height: 100%;
		overflow: hidden;
	}
	
	.me-content {
		/*border: 1px solid blue;*/
		overflow: hidden;
	}
	
	.aboutme {
		position: relative;
		height: 2rem;
		padding: 0.1rem 0.2rem;
		background-color: #fff;
		display: flex;
		align-items: center;
		margin-bottom: 0.2rem;
	}
	
	.aboutme .aboutme-img {
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 5px;
		margin-right: 0.2rem;
	}
	
	.aboutme h2 {
		font-size: 0.4rem;
		margin-bottom: 0.1rem;
	}
	
	.aboutme p {
		font-size: 0.3rem;
		color: #606060;
	}
	
	.me-list {
		display: flex;
		align-items: center;
		left: 0;
		height: 1rem;
		padding: 0.2rem 0.3rem;
		font-size: 0.32rem;
		background-color: #fff;
		border-bottom: 1px solid #eee;
	}
	
	.me-spacing {
		margin-bottom: 0.2rem;
	}
	
	.emoticon {
		border-bottom: 0;
	}
	
	.setup {
		display: flex;
		align-items: center;
		left: 0;
		height: 20px;
		padding: 8px 10px;
		margin-top: 20px;
		background-color: #fff;
	}
	
	.money-img,
	.collection-img,
	.photo-img,
	.card-img,
	.emoticon-img,
	.setup-img {
		height: 0.6rem;
		width: 0.6rem;
	}
	
	.yd-cell-right img {
		width: 0.5rem;
		height: 0.5rem;
	}
</style>
