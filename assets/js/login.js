$(function() {
    $('#title_reg').on('click', function() {

        $('#login_box').hide();
        $('#reg_box').show();

    });
    $('#title_login').on('click', function() {
        $('#login_box').show();
        $('#reg_box').hide();
    });
    //从layui中获取表单
    var form = layui.form;
    //利用form.verify()设置自定义的表单
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            if ($('#reg_box [name=password]').val() !== value) {
                return '两次密码输入不一致';
            }
        }
    });
    var layer = layui.layer;
    // 监听注册form表单
    $('#form_reg').on('submit', function(e) {
            e.preventDefault();
            $.post('/api/reguser', {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }, function(backData) {
                if (backData.status !== 0) {
                    return layer.msg(backData.message);
                };
                layer.msg('注册成功');
                $('#title_login').click();
            })
        })
        // 监听登录form表单
    $('#form_login').on('submit', function(e) {
        //取消表单默认行为
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $('#form_login').serialize(),
            success: function(backData) {
                if (backData.status !== 0) {
                    return layer.msg('登陆失败！');
                }
                console.log(backData.token);

                localStorage.setItem('token', backData.token)
                layer.msg('登陆成功！');
                window.location.href = './index.html';
            }
        })

    })
});