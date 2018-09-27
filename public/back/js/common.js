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


