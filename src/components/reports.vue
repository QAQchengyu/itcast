<template>
  <div>
    <my-bread sectitle="订单管理" threetitle="订单列表"></my-bread>
    <div class="my_main">
      <div ref="main" style="width: 1000px;height:600px;"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      option: {
        title: {
          text: "用户数据来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
  created(){

  },
  async mounted() {
    let myChart = echarts.init(this.$refs.main);
    let res = await this.$axios.get('reports/type/1')
    // 数据合并
    for(const key in res.data.data){
      this.option[key] = res.data.data[key];
    }
    // 合并之后 X轴没有顶格 设置没有的选项
    // 默认值就是category 数据显示的方式
    this.option.xAxis[0].type = 'category'
    // X轴是否留白 默认是true
    this.option.xAxis[0].boundaryGap = false;    
    myChart.setOption(this.option);
  }

};
</script>
 
<style>
.my_main {
  background-color: #fff;
  width: 100%;
  height: 540px;
  padding: 20px
}
</style>
