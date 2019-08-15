<template>
	<transition name="fade">
		<div :class="['message', type, { web: isWeb() }]" v-show="show">
			<Icon v-if="type === 'loading'" type="loading" />
			<span v-if="text" class="text">{{ text }}</span>
		</div>
	</transition>
</template>

<script>
import Icon from '@/Icon.vue';
import { isWeb } from 'ASSETS/libs/fn';
export default {
	name: 'message',
	props: {
		type: {
			type: String,
			default: 'info',
			validator: val => ['loading', 'info', 'success', 'warning', 'error'].includes(val)
			//['loading', 'info', 'success', 'warning', 'error'] 表示type只接收这五个字符串作为参数传入message组件
		},
		text: {
			type: String,
			default: ''
		},
		show: {
			type: Boolean,
			default: false
		}
	},
	components: {
		Icon
	},
	data() {
		return {
			isWeb: isWeb
		};
	}
};
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.message {
	position: fixed;
	top: 60%;
	left: 50%;
	transform: translateX(-50%);
	max-width: 400px;
	padding: 20px 32px;
	text-align: center;
	color: @fontWhite;
	background: rgba(0, 0, 0, 0.8);
	font-size: 24px;
	line-height: 1.5;
	border-radius: 4px;
	z-index: 1000;

	&.web {
		top: 50%;
		transform: translate(-50%, -50%);
		max-width: 300px;
		padding: 10px 16px;
		font-size: 14px;
	}

	&.loading {
		background: none;
		padding: 0;
		line-height: 1;
		top: 50%;
		transform: translate(-50%, -50%);

		.iconfont {
			font-size: 50px;
			color: @fontBlack;
			opacity: 0.3;
		}
	}

	&.info,
	&.success {
		color: @fontWhite;
	}

	&.error {
		color: red;
	}

	&.warning {
		color: yellow;
	}
}
</style>
