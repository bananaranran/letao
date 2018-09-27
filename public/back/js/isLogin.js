// 用于拦截未登录的客户
// 当客户未登录拦截到登录页 --->需要向后端发送请求获取登录状态
$.ajax({
  type: 'get',
  url: '/employee/checkRootLogin',
  datatype: 'json',
  success: function( info ) {
    if (info.error === 400) {
      location.href = 'login.html';
    }
    if (info.success) {
      console.log('当前用户已经登录');
    }
  }
})