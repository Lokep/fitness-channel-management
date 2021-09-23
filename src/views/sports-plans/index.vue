
<template>
  <div class="plans">
    <!-- 操作模板 -->
    <div class="tools justify-between mb-10">
      <div class="tools-list align-center">

        <div class="tools-item align-center">
          <div class="tools-item__label">
            计划名称
          </div>
          <el-input
            v-model="params.title"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            clearable
            @change="handleSearch"
            @clear="handleSearch"
          />
        </div>

        <div class="tools-item align-center">
          <div class="tools-item__label">
            创建日期
          </div>
          <el-date-picker
            v-model="date"
            size="mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable
            @change="handleSearchByDate"
            @clear="handleSearchByDate"
          />
        </div>

        <div class="tools-item align-center">
          <div class="tools-item__label">
            创建人
          </div>
          <el-input
            v-model="params.creatorName"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            clearable
            @change="handleSearch"
            @clear="handleSearch"
          />
        </div>

      </div>

      <div class="tools-btns align-center">
        <el-button size="mini" type="success" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addSportsPlan">新建</el-button>
      </div>
    </div>

    <div class="content">
      <el-table size="mini" border>
        <el-table-column align="center" props="" label="序号" type="index" />
        <el-table-column align="center" props="" label="标题" />
        <el-table-column align="center" props="" label="创建人" />
        <el-table-column align="center" props="" label="创建时间" />
        <el-table-column align="center" props="" label="分发人次" />
        <el-table-column align="center" props="" label="操作">
          <template>
            <el-button type="text" size="mini">查看</el-button>
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
          :total="1000"
        />
      </div>
    </div>

  </div>
</template>

<script>
import { getSportsPlanList } from '@/api/sports-plan'
export default {
  data() {
    return {
      date: [],
      params: {
        beginTime: null,
        creatorName: null,
        endTime: null,
        pageNum: 1,
        pageSize: 10,
        title: null
      },
      planList: []
    }
  },
  created() {
    this.getSportsPlanList()
  },
  methods: {
    addSportsPlan() {
      // addSportsPlan
    },

    handleSearch() {
      this.$set(this.params, 'pageNum', 1)
      this.getSportsPlanList()
    },
    handleSearchByDate() {
      this.$set(this.params, 'pageNum', 1)
      this.getSportsPlanList()
    },
    getSportsPlanList() {
      getSportsPlanList({
        ...this.params
      }).then(res => {
        if (res.result === 1) {
          const { list } = res.data
          this.planList = list
        }
      })
    }

  }
}
</script>
