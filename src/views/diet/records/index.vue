
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
            clearable
            @change="handleSearch"
            @clear="handleSearch"
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
            clearable
            @change="handleSearch"
            @clear="handleSearch"
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
            clearable
            @change="handleSearch"
            @clear="handleSearch"
          />
        </div>

        <div class="tools-item align-center">
          <div class="tools-item__label">
            记录状态
          </div>
          <el-select
            v-model="searchQuery.isRecord"
            size="mini"
            clearable
            @change="handleSearch"
            @clear="handleSearch"
          >
            <el-option value="0" label="未记录" />
            <el-option value="1" label="已记录" />
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
        <el-table-column align="center" prop="" label="提交时间">
          <template slot-scope="{ row }">
            {{ row.submitTime | handleTimeFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="isRecord" label="记录状态">
          <template slot-scope="{ row }">
            <div>
              {{ row.isRecord==1?'已记录':'未记录' }}
            </div>
          </template>
        </el-table-column>
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
            <div class="fl label">打卡时间:</div><span>{{ detail.submitTime | handleTimeFilter }}</span>
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
        <el-form ref="detail" label-width="80px" :model="detail" :disabled="disabled">
          <div class="grid-content bg-purple-dark pt-5 pb-5 flex">
            <div class="fl label">摄入：</div>
            <span>
              <section v-for="(item, index) in detail.detailList" :key="index">
                <div class="dialog-item">
                  <el-form-item
                    :prop="'detailList.'+index+'.categoryId'"
                    :rules="[
                      {required:true,message:'不能为空'}
                    ]"
                    label-width="0"
                    class="ml-5 flex-1"
                  >
                    <el-select v-model="item.categoryId" class="flex-1" @change="foodCategoryChange($event,index)">
                      <el-option
                        v-for="categoryItem in categorytList"
                        :key="categoryItem.id"
                        :label="categoryItem.name"
                        :value="categoryItem.id"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    :prop="'detailList.'+index+'.foodId'"
                    :rules="[
                      {required:true,message:'不能为空'}
                    ]"
                    label-width="0"
                    class="ml-5 flex-1"
                  >
                    <el-select v-model="item.foodId" @change="foodChange($event,index)">
                      <el-option
                        v-for="categoryItem in foodCheckedComputed(index)"
                        :key="categoryItem.id"
                        :label="categoryItem.name"
                        :value="categoryItem.id"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label-width="0"
                    class="ml-5 flex-1"
                    :prop="'detailList.'+index+'.nums'"
                    :rules="[
                      {required:true,message:'不能为空'},
                      {type:'number',message:'只能为数字'}
                    ]"
                  >
                    <el-input v-model.number="item.nums" type="number" />
                  </el-form-item>
                  <div class="pl-5 pr-5">{{ unitComputed(foodDetailList[index]) }}</div>
                  <!-- <i class="el-icon-circle-plus dialog-form__el" /> -->
                  <i v-if="!disabled" class="el-icon-error dialog-form__el ml-5" @click="deleteHandle(index)" />
                </div>
                <div class="text">
                  热量：{{ intakeComputed(index, item, 'heat') }} 千卡
                  蛋白：{{ intakeComputed(index, item, 'protein') }} 克
                  脂肪：{{ intakeComputed(index, item, 'fat') }} 克
                  碳水：{{ intakeComputed(index, item, 'carbonWater') }} 克
                </div>
              </section>
              <el-button v-if="!disabled" size="mini" plain type="primary" @click="addHandle">新增记录</el-button>
            </span>
          </div>
          <!-- :prop="'ruleList.' + index + '.content'" -->
          <el-form-item label="饮食建议:" label-width="90px" prop="advice" :rules="{required:true,message:'不能为空'}">
            <el-input v-model="detail.advice" :disabled="disabled" type="textarea" placeholder="300字以内" maxlength="300" show-word-limit />
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="submitHandle">记录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import user from '@/mixin/user'
import * as dayjs from 'dayjs'
import { getClockList, getClockDetail, UpdateClockDetail } from '@/api/records'
import { getFoodCategoryList, getFoodSelectList } from '@/api/food'
export default {
  name: 'DietCecord',
  filters: {
    mealTypeParse(e) {
      switch (e) {
        case 1:
        case '1':
          return '早餐'
        case 2:
        case '2':
          return '午餐'
        case 3:
        case '3':
          return '晚餐'
        case 4:
        case '4':
          return '加餐'
        default:
          return '————'
      }
    },
    parseTimeFilter(e) {
      return dayjs(e).format('YYYY-MM-DD HH:mm:ss')
    },
    handleTimeFilter(e) {
      if (!e) return ''
      return dayjs(e).format('YYYY-MM-DD')
    }
  },
  mixins: [user],
  data() {
    return {
      dialogVisible: false,
      readonly: true,
      disabled: true,
      /* 饮食打卡列表参数 */
      searchQuery: {
        isRecord: null,
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
      foodList: [],
      foodCheckedList: [],
      foodDetailList: []

    }
  },
  computed: {
    /* 摄入计算 */
    foodCheckedComputed: function() {
      /* mock 时可能没有找到 foodid 会显示0 */
      return (index) => {
        return this.foodCheckedList[index] || {}
      }
    },
    /* 摄入计算 */
    intakeComputed: function() {
      /* mock 时可能没有找到 foodid 会显示0 */
      return (index, item, key) => {
        const one = this.foodDetailList[index]
        // const one = this.foodCheckedList[index]
        // console.log(index, item, key)
        // console.log(one)
        if (one?.[key] && item?.nums) return (+one[key] * +item?.nums).toFixed(2)
        return 0
      }
    },
    /* 单位 */
    unitComputed: function() {
      return (e) => {
        if (e?.unit) return e.unit
        return '个'
      }
    },
    /* 红色显示 */
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
          this.$set(this.searchQuery, 'beginTime', dayjs(newValue[0]).format('YYYY-MM-DD') + ' 00:00:00')
          this.$set(this.searchQuery, 'endTime', dayjs(newValue[1]).format('YYYY-MM-DD') + ' 23:59:59')
        } else {
          this.$set(this.searchQuery, 'beginTime', '')
          this.$set(this.searchQuery, 'endTime', '')
        }
      }
    }
  },
  created() {
    this.getClockList()
    this.getFoodCategoryList()
  },
  methods: {
    handleSearch() {
      this.searchQuery.pageNum = 1
      this.getClockList()
    },

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
      this.disabled = false
      getClockDetail({ id }).then(res => {
        this.detail = res.data
        /* 遍历获取摄入数据 */
        this.getfoodDetail()
      })
    },
    /* 食物分类 */
    getFoodCategoryList() {
      getFoodCategoryList({
        categoryType: 1
      }).then(res => {
        this.categorytList = res.data
      })
    },
    /* 食物分类下拉改变时,ps: 应该要加参数 */
    foodCategoryChange(value, index) {
      this.getFoodSelectList(value, index)
    },
    /* 食物下拉列表 */
    getFoodSelectList(categoryId, index) {
      getFoodSelectList({ categoryId }).then(res => {
        console.log(res)
        this.foodList = res.data
        this.$set(this.foodCheckedList, index, res.data)
        /* 重置食物 */
        const obj = this.detail.detailList[index]
        obj.foodId = ''
        this.$set(this.detail.detailList, index, obj)
      })
    },
    foodChange(value, index) {
      const foodCheckedDetail = this.foodList.find(item => item.id === value) || {}
      // console.log(foodCheckedDetail)
      this.$set(this.foodDetailList, index, foodCheckedDetail)
    },
    /* 添加摄入记录 */
    addHandle() {
      // foodDetail
      /* {
        "id|主键": null,
        "name|名称": null,
        "unit|单位)": null,
        "categoryId|分类id": null,
        "heat|热量": null,
        "protein|蛋白质": null,
        "fat|脂肪": null,
        "carbonWater|碳水": null,
        } */
      const item = { nums: 0, categoryId: '', foodId: '' }
      this.detail.detailList.push(item)
      const foodDetai = {}
      this.foodDetailList.push(foodDetai)
    },
    /* 循环获取食物碳水等详情 因为有分类id,那么直接查详情数据 */
    getfoodDetail() {
      this.foodDetailList = []
      this.foodCheckedList = []
      this.detail.detailList.forEach((item, index) => {
        const categoryId = item.categoryId
        const foodId = item.foodId
        getFoodSelectList({ categoryId }).then(res => {
          // console.log(res)
          this.foodDetailList.push(res.data.find(item => item.id === foodId) || {})
          this.foodCheckedList.push(res.data)
        })
      })
    },
    /* 删除摄入记录 */
    deleteHandle(index) {
      this.detail.detailList.splice(index, 1)
      this.foodDetailList.splice(index, 1)
    },
    submitHandle() {
      /* {
          "advice": "string",
          "carbonWater": 0,
          "createTime": "string",
          "dayCount": 0,
          "dayNum": 0,
          "describe": "string",
          "detailList": [
            {
              "categoryId": "string",
              "foodId": "string",
              "id": "string",
              "nums": 0,
              "recordId": "string"
            }
          ],
          "editorId": "string",
          "editorName": "string",
          "fat": 0,
          "heat": 0,
          "id": "string",
          "isRecord": 0,
          "isSubmit": 0,
          "mealType": 0,
          "memberId": "string",
          "memberName": "string",
          "picUrl": "string",
          "planId": "string",
          "planName": "string",
          "protein": 0,
          "submitTime": "string",
          "suggestTake": "string",
          "updateTime": "string"
        } */
      this.$refs['detail'].validate((valid) => {
        if (valid) {
          const data = this.detail
          /* 碳水 脂肪 热量 蛋白质 */
          data.carbonWater = 0
          data.fat = 0
          data.heat = 0
          data.protein = 0
          this.foodDetailList.forEach((item, index) => {
            const one = this.detail.detailList[index]
            // console.log(one)
            data.carbonWater += (+item?.carbonWater * +one.nums) || 0
            data.fat += (+item?.fat * +one.nums) || 0
            data.heat += (+item?.heat * +one.nums) || 0
            data.protein += (+item?.protein * +one.nums) || 0
          })
          data.carbonWater = Number(data.carbonWater.toFixed(2))
          data.fat = Number(data.fat.toFixed(2))
          data.heat = Number(data.heat.toFixed(2))
          data.protein = Number(data.protein.toFixed(2))
          data.editorName = this.editorName
          data.editorId = this.editorId
          data.updateTime = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
          // console.log(data)
          // return

          UpdateClockDetail(data).then(res => {
            console.log(res)
            this.$message.success('数据更新成功')
            this.dialogVisible = false
            this.getClockList()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$label-width:90px;
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
    width: calc(100% - #{$label-width});
    float: right;
  }
}
.card-picurl {
  border: 1px solid #eee;
  margin-left: 10px;
  width:150px;
  height:200px;
}
// ::v-deep .el-textarea{
//   width: calc(100% - #{$label-width});
//   float: right;
// }
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
  border-bottom: 1px solid #eee;
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
.label{
  width: $label-width;
  text-align: right;
}
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
  // align-items: center;
  line-height: 36px;
}
.text {
  padding: 5px 0;
  color: #666;
}
.flex-1 {
  flex: 1;
}
section{
  $num:12px;
  padding:0 0 $num 0;
  & +section {
    border-top: 1px solid #eee;
    padding-top: $num;
  }
}
::v-deep section .el-form-item{
  margin-bottom: 6px;
}
</style>
