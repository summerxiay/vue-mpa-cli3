<template>
	<Layout id="app">
		<h1>个人资料</h1>
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
			title: '个人资料',
			meta: [
				{
					name: 'keyWords',
					content: 'keyWords'
				},
				{
					name: 'description',
					content:
						'description'
				}
			],
			link: [
				{
					rel: 'canonical',
					href: 'https://www.xxx.com/user/personal'
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
			getImgUrl: getImgUrl
		};
	}
};
</script>

<style lang="less" scoped></style>
