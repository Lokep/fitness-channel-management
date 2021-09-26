
<template>
  <div class="plans">
    <!-- 操作模板 -->
    <div class="tools justify-between mb-10">
      <div class="tools-list align-center">
        <div class="tools-item align-center">
          <div class="tools-item__label">计划名称</div>
          <el-input
            v-model="params.title"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            clearable
            @change="handleSearch"
            @clear="handleSearch"
          />
        </div>

        <div class="tools-item align-center">
          <div class="tools-item__label">创建日期</div>
          <el-date-picker
            v-model="date"
            size="mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable
            @change="handleSearchByDate"
            @clear="handleSearchByDate"
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
            @change="handleSearch"
            @clear="handleSearch"
          />
        </div>
      </div>

      <div class="tools-btns align-center">
        <el-button
          size="mini"
          type="success"
          icon="el-icon-search"
          @click="handleSearch"
        >查询</el-button>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="addSportsPlan"
        >新建</el-button>
      </div>
    </div>

    <div class="content">
      <el-table :data="planList" size="mini" border>
        <el-table-column align="center" prop="id" label="序号" type="index" />
        <el-table-column align="center" prop="title" label="标题" />
        <el-table-column align="center" prop="creatorName" label="创建人" />
        <el-table-column align="center" prop="createTime" label="创建时间" />
        <el-table-column align="center" prop="receiveNums" label="分发人次" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <el-button
              type="text"
              size="mini"
              @click="preview(row)"
            >查看</el-button>
            <el-button
              type="text"
              size="mini"
              @click="edit(row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="mini"
              @click="deletePlan(row)"
            >删除</el-button>
            <el-button
              type="text"
              size="mini"
              @click="transmit(row)"
            >分发</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination mt-10">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="params.total"
          @current-change="getSportsPlanList"
        />
      </div>
    </div>

    <el-dialog
      :title="isEdit ? '编辑计划' : '查看计划'"
      :visible.sync="isShowPlan"
      width="40%"
    >
      <div v-if="isEdit">
        <el-row class="mb-10">
          <el-col :span="6">标题：</el-col>
          <el-col :span="18">
            <el-input v-model="currentPlan.title" size="mini" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">详细内容：</el-col>
          <el-col :span="18">
            <el-input v-model="currentPlan.content" size="mini" type="textarea" maxlength="1000" rows="5" resize="false" />
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row class="mb-10">
          <el-col :span="6">标题：</el-col>
          <el-col :span="18">{{ currentPlan.title }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">详细内容：</el-col>
          <el-col :span="18">{{ currentPlan.content }}</el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <template v-if="isEdit">
          <el-button size="mini" @click="isEdit = false, isShowPlan = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button>
        </template>
        <template v-else>
          <el-button size="mini" @click="isEdit = false, isShowPlan = false">关闭</el-button>
        </template>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getSportsPlanList, getMemberList, deletePlan, transmitPlan } from '@/api/sports-plan'
export default {
  data() {
    return {
      date: [],
      isShowPlan: true,
      isEdit: false,
      params: {
        beginTime: null,
        creatorName: null,
        endTime: null,
        pageNum: 1,
        pageSize: 10,
        title: null,
        total: null
      },
      planList: [],
      currentPlan: {},
      member: {
        pageSize: 10,
        pageNum: 1,
        name: '',
        wechatName: '',
        total: null
      },
      memberList: []
    }
  },
  created() {
    this.getSportsPlanList()
    this.getMemberList()
  },
  methods: {
    addSportsPlan() {
      // addSportsPlan
    },

    handleSearch() {
      this.getSportsPlanList(1)
    },
    handleSearchByDate(e) {
      console.log(e)
      this.getSportsPlanList(1)
    },

    getSportsPlanList(pageNum = 1) {
      getSportsPlanList({
        ...this.params,
        pageNum
      }).then((res) => {
        if (res.result === 1) {
          this.planList = res.data
          this.params.total = res.total
          this.params.pageNum = pageNum
        }
      })
    },

    getMemberList() {
      getMemberList({
        ...this.member
      }).then((res) => {
        if (res.result === 1) {
          this.memberList = res.data
          this.member.total = res.total
        }
      })
    },

    preview(row) {
      this.currentPlan = row
      this.isShowPlan = true
      this.isEdit = false
    },
    edit(row) {
      this.currentPlan = row
      this.isShowPlan = true
      this.isEdit = true
    },
    deletePlan(row) {
      this.$confirm('此操作将删除该计划, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePlan({
          id: row.id
        }).then(res => {
          if (res.result === 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {})
    },
    transmit(row) {
      this.$confirm('是否确认下发该计划?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        transmitPlan({
          planId: row.id,
          memberList: this.memberList
        }).then(res => {
          if (res.result === 1) {
            this.$message({
              type: 'success',
              message: '下发成功!'
            })
          }
        })
      }).catch(() => {})
    }
  }
}
</script>
