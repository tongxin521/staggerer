/* 
    在发送ajax请求之前，处理自定义Ajax选项
    修改ajax的url属性值
*/
$.ajaxPrefilter(function(options) {
    //拼接url地址
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // 统一为有权限的接口设置headers请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        }
    }
    // 全局统一挂载 complete 回调函数
    // 无论成功还是失败，都会调用complete回调函数
    options.complete = function(backData) {
        if (backData.responseJSON.status === 1 && backData.responseJSON.message === '身份认证失败！') {
            // 1.清空localStorage里面token值
            localStorage.removeItem('token');
            // 2.跳转到登陆页面
            location.href = '/login.html';
        }
    }
});