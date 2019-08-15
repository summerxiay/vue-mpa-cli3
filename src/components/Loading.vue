<template>
	<p v-if="iShow" class="loading">
		<Icon type="loading" />
	</p>
</template>

<script>
import Icon from '@/Icon.vue';
export default {
	name: 'Loading',
	props: {
		iShow: {
			type: Boolean,
			default: false
		}
	},
	components: {
		Icon
	}
};
</script>

<style scoped lang="less">
.loading {
	margin: 50px 0;
	height: 100px;
	line-height: 100px;
	text-align: center;
	font-size: 26px;

	.iconfont {
		font-size: 50px;
		color: @fontBlack;
		opacity: 0.3;
	}
}
</style>
