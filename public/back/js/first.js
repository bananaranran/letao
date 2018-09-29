$(function() {
  var currentPage = 1;   //当前页
  var pageSize = 5;    //每页多少条
  //1.一进入页面 发送ajax请求后台数据渲染页面
  render();
  function render () {
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      datatype: 'json',
      success: function(info){
        // 绑定渲染一级分类列表
        var htmlStr = template('tpl', info);
        $('tbody').html(htmlStr);
        // 分页初始化
        $('#paginator').bootstrapPaginator({
          // 版本号：3
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages: Math.ceil(info.total/info.size),
          // 当前页
          currentPage: info.page,
          // 给页码添加点击事件
            // event 是插件包装过的对象
            // originalEvent 是原始的事件对象
            // type 指代当前点击的页码类型, page普通页码, first, last, next, prev
            // page 指代当前点击按钮对应的页码
          onPageClicked: function(even, originalEvent, type, page) {
            console.log(page);
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        })
      }
    });
  }

  // 2.点击添加分类按钮，显示添加模态框
  $('#addBtn').click(function() {
    $('#addModal').modal('show');
  })

  // 3.通过表单验证插件，实现表单校验功能
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 配置校验字段
    field: {
      categoryName: {
        // 配置校验规则
        validators: {
          // 非空校验
          notEmpty: {
            message: '请输入一级分类名称'
          }
        }
      }
    }
  });

  // 4.注册表单校验成功事件,阻止校验成功时的默认提交，而是通过ajax提交
  $('#form').on('success.form.bv', function(e){
    // 阻止默认行为
    e.preventDefault();
    // 通过ajax提交
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('#form').serialize(),  //表单序列化
      dataType: 'json',
      success: function(info) {
        console.log(info);
        if( info.success) {
          // 如果添加成功，关闭模态框，重新渲染第一页面
          $('#addModal').modal('hide');
          currentPage = 1;
          render();
          // 重置模态框表单内容与校验状态, resetForm传true才将内容与状态都重置
          $('#form').data('bootstrapValidator').resetForm(true);
        }
      }
    })

  })

})