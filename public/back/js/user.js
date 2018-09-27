$(function() {
  var currentPage = 1; //当前页
  var pageSize = 5; //每页多少条
  // 进入页面 发送ajax请求 获取用户列表数据
  render();
  // 封装渲染方法
  function render () {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage, //页码
        pageSize: pageSize //每页多少条
      },
      dataType: 'json',
      success: function(info) {
        // 绑定模板引擎
        var htmlStr = template('tpl', info);
        // 渲染模板
        $('tbody').html(htmlStr);

        // 分页初始化测试
        $('#paginator').bootstrapPaginator({
          // 指定bootstrap的版本
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages: Math.ceil(info.total/info.size),
          // 当前页
          currentPage: info.page,
          // 给分页按钮添加点击事件
          onPageClicked: function(a,b,c,page) {
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        });
      }
    })
  }
})