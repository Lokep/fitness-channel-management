
<template>
  <div class="plans">
    <!-- 操作模板 -->
    <div class="tools justify-between mb-10">
      <div class="tools-list align-center">

        <div class="tools-item align-center">
          <div class="tools-item__label">
            用户名称
          </div>
          <el-input
            v-model="searchQuery.memberName"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
          />
        </div>

        <div class="tools-item align-center">
          <div class="tools-item__label">
            提交日期
          </div>
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
          <div class="tools-item__label">
            饮食计划
          </div>
          <el-input
            v-model="searchQuery.planName"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
          />
        </div>

        <div class="tools-item align-center">
          <div class="tools-item__label">
            记录状态
          </div>
          <el-select v-model="searchQuery.record" size="mini">
            <el-option :value="0" label="全部" />
          </el-select>
        </div>

      </div>

      <div class="tools-btns align-center">
        <el-button size="mini" type="success" icon="el-icon-search" @click="getClockList">查询</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus">新建</el-button>
      </div>
    </div>

    <div class="content">
      <el-table size="mini" border empty-text="暂无数据" :data="clockList">
        <el-table-column align="center" type="index" label="序号" />
        <el-table-column align="center" prop="memberName" label="用户名称" />
        <el-table-column align="center" prop="planName" label="打卡计划名称" />
        <el-table-column align="center" prop="dayNum" label="打卡天数">
          <template slot-scope="{ row }">
            {{ row.dayNum }} / {{ row.dayCount }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="mealType" label="餐次">
          <template slot-scope="{ row }">
            {{ row.mealType | mealTypeParse }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="suggestTake" label="建议摄入（千卡）" />
        <el-table-column align="center" prop="heat" label="热量（千卡）" />
        <el-table-column align="center" prop="protein" label="蛋白质（克）" />
        <el-table-column align="center" prop="fat" label="脂肪（克）" />
        <el-table-column align="center" prop="carbonWater" label="碳水（克）" />
        <el-table-column align="center" prop="submitTime" label="提交时间" />
        <el-table-column align="center" prop="isRecord" label="记录状态" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <div>
              <el-button v-if="row.isRecord==0" type="text" size="mini">记录</el-button>
              <el-button v-else type="text" size="mini">修改</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination mt-10">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="getClockList"
        />
      </div>
    </div>

  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { getClockList } from '@/api/records'
export default {
  filters: {
    mealTypeParse(e) {
      switch (e) {
        case 1:
          return '早餐'
        case 2:
          return '午餐'
        case 3:
          return '晚餐'
        case 4:
          return '加餐'
        default:
          return '————'
      }
    }
  },
  data() {
    return {
      searchQuery: {
        beginTime: '',
        endTime: '',
        record: 0,
        memberName: '',
        pageNum: 1,
        pageSize: 10,
        planName: '',
        dateValue: ''
      },
      total: 10,
      clockList: []
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
    this.getClockList()
  },
  methods: {
    getClockList() {
      getClockList(this.searchQuery).then(res => {
        // console.log(res)
        this.clockList = res.data
        this.total = res.total
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
