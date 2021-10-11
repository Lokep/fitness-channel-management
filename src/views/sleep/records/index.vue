<style lang="scss">
  .plans {
    .el-descriptions-item__content {
      flex: 1;
    }
  }
  .sleep-time {
    .el-input {
      width: 90px!important;
      margin-right: 5px;
      text-align: center;
    }
  }
  .is-require::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
</style>
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
            v-model="params.memberName"
            size="mini"
            placeholder="请输入用户名称"
            prefix-icon="el-icon-search"
            clearable
            @clear="handleSearch"
            @change="handleSearch"
          />
        </div>

        <div class="tools-item align-center">
          <div class="tools-item__label">
            提交日期
          </div>
          <el-date-picker
            v-model="date"
            size="mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable
            @clear="handleSearchByDate"
            @change="handleSearchByDate"
          />
        </div>

        <div class="tools-item align-center">
          <div class="tools-item__label">
            记录状态
          </div>
          <el-select
            v-model="params.isRecord"
            size="mini"
            clearable
            @change="handleSearch"
            @clear="handleSearch"
          >
            <el-option label="全部" value="" />
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>
        </div>

      </div>

      <div class="tools-btns align-center">
        <el-button size="mini" type="success" icon="el-icon-search" @click="handleSearch">查询</el-button>
      </div>
    </div>

    <div class="content">
      <el-table size="mini" border :data="sleepRecords">
        <el-table-column align="center" label="序号" type="index" />
        <el-table-column align="center" prop="memberName" label="用户名称" />
        <el-table-column align="center" prop="hour" label="睡眠时长">
          <template slot-scope="{row}">
            {{ row.hour }}小时{{ row.minute }}分钟
          </template>
        </el-table-column>
        <el-table-column align="center" prop="submitTime" label="提交时间" />
        <el-table-column align="center" prop="isRecord" label="记录状态">
          <template slot-scope="{row}">
            {{ row.isRecord ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <el-button v-if="row.isRecord" type="text" size="mini" @click="showRecord(row)">查看</el-button>
            <el-button v-else type="text" size="mini" @click="showRecord(row)">记录</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination mt-10">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="params.total"
          @current-change="handlePagination"
        />
      </div>
    </div>

    <el-dialog title="睡眠记录" width="45%" :visible.sync="isShowDialog">
      <div>
        <el-descriptions title="" :column="2">
          <el-descriptions-item label="用户名称">{{ memberInfo.name }}</el-descriptions-item>
          <el-descriptions-item label="性别">{{ memberInfo.sex ? '男' : '女' }}</el-descriptions-item>
          <el-descriptions-item label="出生日期">{{ memberInfo.birth == 'Invalid Date' ? '--' : memberInfo.birth }}</el-descriptions-item>
          <el-descriptions-item label="身高">{{ memberInfo.height }}</el-descriptions-item>
          <el-descriptions-item label="最新体重">{{ memberInfo.weight }}</el-descriptions-item>
          <el-descriptions-item label="BMI">{{ memberInfo.bmi }}</el-descriptions-item>
          <el-descriptions-item label="血型">{{ memberInfo.blood | bloodFilter }}</el-descriptions-item>
        </el-descriptions>

        <hr class="mb-10" style="color: #eee;border:0;background: #eee; height: 1px;">

        <el-row :gutter="20">

          <el-col :span="8">
            <el-descriptions title="" :column="1">
              <el-descriptions-item label="记录时间">{{ record.submitTime | handleTimeFilter }}</el-descriptions-item>
              <el-descriptions-item label="记录图片">
                <el-image fit="container" style="width: 100px; height: 100px;" :src="record.picUrl">
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </el-image>

              </el-descriptions-item>
            </el-descriptions>
          </el-col>

          <el-col :span="16">
            <el-descriptions title="" :column="1">
              <el-descriptions-item label="描述内容">{{ record.describe }}</el-descriptions-item>
              <el-descriptions-item label-class-name="is-require" label="睡眠时长">
                <div class="align-center sleep-time">
                  <div class="align-center mr-5">
                    <el-input v-model="record.hour" :disabled="record.isRecord == 1" size="mini" />
                    小时
                  </div>
                  <div class="align-center">
                    <el-input v-model="record.minute" :disabled="record.isRecord == 1" size="mini" />
                    分
                  </div>
                </div>
              </el-descriptions-item>
              <el-descriptions-item label="睡眠建议" style="flex: 1;">
                <div>
                  <el-input v-model="record.advice" :disabled="record.isRecord == 1" size="mini" type="textarea" rows="4" resize="none" />
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">关闭</el-button>
        <el-button v-if="record.isRecord == 0" size="mini" type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import * as dayjs from 'dayjs'
import { getSleepInfo, getSleepRecords, updateSleepRecord } from '@/api/sleep'
import { getMemberInfo } from '@/api/user'
export default {
  filters: {
    handleTimeFilter(time) {
      if (!time) return ''
      return dayjs(time).format('YYYY-MM-DD')
    },
    bloodFilter(blood) {
      const arr = ['未知', 'A', 'B', 'AB', 'O', '未知']
      return arr[blood] || '未知'
    }
  },
  data() {
    return {
      date: [],
      sleepRecords: [],
      isShowDialog: false,
      params: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        memberName: null,
        beginTime: null,
        endTime: null,
        isRecord: null
      },
      record: {

      },
      memberInfo: {}
    }
  },

  created() {
    this.handleSearch()
  },

  methods: {
    handleSearch() {
      this.params.pageNum = 1
      this.getSleepRecords()
    },
    handleSearchByDate(e) {
      if (!e) {
        this.params.beginTime = null
        this.params.endTime = null
        this.getSleepRecords()
        return
      }

      const [beginTime, endTime] = e
      this.params.pageNum = 1
      this.params.beginTime = dayjs(beginTime).format('YYYY-MM-DD') + ' 00:00:00'
      this.params.endTime = dayjs(endTime).format('YYYY-MM-DD') + ' 23:59:59'
      this.getSleepRecords()
    },
    handlePagination(e) {
      this.params.pageNum = e
      this.getSleepRecords()
    },
    handleClose() {
      this.isShowDialog = false
      this.record = {}
    },
    handleConfirm() {
      const { hour, minute } = this.record

      if (!hour && !minute) {
        this.$message.warning('请填写睡眠时长')
        return false
      }

      this.$confirm('是否确认更新该睡眠记录', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { id, advice = '', editorId = '1', editorName = 'admin' } = this.record
        updateSleepRecord({
          id, advice, hour, minute, editorId, editorName
        }).then(res => {
          if (res.result === 1) {
            this.handleClose()
            this.handleSearch()
            this.$message.success('更新成功')
          }
        })
      }).catch(() => {})
    },

    getSleepRecords() {
      const {
        pageNum,
        pageSize,
        memberName,
        beginTime,
        endTime,
        isRecord
      } = this.params
      getSleepRecords({
        pageNum,
        pageSize,
        memberName,
        beginTime,
        endTime, isRecord
      }).then(res => {
        if (res.result === 1) {
          this.params.total = res.total
          this.sleepRecords = res.data
        }
      })
    },

    showRecord(row) {
      const { id } = row

      if (!id) {
        return
      }

      getSleepInfo({ id }).then(res => {
        if (res.result === 1) {
          this.record = {
            ...this.record,
            ...res.data,
            ...row
          }

          this.isShowDialog = true
        }
        return res.data.memberId
      }).then(memberId => {
        this.getMemberInfo(memberId)
      })
    },

    getMemberInfo(memberId) {
      // const { }
      return getMemberInfo({
        id: memberId
      }).then(res => {
        this.memberInfo = res.data || {}
      })
    }
  }
}
</script>
