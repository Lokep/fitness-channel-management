<template>
  <div>
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
        <el-input-number
          v-model="form.dayCount"
          size="mini"
          :min="1"
          :max="9999"
          label="描述文字"
        />
      </el-form-item>

      <!--
        index 为 天 的索引
        i 为 顿 的索引
        idx 为某一种食物 的索引
       -->
      <div class="flex dialog-form">
        <div class="dialog-form__el" style="flex: 1">
          <DietPlanForm
            v-for="(item, index) in form.ruleList"
            :key="index"
            :name="index"
            class="mb-5"
            @change="handleCollapseChange"
          >
            <template slot="title">
              <div>第{{ item.dayNum }}天 </div>
              <!-- <div>热量：400 千卡</div>
              <div>蛋白：2.7 克</div>
              <div>脂肪：3.0 克</div>
              <div>碳水：0.7 克</div> -->
              <div>{{ item.dayList | handleDayContainerFilter(foodList) }}</div>
            </template>

            <div class="dialog-form-list">
              <div
                v-for="(it, i) in item.dayList"
                :key="i"
                class="dialog-form-item"
              >
                <el-form-item :label="it.meal" label-width="80px" required>
                  <el-button
                    v-if="it.detailList.length === 0"
                    type="primary"
                    size="mini"
                    icon="el-icon-plus"
                    @click="(e) => addDetailListItem(index, i, 0)"
                  >
                    新增食物
                  </el-button>

                  <div
                    v-for="(el, idx) in it.detailList"
                    v-else
                    :key="idx"
                    style="margin-bottom: 10px"
                  >
                    <div class="justify-between flex">

                      <!-- 选择食物分类 -->
                      <el-select
                        :value="el.categoryId"
                        size="mini"
                        autocomplete="off"
                        @focus="e => cloneFoodCategoryList(index, i, idx)"
                        @change="e => foodCategoryChange(e, index, i, idx, 'categoryId')"
                      >
                        <el-option
                          v-for="categoryItem in categoryList[`${index}-${i}-${idx}`]"
                          :key="categoryItem.id"
                          :label="categoryItem.name"
                          :value="categoryItem.id"
                        />
                      </el-select>

                      <!-- 选择食物 -->
                      <el-select
                        :value="el.foodId"
                        size="mini"
                        autocomplete="off"
                        @change="e => handleFoodChange(e, index, i, idx, el.categoryId)"
                      >
                        <el-option
                          v-for="categoryItem in foodList[el.categoryId]"
                          :key="categoryItem.id"
                          :label="categoryItem.name"
                          :value="categoryItem.id"
                        />
                      </el-select>

                      <!-- 食物数量 -->
                      <el-input-number
                        :value="el.nums"
                        size="mini"
                        :min="1"
                        :max="9999"
                        label="描述文字"
                        @change="e => handleInputChange(e, index, i, idx, 'nums')"
                      />

                      {{ el.unit }}

                      <!-- 操作按钮 -->
                      <div class="flex" style="min-width: 80px;">
                        <i
                          class="el-icon-circle-plus dialog-form__el"
                          @click="addDetailListItem(index, i, idx)"
                        />
                        <i
                          v-if="idx > 0"
                          class="el-icon-error dialog-form__el"
                          @click="deleteDetailListItem(index, i, idx)"
                        />
                      </div>

                      <!-- ---- -->
                    </div>
                    <div class="dialog-form-item__desc">
                      {{ el | handleContainFilter(foodList[el.categoryId]) }}
                    </div>
                  </div>
                </el-form-item>
              </div>
            </div>

            <template slot="right">
              <div v-if="!isEdit" class="flex" style="min-width: 80px;">
                <i
                  class="el-icon-circle-plus dialog-form__el cursor"
                  @click="addItem()"
                />
                <i
                  v-if="index > 0"
                  class="el-icon-error dialog-form__el cursor"
                  @click="delItemHandle(index)"
                />
              </div>
            </template>
          </DietPlanForm>
        </div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer mt-10" style="display: flex; justify-content: flex-end;">
      <el-button size="mini" @click="e => handleClose()">取 消</el-button>
      <el-button size="mini" type="primary" @click="addDietPlan">
        确 定
      </el-button>
    </span>
  </div>
</template>

