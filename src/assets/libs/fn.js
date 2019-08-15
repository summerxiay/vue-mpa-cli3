import api from 'API';
export {uploadFile, requestUrl} from './api';
/**
 * @author xiayong
 * @description 判断参数类型，对返回的参数类型值进行小写处理
 * @param {*} obj 必填
 * @returns {String} 返回判断之后小写化的参数类型
 */
export function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

/**
 * @author xiayong
 * @description 对请求传递的参数对象进行json序列化过滤
 * @param {Object} 必填
 * @returns {Json} 返回序列化过滤之后的json数据
 */
export function filterNull(b) {
    for (let key in b) {
        if (b.hasOwnProperty(key)) {
            if (b[key] === null) {
                delete b[key]
            }
            if (toType(b[key]) === 'string') {
                b[key] = b[key].trim()
            } else if (toType(b[key]) === 'object') {
                b[key] = filterNull(b[key])
            } else if (toType(b[key]) === 'array') {
                b[key] = filterNull(b[key])
            }
        }
    }
    return b;
}

/**
 * @author xiayong
 * @description 获取到的md5码组装成对应的url链接
 * @param {String} md5 必填
 * @param {String} size 选填 small/origin
 * @returns {String} 返回生成的url链接
 */
export function getImgUrl(md5, size) {
    return size ? `//img.zaozuo.com/${md5}@!${size}` : `//img.zaozuo.com/${md5}`;
}

/**
 * @author xiayong
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object} {a: 1, b: 2}
 */
export function parseQueryString(url = window.location.href) {
    var search = url.lastIndexOf('?') !== -1 ? url.substring(url.lastIndexOf('?') + 1) : '';
    if (!search) {
        return {};
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

/**
 * @author xiayong
 * @desc   深度拷贝数组对象
 * @param  {Any} values  必填
 */
export function deepCopy(values) {
    let copy;
    if (null == values || "object" != typeof values) return values;
    if (values instanceof Date) {
        copy = new Date();
        copy.setTime(values.getTime());
        return copy;
    }
    if (values instanceof Array) {
        copy = [];
        for (let i = 0, len = values.length; i < len; i++) {
            copy[i] = deepCopy(values[i]);
        }
        return copy;
    }
    if (values instanceof Object) {
        copy = {};
        for (let attr in values) {
            if (values.hasOwnProperty(attr)) copy[attr] = deepCopy(values[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy values! Its type isn't supported.");
}

/**
 * @author xiayong
 * @desc   时间格式化
 * @param  {time} values  必填
 * @param  {type} values  选填 'ymdhms'：返回年月日时分秒
 */
function toFix(num) {
    return num < 10 ? '0' + num : num;
}
export function normalTime(time, type) {
    if (time) {
        let oDate = new Date();
        oDate.setTime(new Date(time));
        let y = oDate.getFullYear();
        let m = oDate.getMonth() + 1;
        let d = oDate.getDate();
        let h = oDate.getHours();
        let mm = oDate.getMinutes();
        let s = oDate.getSeconds();
        if (type == 'ymdhms') {
            return y + '-' + toFix(m) + '-' + toFix(d) + ' ' + toFix(h) + ':' + toFix(mm) + ':' + toFix(s);
        } else {
            return y + '-' + toFix(m) + '-' + toFix(d);
        };
    } else {
        return '';
    }
}

/**
 * @author wanggang
 * @desc   阻止页面滚动
 * @param  {flag} values 选填
 */
export function h5DisableScroll(flag){
    if(flag){
        document.documentElement.style.overflow = 'hidden';
        document.querySelector('body').style.overflow = 'hidden';
        document.documentElement.style.height = '100%';
        document.querySelector('body').style.height = '100%';
    }else{
        document.documentElement.style.overflow = '';
        document.querySelector('body').style.overflow = '';
        document.documentElement.style.height = '';
        document.querySelector('body').style.height = '';

    }
}

/**
 * @author xiayong
 * @desc   设置cookie, 获取cookie, 删除cookie
 */
export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

//设置cookie
export function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//删除cookie
export function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

/**
 * @author xiayong
 * @desc 跳转到登陆，带上登陆成功后跳转的url链接
 * @param {String} path 当前页面链接
 */
export function goLogin (path) {
    if (path && path != '/login') {
        let pathname = path.substr(0, 12);
        // 判断是否包含 back 重新拼装一个url
        let back = parseQueryString(path).back;
        path = path.replace(/%23gotoregiste/, '');
        if (back) {
            path = back;
        }
        if (pathname == '/item/popup/') {
            window.parent.location.href = '/login?back=' + encodeURIComponent(window.parent.location.pathname);
        } else {
            location.href = '/login?back=' + encodeURIComponent(path);
        }
    } else {
        location.href = '/login';
    }
}

/**
 * @author xiayong
 * @desc 页面滚动到指定位置
 * @param {String} top 滚动距离
 * @param {String} name 滚动到指定位置的dom的class或者id
 */
export function scrollTo (top, name) {
    let scrollTop = name ? $(name).offset().top - top : top;
    if (name && $(name).length < 1) return;
    $('html,body').animate({ scrollTop: scrollTop }, 200);
}

/**
 * @author xiayong
 * @desc 判断是移动端还是PC端
 * @return {Boolean} 返回值，如果是web端返回true，否则返回false
 */
export function isWeb () {
    let userAgentInfo = navigator.userAgent;
    let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod"];
    let _mHref = location.href.indexOf('m.zaozuo.com') != -1;
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    };
    if (_mHref) {
        flag = false;
    };
    userAgentInfo.indexOf('iPad') > 0 ? flag = true : null;
    return flag;
}