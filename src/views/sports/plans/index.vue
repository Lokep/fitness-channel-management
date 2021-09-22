
<template>
  <div class="plans">
    <!-- 操作模板 -->
    <div class="tools justify-between mb-10">
      <div class="tools-list align-center">
        <div class="tools-item align-center">
          <div class="tools-item__label">计划名称</div>
          <el-input
            v-model="input2"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
          />
        </div>

        <div class="tools-item align-center">
          <div class="tools-item__label">创建日期</div>
          <el-date-picker
            v-model="value1"
            size="mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>

        <div class="tools-item align-center">
          <div class="tools-item__label">创建人</div>
          <el-input
            v-model="input2"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
          />
        </div>
      </div>

      <div class="tools-btns align-center">
        <el-button
          size="mini"
          type="success"
          icon="el-icon-search"
        >查询</el-button>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-plus"
        >新建</el-button>
      </div>
    </div>

    <div class="content">
      <el-table size="mini" border>
        <el-table-column align="center" props="" label="序号" />
        <el-table-column align="center" props="" label="计划名称" />
        <el-table-column align="center" props="" label="打卡天数" />
        <el-table-column align="center" props="" label="创建人" />
        <el-table-column align="center" props="" label="创建时间" />
        <el-table-column align="center" props="" label="分发人次" />
        <el-table-column align="center" props="" label="操作">
          <template>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
            <el-button type="text" size="mini">分发</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination mt-10">
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </div>
    </div>
  </div>
</template>

<script>
import { addPlan } from '@/api/sports'
export default {
  data() {
    return {}
  },

  created() {
    this.addPlan()
  },

  methods: {
    addPlan() {
      return addPlan({
        createTime: '2021-09-14T13:25:25.892Z',
        creatorId: 'string',
        creatorName: 'string',
        dayCount: 0,
        id: 'string',
        isDelete: 0,
        planName: 'string',
        receiveNums: 0,
        ruleList: [
          {
            advice: 'string',
            content: 'string',
            createTime: '2021-09-14T13:25:25.892Z',
            dayNum: 0,
            id: 'string',
            planId: 'string',
            recommendConsume: 'string'
          }
        ],
        updateTime: '2021-09-14T13:25:25.892Z'
      }).then(res => {

      })
    }
  }
}
</script>
