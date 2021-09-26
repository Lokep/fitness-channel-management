
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
            {{ row.createTime | parseTime }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="receiveNums" label="领取人次" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" size="mini">编辑</el-button>
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
      :title="form.id ? '编辑饮食计划' : '新建饮食计划'"
      :visible.sync="dialogFormVisible"
      width="768px"
    >
      <plan-edit-modal :form="form" />
    </el-dialog>
  </div>
</template>

<script>
import user from '@/mixin/user'
import { deepClone, parseTime } from '@/utils'
import { getPlanList, deletePlan } from '@/api/diet'
import { getFoodCategorytList, getFoodSelectList } from '@/api/food'
import { getDishCategoryList } from '@/api/diet'

import PlanEditModal from '../components/plan-edit-modal.vue'

export default {
  components: {
    PlanEditModal
  },
  filters: {
    parseTime(v) {
      return parseTime(v, '{y}-{m}-{d}')
    }
  },
  /* mixins 用户权限 备用 */
  mixins: [user],
  data() {
    return {
      dialogFormVisible: true,
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
              },
              {
                mealType: 4,
                meal: '加餐',
                detailList: []
              }
            ]
          }
        ]
      },
      time: [],
      plans: [],
      current: 1,
      total: 10,
      /* 食物分类 */
      categorytList: [],
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
    this.getDishCategoryList()
    this.getPlanList()
    this.getFoodCategorytList()
  },
  methods: {
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
          deletePlan({
            id
          }).then((res) => {
            if (res.res === 0) {
              this.$message.success('操作成功')
              this.getPlanList()
            }
          })
        })
        .catch(() => {})
    },

    updateForm(e) {
      console.log(e)
    },

    getDishCategoryList() {
      getDishCategoryList({
        categoryType: 1
      }).then((res) => {
        console.log(res)
      })
    },
    /* 添加饮食计划 */
    creareHandle() {
      this.dialogFormVisible = true
    },
    /* 食物分类 */
    getFoodCategorytList() {
      getFoodCategorytList({
        categoryType: 1
      }).then((res) => {
        this.categorytList = res.data.list
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
    }
  }
}
</script>
