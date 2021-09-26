
<template>
  <div class="plans">
    <!-- 操作模板 -->
    <div class="tools justify-between mb-10">
      <div class="tools-list align-center">
        <div class="tools-item align-center">
          <div class="tools-item__label">计划名称</div>
          <el-input
            v-model="searchQuery.planName"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
          />
        </div>

        <div class="tools-item align-center">
          <div class="tools-item__label">创建日期</div>
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
          <div class="tools-item__label">创建人</div>
          <el-input
            v-model="searchQuery.creatorName"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
          />
        </div>
      </div>

      <div class="tools-btns align-center">
        <el-button size="mini" type="success" icon="el-icon-search" @click="getSportsPlanList">查询</el-button>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-plus"
        >新建</el-button>
      </div>
    </div>

    <div class="content">
      <el-table size="mini" border :data="sportsPlanList">
        <el-table-column align="center" type="index" label="序号" />
        <el-table-column align="center" prop="planName" label="计划名称" />
        <el-table-column align="center" prop="dayCount" label="打卡天数" />
        <el-table-column align="center" prop="creatorName" label="创建人" />
        <el-table-column align="center" prop="createTime" label="创建时间" />
        <el-table-column align="center" prop="receiveNums" label="分发人次" />
        <el-table-column align="center" prop="" label="操作">
          <template slot-scope="{ row , $index}">
            <el-button type="text" size="mini" @click="edit(row.id, $index)">编辑</el-button>
            <el-button type="text" size="mini" @click="deleteHandle(row.id)">删除</el-button>
            <el-button type="text" size="mini" @click="distribute(row.id)">分发</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination mt-10">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="getSportsPlanList"
        />
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      title="编辑饮食计划"
      :visible.sync="dialogVisible"
      width="768px"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <el-form ref="detail" :model="detail">
        <el-form-item
          label="计划名称"
          label-width="100px"
          prop="planName"
          :rules="{
            required: true, message: '不能为空', trigger: 'blur'
          }"
        >
          <!-- 必填，1-20字，超出字数则不允许再输入 -->
          <el-input
            v-model="detail.planName"
            size="mini"
            autocomplete="off"
            maxlength="20"
            placeholder="请输入"
          />
        </el-form-item>
        <el-button v-if="detail.ruleList.length < 1" @click="addItem">添加计划</el-button>
        <template v-else>
          <DietPlanForm v-for="(item,index) in detail.ruleList" :key="index" class="mb-10">
            <template slot="title">
              <div>第{{ item.dayNum }}天</div>
            <!-- <div>消耗热量：400 千卡</div> -->
            </template>
            <template slot="right">
              <div class="flex">
                <i class="el-icon-circle-plus dialog-form__el cursor" @click="addItem" />
                <i v-if="index > 0" class="el-icon-error dialog-form__el cursor" @click="delItemHandle(index)" />
              </div>
            </template>
            <div>
              <el-form-item
                label="打卡内容:"
                label-width="100px"
                :prop="'ruleList.' + index + '.content'"
                :rules="{
                  required: true, message: '不能为空', trigger: 'blur'
                }"
              >
                <el-input
                  v-model="item.content"
                  size="mini"
                  autocomplete="off"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item
                label="建议消耗:"
                label-width="100px"
                :prop="'ruleList.' + index + '.recommendConsume'"
                :rules="{
                  required: true, message: '不能为空', trigger: 'blur'
                }"
              >
                <el-input
                  v-model="item.recommendConsume"
                  size="mini"
                  autocomplete="off"
                  placeholder="请输入"
                />
                千卡
              </el-form-item>
              <el-form-item
                label="运动建议:"
                label-width="100px"
                :prop="'ruleList.' + index + '.advice'"
                :rules="{
                  required: true, message: '不能为空', trigger: 'blur'
                }"
              >
                <el-input
                  v-model="item.advice"
                  size="mini"
                  autocomplete="off"
                  type="textarea"
                  placeholder="请输入"
                />
              </el-form-item>
            </div>
          </DietPlanForm>
          <template /></template></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitHandle">记录</el-button>
      </span>
    </el-dialog>
    <!-- 分发 -->
    <el-dialog
      title="分配用户"
      :visible.sync="dialogVisible2"
      width="768px"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          label="全选"
          width="55"
        />
        <el-table-column
          prop="wechatName"
          label="微信名称"
          show-overflow-tooltip
        />
        <el-table-column
          prop="name"
          label="用户名称"
        />
        <el-table-column
          prop="address"
          sex="性别"
          show-overflow-tooltip
        />
        <el-table-column
          prop="birth"
          label="出生日期"
          show-overflow-tooltip
        />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="planDistribute">分发</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import user from '@/mixin/user'
