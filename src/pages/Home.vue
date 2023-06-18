<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-right: 20px">
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/images/admin.jpg" alt="" />
            <div class="info">
              <p class="name">Admin</p>
              <p class="more">超级管理员</p>
            </div>
          </div>
          <div class="load">
            <p>登录时间：<span>2023-01-01</span></p>
            <p>登录地点：<span>广州</span></p>
          </div>
        </el-card>
        <el-card class="products-table">
          <el-table :data="tableData" style="width: 100%">
            <!-- <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="todayBuy" label="今日购买"></el-table-column>
            <el-table-column prop="monthBuy" label="当月购买"></el-table-column>
            <el-table-column prop="totalBuy" label="总计购买"></el-table-column> -->
            <el-table-column
              v-for="(value, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="value"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" class="col-right">
        <div class="order-cards">
          <el-card
            class="order-card"
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: '0' }"
            ><i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="info">
              <p class="value">￥{{ item.value }}</p>
              <p class="name">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <div class="graph">
          <el-card class="graph1">
            <!-- 折线图 -->
            <div ref="echarts1" style="height: 250px"></div>
          </el-card>
          <div class="box">
            <el-card class="graph2">
              <!-- 柱状图 -->
              <div ref="echarts2" style="height: 200px"></div>
            </el-card>
            <el-card class="graph2">
              <!-- 饼状图 -->
              <div ref="echarts3" style="height: 180px"></div>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from "../api";
import * as echarts from "echarts";
export default {
  name: "Home",

  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data; //解构赋值，让tableData匹配到data.data中的tableData
      this.tableData = tableData; //将tabledata赋予到this对象上
      // 折线图
      const echarts1 = echarts.init(this.$refs.echarts1);
      var echart1Option = {};
      // 处理图例数据legend
      const { orderData } = data.data; //解构赋值，让orderData匹配到data.data中的orderData
      const legend = Object.keys(orderData.data[0]); //利用obj。keys方法获取第一个对象的key值
      const legendData = { data: legend };
      echart1Option.legend = legendData;
      // 处理横坐标数据
      const xAxis = { data: orderData.date };
      echart1Option.xAxis = xAxis;
      // 处理数据series
      echart1Option.series = [];
      legend.forEach((key) => {
        echart1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });

      // 定义纵坐标数据yAxis
      echart1Option.yAxis = {};
      // 根据配置显示图表
      echarts1.setOption(echart1Option);

      // 用户情况柱状图
      const echarts2 = echarts.init(this.$refs.echarts2);
      const { userData } = data.data;
      var echart2Option = {
        title: {
          text: "本周用户",
        },
        tooltip: {},
        legend: {
          // data: echart2Option.series((item) => item.name),
        },
        xAxis: {
          data: userData.map((item) => item.date),
        },
        yAxis: {},
        series: [
          {
            name: "新增用户",
            type: "bar",
            data: userData.map((item) => item.new),
          },
          {
            name: "活跃用户",
            type: "bar",
            data: userData.map((item) => item.active),
          },
        ],
      };
      echarts2.setOption(echart2Option);

      // 价格饼状图
      const echarts3 = echarts.init(this.$refs.echarts3);
      const { videoData } = data.data;
      var echarts3Option = {
        series: [
          {
            type: "pie",
            data: videoData,
          },
        ],
      };
      echarts3.setOption(echarts3Option);
    });
  },
};
</script>

<style lang="less" scoped>
.box-card {
  .user {
    display: flex;
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(125, 125, 125);

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    .info {
      margin-top: 20px;
      margin-left: 40px;
      align-content: center;

      p {
        margin-block-start: 0em;
        margin-block-end: 0em;
      }

      .name {
        font-size: 30px;
        line-height: 38px;
      }

      .more {
        font-size: 16px;
        line-height: 20px;
        color: rgb(125, 125, 125);
      }
    }
  }

  .load {
    span {
      margin-left: 20px;
    }
  }
}
.products-table {
  margin-top: 20px;
}
.col-right {
  .order-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .order-card {
      padding: 0;
      width: 32%;
      margin-bottom: 20px;
      .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        color: rgb(255, 255, 255);
        line-height: 80px;
        text-align: center;
      }
      .info {
        margin-left: 30px;
        p {
          margin-block-start: 0em;
          margin-block-end: 0em;
          margin-bottom: 10px;
        }
        .value {
          font-size: 30px;
        }
        .name {
          font-size: 16px;
          color: rgb(101, 101, 101);
        }
      }
    }
  }
  .graph {
    .graph1 {
      margin-bottom: 20px;
      height: 250px;
    }
    .box {
      display: flex;
      justify-content: space-between;
      .graph2 {
        height: 200px;
        width: 48%;
      }
    }
  }
}
</style>