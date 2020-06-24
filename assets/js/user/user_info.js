$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "用户名不能超过6个字符"
            }
        }
    });
    // 发起用户初始化请求
    initUserInfo();
    /**
     * @description:获取用户基本信息
     * @param {type} 
     * @return: 
     */
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(backData) {
                if (backData.status !== 0) {
                    return layer.msg(backData.message);
                }
                form.val('formUserInfo', backData.data);

            }
        });
    };
    // 设置重置按钮
    $('#btnReset').on('click', function(e) {
            // 取消表单默认行为
            e.preventDefault();
            initUserInfo();
        })
        // 监听form表单
    $('.layui-form').on('submit', function(e) {
        // 取消表单默认行为
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(backData) {
                if (backData.status !== 0) {
                    return layer.msg('修改用户信息失败！');
                }
                window.parent.getUserInfo();
            }
        });
    });
});