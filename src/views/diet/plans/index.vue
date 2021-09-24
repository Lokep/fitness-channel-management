<style lang="scss" scoped>
::v-deep .dialog-form{
  .el-input-number {
    margin-top: 3px;
  }
  .el-select ~ .el-input-number {
    margin-left: 10px;
    margin-right: 10px;
  }
}
.dialog-form {
  &__el + &__el {
    margin-left: 10px;
    flex-shrink: 0;
  }
  .el-icon-circle-plus {
    line-height: 48rpx;
  }
  .el-icon-error {
    color: #f56c6c;
  }
  .el-icon-error,
  .el-icon-circle-plus {
    font-size: 30px;
    line-height: 48px;
  }

  &-item {
    margin-bottom: 10px;

    .el-icon-error,
    .el-icon-circle-plus {
      font-size: 30px;
      line-height: 36px;
      margin-left: 10px;
    }
    .el-input,
    .el-select {
      margin-left: 10px;
    }

    &__desc {
      line-height: 16px;
      font-size: 12px;
    }
  }
}
.dialog-form__el + .dialog-form__el {
  margin-left: 10px;
  flex-shrink: 0;
}
</style>
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
      <el-form :model="form">
        <el-form-item label="计划名称" label-width="80px" required>
          <!-- 必填，1-20字，超出字数则不允许再输入 -->
          <el-input
            v-model="form.planName"
            size="mini"
            autocomplete="off"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item label="打卡天数" label-width="80px" required>
          <el-input-number v-model="form.dayCount" size="mini" :min="1" :max="9999" label="描述文字" />
        </el-form-item>

        <!--  -->
        <div class="flex dialog-form">
          <div class="dialog-form__el" style="flex: 1">
            <DietPlanForm
              v-for="(item, index) in form.ruleList"
              :key="index"
              class="mb-5"
              @updateForm="updateForm"
            >
              <template slot="title">
                <div>第{{ item.dayNum }}天{{ index + 1 }}</div>
                <div>热量：400 千卡</div>
                <div>蛋白：2.7 克</div>
                <div>脂肪：3.0 克</div>
                <div>碳水：0.7 克</div>
              </template>
              <div class="dialog-form-list">
                <div v-for="(it, i) in item.dayList" :key="i" class="dialog-form-item">
                  <el-form-item label="早餐" label-width="80px" required>
                    <el-button
                      v-if="it.detailList.length == 0"
                      type="primary"
                      size="mini"
                      @click="(e) => addDetailListItem(index, i, 0)"
                    >
                      新增食物x
                    </el-button>
                    <div v-for="(el , idx) in it.detailList" v-else :key="idx" style="margin-bottom: 10px;">
                      <div class="justify-between flex">
                        <el-select
                          v-model="el.categoryId"
                          size="mini"
                          autocomplete="off"
                          @change="foodCategoryChange($event)"
                        >
                          <el-option
                            v-for="categoryItem in categorytList"
                            :key="categoryItem.id"
                            :label="categoryItem.name"
                            :value="categoryItem.id"
                          />
                        </el-select>
                        <el-select
                          v-model="el.foodId"
                          size="mini"
                          autocomplete="off"
                        >
                          <el-option
                            v-for="categoryItem in foodList"
                            :key="categoryItem.id"
                            :label="categoryItem.name"
                            :value="categoryItem.id"
                          />
                        </el-select>
                        <el-input-number v-model="el.nums" size="mini" :min="1" :max="9999" label="描述文字" />
                        杯
                        <i class="el-icon-circle-plus dialog-form__el" @click="addDetailListItem(index, i, idx)" />
                        <i class="el-icon-error dialog-form__el" />
                      </div>
                      <div class="dialog-form-item__desc">
                        热量：400 千卡 蛋白：2.7 克 脂肪：3.0 克 碳水：0.7 克
                      </div>
                    </div>
                  </el-form-item>
                </div>
              </div>
              <template slot="right">
                <div class="flex">
                  <i class="el-icon-circle-plus dialog-form__el cursor" @click="addItem" />
                  <i v-if="index > 0" class="el-icon-error dialog-form__el cursor" @click="delItemHandle(index)" />
                </div>
              </template>
            </DietPlanForm>
          </div>

        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          size="mini"
          @click="dialogFormVisible = false"
        >取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="dialogFormVisible = false"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import user from '@/mixin/user'
import { deepClone, parseTime } from '@/utils'
import { getPlanList, deletePlan } from '@/api/diet'
import { getFoodCategorytList, getFoodSelectList } from '@/api/food'
import DietPlanForm from '../components/diet-plan-form.vue'
import { getDishCategoryList } from '@/api/diet'
const RULE_LIST_ITEM = {
  dayNum: 1,
  dayList: [
    {
      mealType: 1,
      detailList: []
    }
  ]

}
const DETAIL_LIST_ITEM = {
  categoryId: '',
  foodId: '',
  nums: 1
}
export default {
  components: {
    DietPlanForm
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
      dialogFormVisible: false,
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
    // this.getDishCategoryList()
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
            if (res.result === 1) {
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
    addItem(index) {
      /* 新增计划第几天 */
      // const List = {}
      this.form.ruleList.push(RULE_LIST_ITEM)
    },
    delItemHandle(index) {
      this.form.ruleList.splice(index, 1)
    },
    addDetailItem(index, i) {
      this.form.ruleList[index].dayList[i].detailList.push(RULE_LIST_ITEM)
    },
    addDetailListItem(index, i, idx) {
      this.form.ruleList[index].dayList[i].detailList.splice(idx, 0, DETAIL_LIST_ITEM)
    },

    getDishCategoryList() {
      getDishCategoryList({
        categoryType: 1
      }).then(res => {
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
      }).then(res => {
        this.categorytList = res.data.list
      })
    },
    /* 食物分类下拉改变时,ps: 应该要加参数 */
    foodCategoryChange(value) {
      this.getFoodSelectList(value)
    },
    /* 食物下拉列表 */
    getFoodSelectList(categoryId) {
      getFoodSelectList({ categoryId }).then(res => {
        this.foodList = res.data.list
      })
    }
  }
}
</script>
