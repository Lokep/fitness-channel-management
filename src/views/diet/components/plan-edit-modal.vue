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

      <!--  -->
      <div class="flex dialog-form">
        <div class="dialog-form__el" style="flex: 1">
          <DietPlanForm
            v-for="(item, index) in ruleList"
            :key="index"
            class="mb-5"
          >
            <template slot="title">
              <div>第{{ item.dayNum }}天{{ index + 1 }}</div>
              <div>热量：400 千卡</div>
              <div>蛋白：2.7 克</div>
              <div>脂肪：3.0 克</div>
              <div>碳水：0.7 克</div>
            </template>

            <div class="dialog-form-list">
              <div
                v-for="(it, i) in item.dayList"
                :key="i"
                class="dialog-form-item"
              >
                <el-form-item :label="it.meal" label-width="80px" required>

                  <el-button
                    v-if="it.detailList.length == 0"
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
                      <el-input-number
                        v-model="el.nums"
                        size="mini"
                        :min="1"
                        :max="9999"
                        label="描述文字"
                      />
                      杯
                      <i
                        class="el-icon-circle-plus dialog-form__el"
                        @click="addDetailListItem(index, i, idx)"
                      />
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
                <i
                  class="el-icon-circle-plus dialog-form__el cursor"
                  @click="addItem"
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
    <div slot="footer" class="dialog-footer">
      <el-button
        size="mini"
        @click="$emit('update:dialogFormVisible', false)"
      >取 消</el-button>
      <el-button size="mini" type="primary" @click="handleEditForm">
        确 定
      </el-button>
    </div>
  </div>
</template>

<script>
import { getFoodCategorytList, getFoodSelectList } from '@/api/food'

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
    },
    {
      mealType: 4,
      meal: '加餐',
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
    DietPlanForm: () => import('./diet-plan-form.vue')
  },
  props: {
    form: {
      type: Object,
      default: () => {
        return Object.create(null)
      }
    }
  },
  data() {
    return {
      ruleList: [],
      categorytList: [],
      foodList: []
    }
  },
  created() {
    this.splitForm()
    this.getFoodCategorytList()
  },
  methods: {
    handleEditForm() {},
    addItem(index) {
      /* 新增计划第几天 */
      this.form.ruleList.push(RULE_LIST_ITEM)
    },

    /**
     * 分解传入的form
     */
    splitForm() {
      const { ruleList } = this.form
      this.ruleList = ruleList
    },

    addDetailListItem(index, i, idx) {
      this.ruleList[index].dayList[i].detailList.splice(idx, 0, DETAIL_LIST_ITEM)
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
