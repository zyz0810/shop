import {service} from './../config/fetch'

/**
 * 获取首页默认地址
 */
export const member = {
    nearby: (data) => service.get('weixin/tenant/nearbyList.jhtml', data),
    category: (data) => service.get('weixin/kuaixun/category.jhtml', data),
}