<script>
import { getFoodCategoryList, getFoodSelectList } from '@/api/food'
import { addDietPlan } from '@/api/diet'
import { deepClone } from '@/utils'

const FORM_SKELETON = {
  'createTime': 0,
  'creatorId': '',
  'creatorName': '',
  'id': '',
  'isDelete': 0,
  'receiveNums': 0,
  'planName': '',
  'dayCount': 1,
  'ruleList': [
    {
      'dayNum': 1,
      'dayList': [
        {
          'mealType': 1,
          'meal': '早餐',
          'detailList': []
        },
        {
          'mealType': 2,
          'meal': '午餐',
          'detailList': []
        },
        {
          'mealType': 3,
          'meal': '晚餐',
          'detailList': []
        }
      ]
    }
  ]
}

const RULE_LIST_ITEM = {
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
    //   meal: "加餐",
    //   detailList: [],
    // },
  ]
}
const DETAIL_LIST_ITEM = {
  categoryId: '',
  foodId: '',
  nums: 1
}

export default {
  components: {
    DietPlanForm: () => import('./diet-plan-form.vue')
  },
  filters: {
    handleContainFilter: function(row = {}, list = []) {
      if (row.foodId && row.nums >= 1) {
        const { heat = 0, protein = 0, fat = 0, carbonWater = 0 } = list.find(item => item.id === row.foodId) || {}
        return `热量：${heat * row.nums} 千卡 蛋白：${protein * row.nums} 克 脂肪：${fat * row.nums} 克 碳水：${carbonWater * row.nums} 克`
      }
    },
    handleDayContainerFilter(list, foods) {
      let heats = 0; let proteins = 0; let fats = 0; let carbonWaters = 0
      let foodsList = []
      Object.values(foods).map(item => {
        foodsList = [...item]
      })
      if (foodsList && foodsList.length > 0 && list && list.length > 0) {
        list.map(item => {
          if (item.detailList && item.detailList.length > 0) {
            item.detailList.map(it => {
              const { heat = 0, protein = 0, fat = 0, carbonWater = 0 } = foodsList.find(el => el.id === it.foodId) || {}
              heats += it.nums * heat
              proteins += it.nums * protein
              fats += it.nums * fat
              carbonWaters += it.nums * carbonWater
            })
          }
        })
      }

      return `热量：${heats} 千卡 蛋白：${proteins} 克 脂肪：${fats} 克 碳水：${carbonWaters} 克`
    }
  },
  props: {
    form: {
      type: Object,
      default: () => {
        return Object.create(null)
      }
    },
    categoryListBak: {
      type: Array,
      default: () => {
        return []
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ruleList: [],
      categoryList: {},
      foodList: {}
    }
  },
  watch: {
    categoryListBak: {
      deep: true,
      handler() {
        this.cloneFoodCategoryList()
      },
      immediate: true
    }
  },
  created() {
    this.cloneFoodCategoryList()
  },
  methods: {
    handleClose(refresh = false) {
      this.$emit('update', {
        dialogFormVisible: false,
        form: FORM_SKELETON,
        refresh
      })
    },

    handleInputChange(e, index, i, idx, key) {
      const form = deepClone(this.form)

      form.ruleList[index].dayList[i].detailList[idx][key] = e

      this.$emit('update', {
        dialogFormVisible: true,
        form,
        refresh: false
      })
    },

    handleFoodChange(e, index, i, idx, categoryId) {
      const form = deepClone(this.form)
      const { unit = '' } = this.foodList[categoryId].find(item => item.id === e) || {}
      const item = form.ruleList[index].dayList[i].detailList[idx]

      form.ruleList[index].dayList[i].detailList[idx] = {
        ...item,
        foodId: e,
        unit,
        nums: 1
      }

      this.$emit('update', {
        dialogFormVisible: true,
        form,
        refresh: false
      })
    },

    handleCollapseChange(e) {
      console.log(e)
      if (typeof e === 'number') {
        const { dayList } = this.form.ruleList[e]
        dayList.map(item => {
          item.detailList.map(it => {
            if (it.categoryId) {
              this.getFoodSelectList(it.categoryId)
            }
          })
        })
        this.cloneFoodCategoryList()
      }
    },

    initRow(value, index, i, idx) {
      const form = deepClone(this.form)
      const item = form.ruleList[index].dayList[i].detailList[idx]

      form.ruleList[index].dayList[i].detailList[idx] = {
        ...item,
        categoryId: value,
        foodId: '',
        unit: '',
        nums: 1
      }

      this.$emit('update', {
        dialogFormVisible: true,
        form,
        refresh: false
      })
    },

    addItem() {
      /* 新增计划第几天 */

      this.form.ruleList.push({
        ...RULE_LIST_ITEM,
        dayNum: this.form.ruleList.length + 1
      })
    },

    addDetailListItem(index, i, idx) {
      this.form.ruleList[index].dayList[i].detailList.push(DETAIL_LIST_ITEM)
    },

    delItemHandle(index) {
      this.form.ruleList.splice(index, 1)
    },

    deleteDetailListItem(index, i, idx) {
      this.form.ruleList[index].dayList[i].detailList.splice(
        idx,
        1
      )
    },

    /* 食物分类 */
    getFoodCategoryList() {
      return getFoodCategoryList({
        categoryType: 1
      }).then((res) => {
        this.categoryListBak = res.data
        this.cloneFoodCategoryList()
      })
    },

    cloneFoodCategoryList(index, i, idx) {
      if (typeof index === 'number') {
        this.categoryList[`${index}-${i}-${idx}`] = this.categoryListBak
        this.categoryList[`${index}-${i + 1}-${idx}`] = this.categoryListBak
        this.categoryList[`${index + 1}-${i}-${idx}`] = this.categoryListBak
        this.categoryList[`${index}-${i}-${idx + 1}`] = this.categoryListBak
      } else {
        for (let m = 0; m < 5; m++) {
          for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
              this.categoryList[`${m}-${x}-${y}`] = this.categoryListBak
            }
          }
        }
      }
    },

    /* 食物分类下拉改变时,ps: 应该要加参数 */
    foodCategoryChange(value, index, i, idx, key) {
      this.getFoodSelectList(value)
      this.handleInputChange(value, index, i, idx, key)
      this.initRow(value, index, i, idx)
    },

    /* 食物下拉列表 */
    getFoodSelectList(categoryId) {
      getFoodSelectList({ categoryId }).then((res) => {
        this.foodList = {
          ...this.foodList,
          [`${categoryId}`]: res.data
        }
      })
    },

    /** 新增 */
    addDietPlan() {
      const ruleList = this.makeUpRuleList()

      const { status, message } = this.checkIsForm()

      if (status === 'FAIL') {
        this.$message.warning(message)
        return
      }

      this.$confirm('是否确认执行此操作', '提示')
        .then(() => {
          addDietPlan({
            ...this.form,
            ruleList
          }).then((res) => {
            if (res.result === 1) {
              this.$message.success('操作成功')
              this.handleClose(true)
            }
          })
        })
        .catch(() => {})
    },

    checkIsForm() {
      const { planName, ruleList } = this.form

      if (!planName || planName.length > 20) {
        return { status: 'FAIL', message: '请正确填写计划名称' }
      }

      for (let i = 0; i < ruleList.length; i++) {
        const item = ruleList[i]
        for (let m = 0; m < item.dayList.length; m++) {
          const it = item.dayList[m]

          if (it.detailList.length === 0) {
            return { status: 'FAIL', message: '请完整设置饮食计划' }
          }

          for (let n = 0; n < it.detailList.length; n++) {
            const el = it.detailList[n]

            if (el.categoryId && el.foodId && el.nums) {
              continue
            } else {
              if (!el.categoryId) {
                return { status: 'FAIL', message: '请选择食物分类' }
              } else if (!el.foodId) {
                return { status: 'FAIL', message: '请选择食物' }
              } else if (!el.nums) {
                return { status: 'FAIL', message: '请选择食物数量' }
              }
            }
          }
        }
      }

      return { status: 'SUCCESS' }
    },

    makeUpRuleList() {
      const ruleList = []
      this.form.ruleList.map((item) => {
        item.dayList.map(it => {
          ruleList.push({
            ...item,
            // dayNum: item.dayNum,
            detailList: it.detailList,
            mealType: it.mealType
            // id: item.id || null,
            // planId: item.planId || null
          })
        })
      })

      return ruleList
    }
  }

}
</script>

<style lang="scss" scoped>
::v-deep .dialog-form {
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
