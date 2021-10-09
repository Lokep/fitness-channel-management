
<template>
  <div class="plans">
    <!-- 操作模板 -->
    <div class="tools justify-between mb-10">
      <div class="tools-list align-center">
        <div class="tools-item align-center">
          <div class="tools-item__label">计划名称</div>
          <el-input
            v-model="params.planName"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            clearable
            @change="search"
            @clear="search"
          />
        </div>

        <div class="tools-item align-center">
          <div class="tools-item__label">创建日期</div>
          <el-date-picker
            v-model="time"
            size="mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-DD"
            @change="search"
            @clear="search"
          />
        </div>

        <div class="tools-item align-center">
          <div class="tools-item__label">创建人</div>
          <el-input
            v-model="params.creatorName"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            clearable
            @change="search"
            @clear="search"
          />
        </div>
      </div>

      <div class="tools-btns align-center">
        <el-button
          size="mini"
          type="success"
          icon="el-icon-search"
          @click="search"
        >查询</el-button>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="creareHandle"
        >新建</el-button>
      </div>
    </div>

    <div class="content">
      <el-table size="mini" :data="plans" border empty-text="暂无数据">
        <el-table-column align="center" label="序号" type="index" />
        <el-table-column align="center" prop="planName" label="计划名称" />
        <el-table-column align="center" prop="dayCount" label="打卡天数" />
        <el-table-column align="center" prop="creatorName" label="创建人" />
        <el-table-column align="center" prop="createTime" label="创建时间">
          <template slot-scope="{ row }">
            {{ row.createTime | handleTimeFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="receiveNums" label="领取人次" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" size="mini" @click="handleEdit(row)">编辑</el-button>
            <el-button
              type="text"
              size="mini"
              @click="deletePlan(row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination mt-10">
        <el-pagination
          background
          :current-page="current"
          :page-size="10"
          layout="prev, pager, next"
          :total="total"
          @current-change="changePage"
        />
      </div>
    </div>

    <el-dialog
      :title="isEdit ? '编辑饮食计划' : '新建饮食计划'"
      :visible.sync="dialogFormVisible"
      destroy-on-close
      width="725px"
    >
      <plan-edit-modal
        :is-edit="isEdit"
        :category-list-bak="categoryList"
        :form="form"
        @update="handleFormUpdate"
      />
    </el-dialog>
  </div>
</template>

<script>
import user from '@/mixin/user'
import { deepClone } from '@/utils'
import { getPlanList, deleteDietPlan, getDietPlanInfo } from '@/api/diet'
import { getFoodCategoryList, getFoodSelectList } from '@/api/food'

import * as dayjs from 'dayjs'

import PlanEditModal from '../components/plan-edit-modal.vue'

export default {
  components: {
    PlanEditModal
  },
  filters: {
    parseTime(v) {
      return dayjs(v).format('YYYY-MM-DD hh:mm:ss')
    },
    handleTimeFilter(time) {
      if (!time) return ''
      return dayjs(time).format('YYYY-MM-DD')
    }
  },
  /* mixins 用户权限 备用 */
  mixins: [user],
  data() {
    return {
      dialogFormVisible: false,
      isEdit: false,
      params: {
        pageNum: 1,
        pageSize: 10,
        planName: null,
        beginTime: null,
        endTime: null,
        creatorName: null
      },
      form: {
        createTime: 0,
        creatorId: '',
        creatorName: '',
        id: '',
        isDelete: 0,
        receiveNums: 0,
        planName: '',
        dayCount: 1,
        ruleList: [
          {
            dayNum: 1,
            dayList: [
              {
                mealType: 1,
                meal: '早餐',
                detailList: []
              },
              {
                mealType: 2,
                meal: '午餐',
                detailList: []
              },
              {
                mealType: 3,
                meal: '晚餐',
                detailList: []
              }
              // {
              //   mealType: 4,
              //   meal: '加餐',
              //   detailList: []
              // }
            ]
          }
        ]
      },
      time: [],
      plans: [],
      current: 1,
      total: 10,
      /* 食物分类 */
      categoryList: [],
      /* 食物下拉 */
      foodList: []
    }
  },
  watch: {
    time(date) {
      const params = deepClone(this.params)
      if (date && date.length === 2) {
        const [beginTime, endTime] = date

        this.params = {
          ...params,
          beginTime,
          endTime
        }
      } else {
        this.params = {
          ...params,
          beginTime: '',
          endTime: ''
        }
      }
    }
  },
  created() {
    this.getPlanList()
    this.getFoodCategoryList()
  },
  methods: {
    handleEdit(row) {
      const { id } = row
      getDietPlanInfo({ id }).then(res => {
        if (res.result === 1) {
          this.form = handlePlan(res.plan)
          this.isEdit = true
          this.dialogFormVisible = true
        }
      })
    },
    changePage(e) {
      this.current = e
      this.getPlanList({ pageNum: e })
    },
    search() {
      this.getPlanList()
    },
    getPlanList(params = {}) {
      return getPlanList({
        ...this.params,
        ...params
      }).then((res) => {
        if (res.result === 1) {
          this.plans = res.data
          this.total = res.total
        }
      })
    },

    deletePlan({ id }) {
      if (!id) {
        this.$message.warning('该条数据异常')
        this.getPlanList()
        return
      }
      this.$confirm('你确定要删除这条数据吗？', '提示', { type: 'warning' })
        .then(() => {
          deleteDietPlan({
            id
          }).then((res) => {
            if (res.result === 1) {
              this.$message.success('操作成功')
              this.getPlanList()
            }
          })
        })
        .catch(() => {})
    },

    /* 添加饮食计划 */
    creareHandle() {
      this.dialogFormVisible = true
      this.isEdit = false
      this.form = {
        createTime: 0,
        creatorId: '',
        creatorName: '',
        id: '',
        isDelete: 0,
        receiveNums: 0,
        planName: '',
        dayCount: 1,
        ruleList: [
          {
            dayNum: 1,
            dayList: [
              {
                mealType: 1,
                meal: '早餐',
                detailList: []
              },
              {
                mealType: 2,
                meal: '午餐',
                detailList: []
              },
              {
                mealType: 3,
                meal: '晚餐',
                detailList: []
              }
              // {
              //   mealType: 4,
              //   meal: '加餐',
              //   detailList: []
              // }
            ]
          }
        ]
      }
    },
    /* 食物分类 */
    getFoodCategoryList() {
      getFoodCategoryList({
        categoryType: 1
      }).then((res) => {
        this.categoryList = res.data
      })
    },

    /* 食物分类下拉改变时,ps: 应该要加参数 */
    foodCategoryChange(value) {
      this.getFoodSelectList(value)
    },
    /* 食物下拉列表 */
    getFoodSelectList(categoryId) {
      getFoodSelectList({ categoryId }).then((res) => {
        this.foodList = res.data.list
      })
    },

    handleFormUpdate(e) {
      this.dialogFormVisible = e.dialogFormVisible
      this.form = e.form
      if (e.refresh) {
        this.getPlanList()
      }
    }
  }
}

function handlePlan(plan) {
  const result = []; const enum_mealType = ['', '早餐', '午餐', '晚餐']

  plan.ruleList.map(item => {
    const index = result.findIndex(el => el.dayNum === item.dayNum)

    if (index === -1) {
      result.push({
        ...item,
        dayList: [
          {
            ...item,
            meal: enum_mealType[item.mealType]
          }
        ]
      })
    } else {
      result[index].dayList.push({
        ...item,
        meal: enum_mealType[item.mealType]
      })
    }
  })

  return {
    ...plan,
    ruleList: result
  }
}
</script>
