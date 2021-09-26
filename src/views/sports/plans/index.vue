
<template>
  <div class="plans">
    <!-- 操作模板 -->
    <div class="tools justify-between mb-10">
      <div class="tools-list align-center">
        <div class="tools-item align-center">
          <div class="tools-item__label">计划名称</div>
          <el-input
            v-model="searchQuery.planName"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
          />
        </div>

        <div class="tools-item align-center">
          <div class="tools-item__label">创建日期</div>
          <el-date-picker
            v-model="searchQuery.dateValue"
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
            v-model="searchQuery.creatorName"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
          />
        </div>
      </div>

      <div class="tools-btns align-center">
        <el-button size="mini" type="success" icon="el-icon-search" @click="getSportsPlanList">查询</el-button>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-plus"
        >新建</el-button>
      </div>
    </div>

    <div class="content">
      <el-table size="mini" border :data="sportsPlanList">
        <el-table-column align="center" type="index" label="序号" />
        <el-table-column align="center" prop="planName" label="计划名称" />
        <el-table-column align="center" prop="dayCount" label="打卡天数" />
        <el-table-column align="center" prop="creatorName" label="创建人" />
        <el-table-column align="center" prop="createTime" label="创建时间" />
        <el-table-column align="center" prop="receiveNums" label="分发人次" />
        <el-table-column align="center" prop="" label="操作">
          <template>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
            <el-button type="text" size="mini">分发</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination mt-10">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="getSportsPlanList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import user from '@/mixin/user'
import { parseTime } from '@/utils'
import { addPlan, getSportsPlanList } from '@/api/fitness'

export default {
  mixins: [user],
  data() {
    return {
      total: 10,
      sportsPlanList: [],
      searchQuery: {
        planName: '',
        beginTime: '',
        endTime: '',
        creatorName: '',
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  watch: {
    'searchQuery.dateValue': {
      deep: true,
      immediate: false,
      handler: function(newValue) {
        if (newValue instanceof Array) {
          this.$set(this.searchQuery, 'beginTime', parseTime(newValue[0]))
          this.$set(this.searchQuery, 'endTime', parseTime(newValue[1]))
        } else {
          this.$set(this.searchQuery, 'beginTime', '')
          this.$set(this.searchQuery, 'endTime', '')
        }
      }
    }
  },
  created() {
    this.getSportsPlanList()
  },
  methods: {
    /* 运动计划列表 */
    getSportsPlanList() {
      const searchQuery = this.searchQuery
      getSportsPlanList({ searchQuery }).then(res => {
        this.sportsPlanList = res.data.list
        this.total = res.data.total
      })
    },
    /*  */
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
