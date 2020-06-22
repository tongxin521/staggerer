$(function() {
    //获取用户信息,并修改用户信息
    getUserInfo();
    //设置退出功能
    $('#btnLogout').on('click', function() {
        layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //1.清除localStorage里面的token
            localStorage.removeItem('token');
            // 2.跳转到登陆页面
            location.href = '/login.html';
            layer.close(index);
        });

    });
});
/**
 * @description:获取用户信息
 * @param {type} 
 * @return: 
 */
function getUserInfo() {
    console.log(localStorage.getItem('token'));

    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function(backData) {
            if (backData.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            };
            // 将用户信息渲染到页面
            renderAvatar(backData.data);
        },
        // 无论成功还是失败，都会调用complete回调函数
        complete: function(backData) {

            if (backData.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1.清空localStorage里面token值
                localStorage.removeItem('token');
                // 2.跳转到登陆页面
                location.href = '/login.html';


            }
        }
    });
};

function renderAvatar(data) {
    var name = data.nickname || data.username
    $('#welcome').html('欢迎&nbsp;&nbsp' + name);
    if (data.user_pic === null) {
        $('.layui-nav-img').hide();
        $('.text-avatar').show().html(name[0].toUpperCase());
    } else {
        $('.text-avatar').hide();
        $('.layui-nav-img').attr('src', data.user_pic).show();
    }

}