import Icon from '@/Icon.vue';
import { getImgUrl, deepCopy, parseQueryString, scrollTo } from 'ASSETS/libs/fn';
export default {
    name: 'App',
    metaInfo() {
        return {
            title: this.seoTitle,
            meta: [
                {
                    name: 'keyWords',
                    content: '详情页'
                },
                {
                    name: 'description',
                    content: '描述'
                }
            ],
            link: [{
                rel: 'canonical',
                href: `https://www.xxx.com/item/1234`
            }]
        }
    },
	components: {
        Icon
	},
	data() {
		return {
			
		};
    },
    computed: {
        
    },
	mounted() {
        
    },
	methods: {
        
	}
};