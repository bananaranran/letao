$(function(){
  // 用echarts插件实现柱状图和饼状图
  // 1.左侧柱状图
  // 初始化echarts实例
  var echarts_1 = echarts.init(document.querySelector('.echarts_1'));
  // console.log(echarts_1);
  // 指定图表的配置项和数据
  var option1 = {
    // 大标题
    title: {
      text: '2017年 注册人数',
      textStyle: {
        color: 'red',
      }
    },
    // 提示框组件
    tooltip: {},
    // 图例
    legend: {
      data: ['人数']
    },
    // x轴
    xAxis: {
      data: ['1月','2月','3月','4月','5月','6月']
    },
    // y轴
    yAxis: {},
    // 配置数据
    series: [{
      name: '人数',
      type: 'bar',
      data: [1000,1500,2500,1300,1800,2400]
    }]
  };
  // 用以上指定的配置项和数据显示图表
  echarts_1.setOption(option1);


  // 2.右侧饼状图
  // 初始化实例
  var echarts_2 = echarts.init(document.querySelector('.echarts_2'));
  // 指定图表的配置项和数据
  var option2 = {
    title: {
      text: '热门品牌销售',
      subtext: '2017年6月',
      // 控制水平对齐方式
      x: 'center'
    },
    tooltips: {
      trigger: 'item',  //表示鼠标滑到数据项上面时触发
      // 自定义提示框内容
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    // 图例
    legend: {
      // 配置图例的显示方式，horizontal 水平排列
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','李宁','耐克王','李宁王']
    },
    series: [{
      name: '品牌销量',
      type: 'pie', //类型是饼状图
      radius: '50%',
      center: ['50%', '60%'],
      data: [
        {value:335, name:'耐克'},
        {value:310, name:'阿迪'},
        {value:234, name:'李宁'},
        {value:135, name:'耐克王'},
        {value:1548, name:'李宁王'}
      ],
      // 表示额外的阴影等效果
      itemStyle: {
        emphasis: {
          shadowBlur: 50,
          shadowOffsetX: 0,
          // shadowColor: 'yellow'
        }
      }
    }]
  };
  // 使用以上配置项和数据显示图表
  echarts_2.setOption(option2);

})
