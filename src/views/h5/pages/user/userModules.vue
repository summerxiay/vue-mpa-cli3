<template>
	<Layout id="app">
		<dl class="user-descbox">
			<dt class="clearfix">
				<a href="/message" class="message">
					<Icon type="message" class="new" />
				</a>
				<img :src="getImgUrl('91aaae97cb262730475731ab74deb6c0', 'small')" alt="少年的夏天" />
				<h2>少年的夏天</h2>
				<a href="/user/presonal" class="clearfix">
					<i class="member-flag">Z1</i>
					<span>XXXXX</span>
					<Icon type="jump" />
				</a>
			</dt>
			<dd>
				<a href="/">
					<i class="count">1</i>
					<Icon type="notpay" />
					<p>未付款</p>
				</a>
				<a href="/">
					<i class="count">1</i>
					<Icon type="pay" />
					<p>已付款</p>
				</a>
				<a href="/">
					<i class="count">12</i>
					<Icon type="overorder" />
					<p>已完成</p>
				</a>
				<a href="/">
					<i class="count">123</i>
					<Icon type="otherpay" />
					<p>其他渠道</p>
				</a>
			</dd>
		</dl>
		<section class="user-modules">
			<a v-for="(module, m) in userModules" :key="m" :href="module.url">
				<span v-text="module.name"></span>
				<Icon type="jump" />
				<i class="count" v-if="module.count" v-text="module.count + '张'"></i>
			</a>
		</section>
	</Layout>
</template>

<script>
import Layout from 'H5/Layout.vue';
import Icon from '@/Icon.vue';
import { getImgUrl } from 'ASSETS/libs/fn';
export default {
	name: 'App',
	metaInfo() {
		return {
			title: 'hello,world!',
			meta: [
				{
					name: 'keyWords',
					content: 'hello,world!'
				},
				{
					name: 'description',
					content:
						'hello,world!'
				}
			],
			link: [
				{
					rel: 'canonical',
					href: 'https://www.xxx.com/user/me'
				}
			]
		};
	},
	components: {
		Layout,
		Icon
	},
	data() {
		return {
			getImgUrl: getImgUrl,
			userModules: [
				{
					name: '会员中心',
					url: '/memberCenter'
				},
				{
					name: '我的优惠券',
					url: '/coupon',
					count: 1
				},
				{
					name: '我的礼品卡',
					url: '/coupon',
					count: 1
				},
				{
					name: '我的晒单',
					url: '/ordershare'
				},
				{
					name: '我的收藏',
					url: '/collection'
				},
				{
					name: '在线客服',
					url: '/memberCenter'
				},
				{
					name: '收获地址',
					url: '/address'
				},
				{
					name: '设置',
					url: '/setting'
				}
			]
		};
	}
};
</script>

<style lang="less" scoped>
.user-descbox {
	padding: 50px 40px;
	border-bottom: @lineBlock 14px solid;

	dt {
		position: relative;

		.message {
			position: absolute;
			right: 0;
			top: -25px;
			z-index: 1;

			.iconfont {
				font-size: 38px;

				&.new::after {
					content: '';
					width: 12px;
					height: 12px;
					position: absolute;
					right: -1px;
					top: 6px;
					z-index: 1;
					background: @bgRed;
					border-radius: 50%;
				}
			}
		}

		img {
			width: 120px;
			height: 120px;
			float: left;
			margin-right: 30px;
			border-radius: 50%;
		}

		h2 {
			padding: 15px 0 10px 0;
			font-size: 44px;
		}

		a {
			.flex_space_between;
			justify-content: flex-start;
			font-size: 24px;
			color: @fontLightBlack;

			.member-flag {
				width: auto;
				height: 34px;
				margin-right: 5px;
				padding: 0 15px;
				background: linear-gradient(left, #fcc730, #fca421);
				color: @fontWhite;
				line-height: 34px;
				border-radius: 3px;
				font-weight: bold;
				transform: scale(0.8);
			}

			.iconfont {
				font-size: 28px;
				position: relative;
				left: -10px;
			}
		}
	}

	dd {
		.flex_space_between;
		margin-top: 70px;

		a {
			position: relative;
			flex: 1;
			color: @fontLightBlack;
			font-size: 24px;
			text-align: center;

			.count {
				.cart_count_red_h5;
				left: 56%;
				top: 8%;
			}

			.iconfont {
				color: @fontBlack;
				font-size: 70px;
			}

			p {
				padding-top: 10px;
			}
		}
	}
}

.user-modules {
	padding-left: 40px;

	a {
		display: block;
		color: @fontBlack;
		font-size: 26px;
		padding: 38px 0;
		border-bottom: @lineBorder 1px solid;

		&:last-child {
			border-bottom: none;
		}

		i {
			float: right;
			font-size: 24px;

			&.iconfont {
				margin: 0 40px 0 0px;
				font-size: 24px;
			}
		}
	}
}
</style>
