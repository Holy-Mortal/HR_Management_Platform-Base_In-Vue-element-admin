<template>
  <!-- 雷达图 -->
  <div ref="myDiv" class="radar-echart" />
</template>

<script>
// 完成加载过程
// var echarts = require('echarts')
var echarts = require('echarts/lib/echarts') // 引入echarts主模块
require('echarts/lib/chart/radar') // 引入雷达图
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() {},
  // 页面渲染完毕事件
  mounted() {
    const myChart = echarts.init(this.$refs.myDiv)
    var option = {
      title: {
        text: '基础雷达图'
      },
      tooltip: {},
      legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [
          { name: '工作效率', max: 100 },
          { name: '考勤', max: 100 },
          { name: '积极性', max: 100 },
          { name: '帮助同事', max: 100 },
          { name: '自主学习', max: 100 },
          { name: '正确率', max: 100 }
        ]
      },
      series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        data: [
          {
            value: [10, 15, 100, 35, 100, 0],
            name: '张三'
          },
          {
            value: [50, 50, 50, 50, 50, 100],
            name: '李四'
          }
        ]
      }]
    }
    myChart.setOption(option)
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.radar-echart {
    width: 600px;
    height: 400px;
}
</style>
