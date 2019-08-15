import axios from 'axios'
import { filterNull } from './fn'

const isProduction = process.env.NODE_ENV === 'production';

// 只创建一次实例
const service = axios.create({
    // 设置超时时间
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
})

/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
/* service.interceptors.request.use(config => {
    const token = getCookie('_se');
    console.log(document.cookie)
    config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    if (token) config.params = {'token': token}; //后台接收的参数，后面我们将说明后台如何接收
    return config
}, (error) => {
    return Promise.reject(error)
}) */

/**
 * @author xiayong
 * @description 根据生产环境和开发环境配置request的url是否加上api，生产环境不加，开发环境加，然后在配置文件里根据proxy进行重定向，如果用mock地址的话，在链接前面加上'/yapi'
 * @param {String} url 必填
 * @returns {String} 返回对应的request url
 */
export const requestUrl = url => {
    let isMock = url.indexOf('/yapi') !== -1;
    let prodUrl = isMock ? url.replace('/yapi', 'https://api.zaozuo.com') : 'https://api.zaozuo.com' + url;
    return isProduction ? prodUrl : isMock ? url : `/api${url}`;
}

/**
 * @author xiayong
 * @description   发送请求(sucess和failure这两个参数，是传递过来的两个方法)
 * @param  {String} method 必填 get|post|put|delete
 * @param  {String} url 必填
 * @param  {Object} params 选填 请求参数
 */
export const handleRequest = (method, url = '', params = null) => {
    return new Promise((resolve, reject) => {
        let _method = method.toUpperCase()
        if (params) {
            params = filterNull(params)
        }
        service.request({
            method: _method,
            url: requestUrl(url),
            data: _method === 'POST' || _method === 'PUT' ? params : null,
            params: _method === 'GET' || _method === 'DELETE' ? params : null
        }).then(res => {
            if (res.status === 200) {
                return resolve(res.data);
            } else {
                console.log(JSON.stringify(res.data));
                return reject(res);
            }
        }).catch(err => {
            let res = err.response;
            if (res) {
                // 响应不是 2 开头的情况
                return reject(err);
            } else {
                // 请求超时状态
                if (err.message.includes('timeout')) {
                    console.log('超时了');
                } else {
                    // 可以展示断网组件
                    console.log('断网了');
                }
                return;
            }
        })
    })
}
// 上传文件
export const uploadFile = formData => {
    const res = service.request({
        method: 'post',
        url: '/upload', // 可弄成参数
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return res;
}