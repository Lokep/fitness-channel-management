
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
            v-model="searchQuery.planName"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
          />
        </div>

        <div class="tools-item align-center">
          <div class="tools-item__label">
            创建日期
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
            创建人
          </div>
          <el-input
            v-model="searchQuery.creatorName"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
          />
        </div>

      </div>

      <div class="tools-btns align-center">
        <el-button size="mini" type="success" icon="el-icon-search">查询</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus">新建</el-button>
      </div>
    </div>

    <div class="content">
      <el-table size="mini" border :data="clockList">
        <el-table-column align="center" label="序号" type="index" />
        <el-table-column align="center" prop="memberName" label="用户名称" />
        <el-table-column align="center" prop="planName" label="打卡计划名称" />
        <el-table-column align="center" prop="dayNum" label="打卡天数">
          <template slot-scope="{ row }">
            <div>{{ row.dayNum }} / {{ row.dayCount }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="typeName" label="打卡运动" />
        <el-table-column align="center" prop="suggestConsume" label="推荐消耗（千卡）" />
        <el-table-column align="center" prop="consumeFeat" label="消耗热量（千卡）" />
        <el-table-column align="center" prop="submitTime" label="提交时间" />
        <el-table-column align="center" prop="isRecord" label="记录状态">
          <template slot-scope="{ row }">
            <div>{{ row.isRecord== 1 ? '已记录' : '未记录' }} </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="操作">
          <template slot-scope="{ row }">
            <el-button v-if="row.isRecord==1" type="text" size="mini" @click="showDialog(row.id,true)">查看</el-button>
            <el-button v-else type="text" size="mini" @click="showDialog(row.id,false)">记录</el-button>
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
      title="记录运动"
      :visible.sync="dialogVisible"
      width="768px"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <el-row class="dialog-group">
        <el-col :span="12">
          <div class="grid-content bg-purple-dark  pb-5">
            <div class="label fl">用户名称:</div> <span>{{ detail.memberName }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark  pb-5">
            <div class="label fl">性别:</div> <span>性别</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark  pb-5">
            <div class="label fl">出生日期:</div> <span>出生日期</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark  pb-5">
            <div class="label fl">身高:</div> <span>身高</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark  pb-5">
            <div class="label fl">最新体重:</div> <span>最新体重</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark  pb-5">
            <div class="label fl">BMI:</div> <span>BMI</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark  pb-5">
            <div class="label fl">血型:</div> <span>血型</span>
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
        <!-- <el-col :span="12">
          <div class="grid-content bg-purple-dark pt-5 pb-5">
            <div class="label fl">打卡餐次:</div> <span>{{ detail.mealType | mealTypeParse }}</span>
          </div>
        </el-col> -->
        <el-col :span="12">
          <div class="grid-content bg-purple-dark pt-5 pb-5">
            <div class="label fl">推荐消耗:</div><span>{{ detail.suggestConsume }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark pt-5 pb-5">
            <div class="fl label">打卡时间:</div><span>{{ detail.submitTime }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark pt-5 pb-5">
            <div class="fl label">运动类型:</div><span>{{ detail.typeName }}</span>
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
        <el-col :span="12">
          <div>
            <el-form ref="detail" label-width="80px" :model="detail" :disabled="disabled">
              <el-form-item
                label="消耗热量"
                prop="consumeFeat"
                :rules="[
                  { required: true, message: '不能为空'},
                  { type: 'number', message: '必须为数字值'}
                ]"
              >
                <el-input v-model.number="detail.consumeFeat" type="number" />
              </el-form-item>
              <el-form-item
                label="运动建议"
                prop="advice"
                :rules="[
                  { required: true, message: '不能为空'}
                ]"
              >
                <el-input v-model="detail.advice" type="textarea" />
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button v-if="!disabled" type="primary" @click="submitHandle">记录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import user from '@/mixin/user'
import { parseTime } from '@/utils'
import { getClockList, clockGet, clockUpdate } from '@/api/fitness'
export default {
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
    }
  },
  mixins: [user],
  data() {
    return {
      disabled: false,
      dialogVisible: false,
      total: 10,
      clockList: [],
      searchQuery: {
        planName: '',
        beginTime: '',
        endTime: '',
        creatorName: '',
        pageNum: 1,
        pageSize: 10
      },
      detail: {}
    }
  },
  // computed: {
  //   formValidate: function() {
  //     /* mock 时可能没有找到 foodid 会显示0 */
  //     return (index) => {
  //       return this.detail.ruleList[index] || {}
  //     }
  //   }
  // },
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
    /* 记录提交 */
    submitHandle() {
      this.$refs['detail'].validate((valid) => {
        if (valid) {
          clockUpdate({
            advice: this.detail.advice,
            consumeFeat: this.detail.consumeFeat,
            id: this.detail.id
          }).then(res => {
            this.$message({
              type: 'success',
              message: '记录成功'
            })
            this.dialogVisible = false
            this.getClockList()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* 获取列表 */
    getClockList() {
      const searchQuery = this.searchQuery
      getClockList(searchQuery).then(res => {
        // console.log(res)
        this.clockList = res.data
        this.total = res.total
      })
    },
    /* 获取详情，以及判断是否可以编辑 */
    showDialog(id, disabled = false) {
      this.disabled = disabled
      clockGet({ id }).then(res => {
        this.detail = res.data
        this.dialogVisible = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$label-width:80px;
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
