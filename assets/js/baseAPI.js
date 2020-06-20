/* 
    在发送ajax请求之前，处理自定义Ajax选项
    修改ajax的url属性值
*/
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    console.log(options.url);
});