import { parseTime } from '@/utils'
import { getVipList, planDistribute, addPlan, getSportsPlanList, deleteSportsPlan, getSportsPlanDetail, updateSportsPlanDetail } from '@/api/fitness'
import DietPlanForm from '@/views/diet/components/diet-plan-form.vue'
export default {
  components: {
    DietPlanForm
  },
  mixins: [user],
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      total: 10,
      sportsPlanList: [],
      searchQuery: {
        planName: '',
        beginTime: '',
        endTime: '',
        creatorName: '',
        pageNum: 1,
        pageSize: 10
      },
      /* 健身运动详情 */
      detail: {
        id: '',
        planName: '',
        dayCount: '',
        ruleList: []
      },
      multipleSelection: [],
      tableData: [],
      planId: ''
    }
  },
  computed: {
    formValidate: function() {
      /* mock 时可能没有找到 foodid 会显示0 */
      return (index) => {
        return this.detail.ruleList[index] || {}
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
    this.getSportsPlanList()
  },
  methods: {
    planDistribute() {
      const memberList = []
      this.multipleSelection.forEach(item => {
        memberList.push(item.id)
      })
      planDistribute({
        memberList,
        planId: this.planId
      }).then(res => {
        console.log(res)
        // this.dialogVisible2 = false
      })
    },
    distribute(id) {
      getVipList().then(res => {
        /* 会员列表 */
        this.tableData = res.data
        this.dialogVisible2 = true
        this.planId = id
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    addItem() {
      const options = {
        advice: '',
        content: '',
        dayNum: this.detail.ruleList[this.detail.ruleList.length - 1]?.dayNum + 1 || 1,
        recommendConsume: '',
        createTime: parseTime(new Date()),
        planId: this.detail.id
      }
      this.detail.ruleList.push(options)
    },
    delItemHandle(index) {
      this.$confirm('你确定要删除这条数据吗？', '提示', { type: 'warning' }).then(res => {
        // const ruleList = this.detail.ruleList
        // delete this.detail.ruleList
        // ruleList.splice(index, 1)
        // this.detail.ruleList = ruleList
        this.detail.ruleList.splice(index, 1)
      })
    },
    /* 编辑提交 */
    submitHandle() {
      this.$refs['detail'].validate((valid) => {
        if (valid) {
          const options = this.detail
          updateSportsPlanDetail(options).then(res => {

          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* 编辑获取详情 */
    edit(id, index) {
      getSportsPlanDetail({
        id
      }).then(res => {
        this.detail = { ...res.data, ...this.sportsPlanList[index] }
        // this.detail.createTime = this.sportsPlanList[index].createTime
        // // this.detail.creatorId = this.creatorId
        // this.detail.creatorName = this.sportsPlanList[index].creatorName
        this.dialogVisible = true
        // console.log(res)
      })
    },
    /* 删除列表 */
    deleteHandle(id) {
      this.$confirm('你确定要删除这条数据吗？', '提示', { type: 'warning' }).then(res => {
        deleteSportsPlan({ id }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getSportsPlanList()
        })
      })
    },
    /* 运动计划列表 */
    getSportsPlanList() {
      const searchQuery = this.searchQuery
      getSportsPlanList({ ...searchQuery }).then(res => {
        this.sportsPlanList = res.data
        this.total = res.total
      })
    },
    /*  */
    addPlan() {
      return addPlan({
        createTime: '2021-09-14T13:25:25.892Z',
        creatorId: 'string',
        creatorName: 'string',
        dayCount: 0,
        id: 'string',
        isDelete: 0,
        planName: 'string',
        receiveNums: 0,
        ruleList: [
          {
            advice: 'string',
            content: 'string',
            createTime: '2021-09-14T13:25:25.892Z',
            dayNum: 0,
            id: 'string',
            planId: 'string',
            recommendConsume: 'string'
          }
        ],
        updateTime: '2021-09-14T13:25:25.892Z'
      }).then(res => {

      })
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-input,
.el-textarea{
  width: 300px;
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
</style>
