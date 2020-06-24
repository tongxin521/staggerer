$(function() {
    var laypage = layui.laypage;
    // 定义一个查询的参数对象，将来请求数据的时候，
    // 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '', //文章的状态，可选值有：已发布、草稿
    };
    /**
     * @description:补零函数
     * @param {type} 
     * @return: 
     */
    function padZero(n) {
        return n < 10 ? '0' + n : n;
    }
    //时间过滤器
    template.defaults.imports.dataFormat = function(date) {
            var time = new Date(date);
            var y = padZero(time.getFullYear());
            var m = padZero(time.getMonth() + 1);
            var d = padZero(time.getDate());

            var hh = padZero(time.getHours());
            var mm = padZero(time.getMinutes());
            var ss = padZero(time.getSeconds());
            return y + '-' + m + '-' + d + ' ' + hh + '-' + mm + '-' + ss;
        }
        // 获取文章列表数据，并渲染到页面
    initTable();
    /**
     * @description:获取文章列表数据
     * @param {type} 
     * @return: 
     */
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function(backData) {
                if (backData.status !== 0) {
                    return layui.layer.msg('获取文章列表数据失败');
                }
                layui.layer.msg('获取文章列表数据成功');
                var res = template('tpl-table', backData);
                $('tbody').html(res);
                renderPage(backData.total);
            }
        });
    };
    initCate();
    /** 初始化文章分类
     * @description:
     * @param {type} 
     * @return: 
     */
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(backData) {
                if (backData.status !== 0) {
                    return layer.msg('初始化文章分类失败');
                };
                layer.msg('初始化文章分类成功');
                var res = template('tpl-cate', backData);
                $('[name=cate_id]').html(res);
                // 重新加载下拉选择框
                layui.form.render();
            }
        });
    };
    // 监听form表单submit事件
    $('#form-search').on('submit', function(e) {
        // 取消表单默认行为
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        // 重新加载文章列表数据
        initTable();
    });
    /**
     * @description:渲染分页区域
     * @param {type} 
     * @return: 
     */
    function renderPage(total) {
        // 渲染分页结构
        laypage.render({
            elem: 'pageBox', //容器的id
            count: total, //数据的总数
            limit: q.pagesize, //每页显示的条数
            curr: q.pagenum, //默认起始页
            limits: [2, 3, 5, 10], //每页条数的选择框
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            // 分页切换的回调函数
            jump: function(obj, first) {
                q.pagenum = obj.curr; //获取当前点击的页数
                q.pagesize = obj.limit; //获取每页显示的条数
                if (!first) {
                    initTable();
                }

            }
        });
    };
    //为删除设置点击事件
    $('tbody').on('click', '.btn-delete', function() {
        // 获取当前删除按钮的个数
        var len = $('.btn-delete').length;
        // 获取id
        var id = $(this).attr('data-id');
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function(index) {
            // 发送ajax请求
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function(backData) {
                    if (backData.status !== 0) {
                        return layui.layer.mes('删除文章失败');
                    };
                    layui.layer.msg('删除文章成功');
                    if (len === 1) {
                        q.pagenum = q.pagenum == 1 ? 1 : q.pagenum - 1;
                    }
                    // 重新加载文章列表数据
                    initTable();
                }
            });

            layer.close(index);
        });


    })
})