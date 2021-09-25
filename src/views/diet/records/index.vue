
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
        <!-- <el-button size="mini" type="primary" icon="el-icon-plus">新建</el-button> -->
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
              <el-button v-if="row.isRecord==0" type="text" size="mini" @click="getClockDetail(row.id)">记录</el-button>
              <el-button v-else type="text" size="mini" @click="getClockDetail(row.id)">修改</el-button>
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
    <!-- 记录 -->
    <el-dialog
      title="记录饮食"
      :visible.sync="dialogVisible"
      width="768px"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <el-row class="dialog-group">
        <el-col :span="12">
          <div class="grid-content bg-purple-dark pt-5 pb-5">
            <div class="label fl">用户名称:</div> <span>用户名称</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark pt-5 pb-5">
            <div class="label fl">性别:</div> <span>性别</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark pt-5 pb-5">
            <div class="label fl">出生日期:</div> <span>1999-01-01</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark pt-5 pb-5">
            <div class="label fl">身高:</div> <span>178.2cm</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark pt-5 pb-5">
            <div class="label fl">最新体重:</div> <span>--</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark pt-5 pb-5">
            <div class="label fl">BMI:</div><span>--</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark pt-5 pb-5">
            <div class="label fl">血型:</div> <span>--</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="dialog-group">
        <el-col :span="12">
          <div class="grid-content bg-purple-dark pt-5 pb-5">
            <div class="label fl">计划名称：</div><span>{{ detail.planName }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark pt-5 pb-5">
            <div class="label fl">打卡天数:</div> <span>{{ detail.dayNum }} / {{ detail.dayCount }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark pt-5 pb-5">
            <div class="label fl">打卡餐次:</div> <span>{{ detail.mealType | mealTypeParse }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark pt-5 pb-5">
            <div class="label fl">推荐热量:</div><span>{{ detail.suggestTake }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark pt-5 pb-5">
            <div class="fl label">打卡时间:</div><span>打卡时间</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark pt-5 pb-5">
            <div class="label fl">描述内容:</div><span>{{ detail.describe }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark pt-5 pb-5">
            <div class="label fl">打卡图片:</div><span>
              <el-image
                :src="detail.picUrl"
                :preview-src-list="[detail.picUrl]"
                fit="cover"
                class="card-picurl"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
            </span>
          </div>
        </el-col>
      </el-row>
      <el-row class="dialog-group">
        <div class="grid-content bg-purple-dark pt-5 pb-5 flex">
          <div class="fl label">摄入:</div>
          <span>
            <section v-for="(item, index) in detail.detailList" :key="index">
              <div class="dialog-item">
                <el-select v-model="item.categoryId" class="flex-1" :class="{'error-computed':errorComputed(item.categoryId)}" @change="foodCategoryChange($event)">
                  <el-option
                    v-for="categoryItem in categorytList"
                    :key="categoryItem.id"
                    :label="categoryItem.name"
                    :value="categoryItem.id"
                  />
                </el-select>
                <el-select v-model="item.foodId" class="ml-5 flex-1" :class="{'error-computed':errorComputed(item.foodId)}">
                  <el-option
                    v-for="categoryItem in foodList"
                    :key="categoryItem.id"
                    :label="categoryItem.name"
                    :value="categoryItem.id"
                  />
                </el-select>
                <el-input v-model.number="item.num" type="number" class="ml-5 flex-1" :class="{'error-computed':errorComputed(item.num)}" />
                <div class="pl-5 pr-5">个</div>
                <!-- <i class="el-icon-circle-plus dialog-form__el" /> -->
                <i class="el-icon-error dialog-form__el ml-5" @click="deleteHandle(index)" />
              </div>
              <div class="text">
                热量：0 千卡
                蛋白：0.0 克
                脂肪：0.0 克
                碳水：0.7 克
              </div>
            </section>
            <el-button plain type="primary" @click="addHandle">新增记录</el-button>
          </span>
        </div>
        <div class="grid-content bg-purple-dark pt-5 pb-5 ">
          <div class="fl label">饮食建议:</div> <el-input v-model="detail.suggestTake" type="textarea" placeholder="300字以内" maxlength="300" show-word-limit />
        </div>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">记录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import user from '@/mixin/user'
import { parseTime } from '@/utils'
import { getClockList, getClockDetail } from '@/api/records'
import { getFoodCategorytList, getFoodSelectList } from '@/api/food'
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
  mixins: [user],
  data() {
    return {
      dialogVisible: false,
      /* 饮食打卡列表参数 */
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
      /* 饮食打卡列表 */
      clockList: [],
      /* 饮食打卡详情 */
      detail: {
        id: '',
        memberId: '',
        planName: '',
        mealType: '',
        submitTime: '',
        picUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        dayNum: '',
        dayCount: '',
        suggestTake: '',
        describe: '描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容',
        advice: '',
        /* id(主键) categoryId(食物分类id) foodId(食物id) nums(数量)": null */
        detailList: []
      },
      /* 食物分类下拉 */
      categorytList: [],
      /* 食物下拉列表 */
      foodList: []

    }
  },
  computed: {
    errorComputed: function() {
      return (e) => {
        if (e === 0 || e === '0' || e === '' || e == null) return true
        return false
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
    this.getClockList()
    this.getFoodCategorytList()
  },
  methods: {
    /* 食物打卡列表 */
    getClockList() {
      getClockList(this.searchQuery).then(res => {
        this.clockList = res.data
        this.total = res.total
      }).catch(err => {
        console.log(err)
      })
    },
    /* 食物打卡详情 */
    getClockDetail(id) {
      this.dialogVisible = true
      getClockDetail({ id }).then(res => {
        this.detail = res.data
      })
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
      console.log(123)
      getFoodSelectList({ categoryId }).then(res => {
        this.foodList = res.data.list
      })
    },
    addHandle() {
      const item = { num: 0, categoryId: '', foodId: '' }
      this.detail.detailList.push(item)
    },
    deleteHandle(index) {
      this.detail.detailList.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-content {
  color: #333;
  vertical-align: top;
  line-height: 36px;
  &::after {
    display: block;
    // content: '';
    clear: both;
  }
  span{
    color: #777;
    line-height: 26px;
    padding: 5px 0 5px 10px;
    box-sizing: border-box;
    width: calc(100% - 5em);
    float: right;
  }
}
.card-picurl {
  border: 1px solid #eee;
  margin-left: 10px;
  width:150px;
  height:200px;
}
::v-deep .el-textarea{
  width: calc(100% - 5em);
  float: right;
}
::v-deep .image-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 30px;
  .el-icon-picture-outline{
    font-size: 30px;
  }
}
.dialog-group {
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  +.dialog-group{
     padding-top: 10px;
  }
}
.flex {
  justify-content: space-between;
  span {
    padding-left: 0;
  }
}
.flex1 {
  flex: 1;
  margin-left: 5px;
}
// .label{
//   width: 5em;
//   text-align: right;
// }
.el-icon-error {
  color: #f56c6c;
  font-size: 30px;
  line-height: 30px;
  cursor: pointer;
}
.el-icon-circle-plus {
  font-size: 30px;
  line-height: 30px;
  cursor: pointer;
}
.dialog-item {
  display: flex;
  align-items: center;
}
.text {
  padding: 5px 0;
  color: #666;
}
.flex-1 {
  flex: 1;
}
</style>
