$(function(){
  // 1.进行表单校验配置
  $('#form').bootstrapValidator({
    // 指定校验时显示的图标 固定写法
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',      // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    // 配置校验字段
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度需为2-6位'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度需为6-12位'
          },
          callback: {
            message: '密码不正确'
          }
        }
      }
    }
  })


  // 2.通过submit提交表单 让表单校验插件进行校验
  // a.校验通过 需要阻止默认提交 ----> 用ajax提交
  // b.校验失败 插件本身会阻止提交
  $('#form').on('success.form.bv', function(e) {
    // 阻止表单默认提交
    e.preventDefault();
    // ajax提交数据
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function(info) {
        // 登录成功则跳转首页
        // 若没有该用户或者密码错误则更改校验状态并给用户提示
        if (info.success) {
          location.href = 'index.html';
        }
        if (info.error === 1000) {
          // alert('用户名不存在');
          // 调用插件方法
          // updateStatus
          // 参数1: 字段名称
          // 参数2: 校验状态  NOT_VALIDATED 未检验的, VALIDATING 校验中, INVALID 失败 or VALID 成功
          // 参数3: 校验规则, 配置提示信息
          $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if (info.error === 1001) {
          // alert('密码错误');
          $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }
    })
  })


  // 完善重置按钮(重置不改变校验状态的bug)
  $('[type="reset"]').on('click', function() {
    // 调用插件的方法, 进行重置
    // resetForm(boolean)
    // 1. true, 表示将表单内容和校验状态都重置
    // 2. false, 只重置校验状态
    $('#form').data("bootstrapValidator").resetForm();
  })

})
