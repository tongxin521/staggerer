$(function() {
    // form表单校验
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return "原密码和新密码不能一致";
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd').val()) {
                return "两次密码不一致";
            }
        }
    });
    //监听form表单，修改密码
    $('.layui-form').on('submit', function(e) {
        // 取消表单默认行为
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $('.layui-form').serialize(),
            success: function(backData) {
                if (backData.status !== 0) {
                    return layui.layer.msg('修改密码失败');
                }
                layui.layer.msg('修改密码成功');
                $('.layui-form')[0].reset();

            }
        });
    });
})