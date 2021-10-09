/* eslint-disable no-unused-vars */

<template>
  <div class="plans">
    <!-- 操作模板 -->
    <div class="tools justify-center mb-10">
      <div class="tools-list align-center">

        <div class="tools-item align-center">
          <div class="tools-item__label">
            帐号
          </div>
          <el-input
            v-model="searchQuery.account"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            clearable
            @clear="handleSearch"
            @change="handleSearch"
          />
        </div>
        <div class="tools-item align-center">
          <div class="tools-item__label">
            用户名
          </div>
          <el-input
            v-model="searchQuery.name"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            clearable
            @clear="handleSearch"
            @change="handleSearch"
          />
        </div>
      </div>
      <div class="tools-btns align-center">
        <el-button size="mini" type="success" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="isShowEditModalVisible = true">新建</el-button>
      </div>

    </div>

    <div class="content">
      <el-table size="mini" border :data="userList">
        <el-table-column align="center" label="序号" type="index" />
        <el-table-column align="center" prop="account" label="帐号" />
        <el-table-column align="center" prop="phone" label="手机号" />
        <el-table-column align="center" prop="creatorName" label="创建人" />
        <el-table-column align="center" prop="createTime" label="创建时间">
          <template slot-scope="{ row }">
            {{ row.createTime | parseTimeFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" size="mini" @click="showEditPasswordModal(row)">编辑</el-button>
            <el-button type="text" size="mini" style="color: #F56C6C;" @click="deleteUser(row.id)">删除</el-button>
            <el-button type="text" size="mini" @click="resetPassword(row)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination mt-10">
        <el-pagination
          :current-page.sync="searchQuery.pageNum"
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="getUserList"
        />
      </div>
    </div>

    <!-- dialog -->
    <el-dialog title="创建账号" :visible.sync="isShowEditModalVisible" width="40%">
      <el-form ref="adminInfo" size="mini" :model="adminInfo" label-width="80px">
        <el-form-item label="账号" prop="account" :rules="[{required:true,message:'不能为空'}]">
          <el-input v-model.trim="adminInfo.account" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phone"
          :rules="[
            {required:true,message:'不能为空',trigger:'blur'},
            {min:11,max:11,message:'请填入11位手机号',trigger:'blur'},
            {pattern:/^1[3456789]\d{9}$/,message:'请输入正确手机号',trigger:'blur'},
          ]"
        >
          <el-input v-model.trim="adminInfo.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="用户名" prop="username" :rules="[{required:true,message:'不能为空'}]">
          <el-input v-model.trim="adminInfo.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="默认密码" prop="password" :rules="[{required:true,message:'不能为空'}]">
          <el-input v-model.trim="adminInfo.password" placeholder="默认密码123456" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="creareHandle">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="isShowPasswordVisible">
      <el-form size="mini" :model="adminInfo" label-width="7em">
        <el-form-item label="原密码" required>
          <el-input v-model.trim="pwd.origin" type="password" />
        </el-form-item>

        <el-form-item label="新密码" required label-width="7em">
          <el-input v-model.trim="pwd.new" type="password" />
        </el-form-item>

        <el-form-item label="确认新密码" required label-width="7em">
          <el-input v-model.trim="pwd.confirm" type="password" placeholder="默认密码123456" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="hideEditPasswordModal">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleUpdatePassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import user from '@/mixin/user'
import * as dayjs from 'dayjs'
import { getUserList, deleteUser, addUser, updatePwd } from '@/api/user'
export default {
  filters: {
    parseTimeFilter(e) {
      return dayjs(e).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  mixins: [user],
  data() {
    return {
      total: 10,
      isShowEditModalVisible: false,
      isShowPasswordVisible: false,
      adminInfo: {
        username: '',
        account: '',
        password: '',
        phone: ''
      },
      pwd: {
        id: '',
        origin: '',
        confirm: '',
        new: ''
      },
      searchQuery: {
        account: '',
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      userList: []
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    handleSearch() {
      this.searchQuery.pageNum = 1
      this.getUserList()
    },

    showEditPasswordModal({ id }) {
      this.pwd.id = id
      this.isShowPasswordVisible = true
    },
    hideEditPasswordModal() {
      this.isShowPasswordVisible = false
      this.pwd = {
        origin: '',
        confirm: '',
        new: '',
        id: ''
      }
    },
    handleUpdatePassword() {
      const { id, new: newPwd, confirm } = this.pwd

      if (confirm !== newPwd) {
        this.$message.warning('两次新密码输入不一致')
        return
      }

      this.$confirm('此操作将覆盖该用户的密码，是否确认执行?', '提示', { type: 'warning' }).then(() => {
        updatePwd({
          id,
          password: newPwd
        }).then(res => {
          if (res.result === 1) {
            this.$message.success('重置成功')
            this.getUserList()
            this.hideEditPasswordModal()
          }
        })
      })
    },

    /* 删除账户 */
    deleteUser(id) {
      this.$confirm('是否确认删除？', '提示', {
        type: 'warning'
      }).then(() => {
        deleteUser({ id }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getUserList()
        })
      })
    },

    /* 获取用户列表 */
    getUserList() {
      getUserList({
        ...this.searchQuery
      }).then(res => {
        this.userList = res.data
        this.total = res.total
      })
    },

    /* 创建账号密码 */
    creareHandle() {
      this.$refs['adminInfo'].validate((valid) => {
        if (valid) {
          // alert('submit!')
          const otpions = {
            ...this.adminInfo
          }
          /* 确保 新增 */
          delete otpions.id
          this.$confirm('是否确认新增', '提示', {
            type: 'warning'
          }).then(() => {
            addUser(otpions).then(res => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              const arr = ['username', 'account', 'password', 'phone']
              arr.forEach(item => {
                this.$set(this.adminInfo, item, '')
              })
              this.isShowEditModalVisible = false
              this.getUserList()
            })
          }).catch(() => {})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    resetPassword({ id }) {
      this.$confirm('此操作将重置该用户的密码，是否确认执行?', '提示', { type: 'warning' }).then(() => {
        updatePwd({
          id,
          password: '123456'
        }).then(res => {
          if (res.result === 1) {
            this.$message.success('重置成功')
            this.getUserList()
          }
        })
      })
    }
  }
}
</script>
