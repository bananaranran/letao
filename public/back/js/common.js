// 实现进度条  用NProgress插件 (ajax全局事件)
// 在第一个ajax发送请求前开启进度 在所有ajax执行完成之后关闭进度
$(document).ajaxStart(function() {
  // 开启进度条
  NProgress.start();
});
$(document).ajaxStop(function() {
  // 模拟网络延迟
  setTimeout(function() {
    // 关闭进度条
    NProgress.done();
  }, 500)
});

// 左侧栏公共效果
$(function() {
  // 1.二级菜单切换效果
  $('.lt-aside .category').click(function() {
    $('.lt-aside .child').stop().slideToggle();
  });
  // 2.左侧菜单栏切换消失
  $('.icon_menu').click(function() {
    $('.lt-aside').toggleClass("hidemenu");
    $('.lt-topbar').toggleClass("hidemenu");
    $('.lt-main').toggleClass("hidemenu");
  })
  // 3.点击退出 弹出模态框
  $('.icon_logout').click(function() {
    $('#logoutModal').modal('show');
  });
  $('#logoutBtn').click(function() {
    // 点击退出 --->调用后台接口 消除该用户登录状态
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      datatype: 'json',
      success: function(info) {
        if( info.success ) {
          // 若成功退出 跳转至登录页面
          location.href = 'login.html';
        }
      }
    })
  })
})

