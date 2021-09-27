
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
            :clearable="true"
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
            :clearable="true"
          />
        </div>
      </div>
      <div class="tools-btns align-center">
        <el-button size="mini" type="success" icon="el-icon-search" @click="getUserList">查询</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus">新建</el-button>
      </div>

    </div>

    <div class="content">
      <el-table size="mini" border :data="userList">
        <el-table-column align="center" label="序号" type="index" />
        <el-table-column align="center" props="account" label="帐号" />
        <el-table-column align="center" props="username" label="用户名" />
        <el-table-column align="center" props="" label="创建人" />
        <el-table-column align="center" props="rolename" label="角色名称" />
        <el-table-column align="center" prop="" label="创建时间">
          <template slot-scope="{ row }">
            {{ row.createTime | parseTimeFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" props="" label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini" style="color: #F56C6C;" @click="deleteUser(row.id)">删除</el-button>
            <el-button type="text" size="mini">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination mt-10">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
        />
      </div>
    </div>

    <!-- dialog -->
    <el-dialog title="创建账号" :visible.sync="isShowEditModalVisible" width="40%">
      <el-form size="mini" model="adminInfo" label-width="80px">
        <el-form-item label="用户名" required>
          <el-input v-model="adminInfo.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="默认密码" required>
          <el-input v-model="adminInfo.password" placeholder="默认密码123456" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="isShowPasswordVisible">
      <el-form size="mini" model="adminInfo" label-width="80px">
        <el-form-item label="用户名" required>
          <el-input v-model="adminInfo.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="默认密码" required>
          <el-input v-model="adminInfo.password" placeholder="默认密码123456" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import user from '@/mixin/user'
import * as dayjs from 'dayjs'
import { getUserList, deleteUser } from '@/api/user'
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
        name: '',
        password: ''
      },
      searchQuery: {
        account: '',
        name: ''
      },
      userList: [{ id: 10086 }]
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
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
    getUserList() {
      getUserList({
        ...this.searchQuery
      }).then(res => {
        this.userList = res.data
        this.total = res.total
      })
    }
  }
}
</script>
