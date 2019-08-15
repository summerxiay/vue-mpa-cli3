import {handleRequest} from 'ASSETS/libs/api';

export default {
    // 加入购物车
    addCart(params) {
        return handleRequest('get', '/cart/add', params)
    }
}