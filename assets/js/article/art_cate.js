$(function() {
        // 1.获取文章信息，并渲染到页面
        initArtCateList();
        //创建弹出层的索引
        var indexAdd = null;
        //2.为添加按钮添加点击事件
        $('#btnAddCate').on('click', function() {
            indexAdd = layer.open({
                type: 1,
                title: '添加文章分类',
                area: ['500px', '250px'],
                content: $('#dialog-add').html(),
            });
        });
        //监听表单事件
        $('body').on('submit', '#form-add', function(e) {
            // 取消表单默认行为
            e.preventDefault();
            $.ajax({
                method: 'post',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(backData) {
                    if (backData.status !== 0) {
                        return layui.layer.msg('新增文章分类失败！');
                    }
                    layui.layer.msg('新增文章分类成功');
                    initArtCateList();
                    // 根据弹出层关闭索引
                    layui.layer.close(indexAdd);
                }
            });
        });
        // 定义一个弹出层的索引
        var indexEdit = null
            // 为编辑添加点击事件
        $('tbody').on('click', '.btn-edit', function() {
            indexEdit = layer.open({
                type: 1,
                title: '添加文章分类',
                area: ['500px', '250px'],
                content: $('#dialog-edit').html(),
            });
            // 获取id
            var id = $(this).attr('data-id');

            // 根据 Id 获取文章分类数据
            $.ajax({
                method: 'get',
                url: '/my/article/cates/' + id,
                success: function(backData) {
                    if (backData.status !== 0) {
                        return layui.layer.msg('获取文章分类失败');
                    }
                    layui.layer.msg('获取文章分类成功');
                    layui.form.val('form-edit', backData.data);
                }
            });

        });
        //    监听编辑表单
        $('tbody').on('submit', '#form-edit', function(e) {
                //取消表单默认行为
                e.preventDefault();
                // 根据 Id 更新文章分类数据
                $.ajax({
                    method: 'post',
                    url: '/my/article/updatecate',
                    data: $(this).serialize(),
                    success: function(backData) {
                        if (backData.status !== 0) {
                            return layui.layer.msg('更新分类信息失败');
                        };
                        layui.layer.msg('更新分类信息成功');
                        layui.layer.close(indexEdit);
                        initArtCateList();
                    }
                });

            })
            // 为删除添加点击事件
        $('tbody').on('click', '.btn-delete', function() {
            var id = $(this).attr('data-id');
            layui.layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function(index) {
                $.ajax({
                    method: 'get',
                    url: '/my/article/deletecate/' + id,
                    success: function(backData) {
                        if (backData.status !== 0) {
                            return layui.layer.msg('删除文章信息失败！');
                        };
                        layui.layer.msg('删除文章信息成功');
                        initArtCateList();
                    }
                });

                layer.close(index);
            });
        })
    })
    /**
     * @description: 获取文章分类列表
     * @param {type} 
     * @return: 
     */
function initArtCateList() {
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function(backData) {
            if (backData.status !== 0) {
                return layui.layer.msg('获取文章分类列表失败');
            };
            var res = template('tpl-table', backData);
            $('tbody').html(res);
        }
    });
}