<template>
	<i :class="['iconfont', `icon-${type}`]"></i>
</template>

<script>
export default {
	name: 'Icon',
	props: {
		type: {
			type: String,
			default: 'setting'
		}
	}
};
</script>

<style scoped lang="less"></style>
