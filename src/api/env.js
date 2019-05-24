/**
 * 配置线上环境和线下环境的切换
 * 
 * baseUrl:域名地址
 * routeMode:路由模式
 * imgBaseUrl:图片所在域名地址
 */
let baseUrl = '';
let routeMode = 'hash';
let imgBaseUrl = '';

if(process.env.NODE_ENV=='development'){
    imgBaseUrl = '/img/';
}else if(process.env.NODE_ENV == 'production'){
    baseUrl = '//elm.cangdu.org';
    imgBaseUrl = '//elm.cangdu.org/img/';
}

export {
    baseUrl,
    routeMode,
    imgBaseUrl
}