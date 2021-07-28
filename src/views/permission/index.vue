
<template>
  <div class="plans">
    <!-- 操作模板 -->
    <div class="tools justify-between mb-10">
      <div class="tools-list align-center">

        <div class="tools-item align-center">
          <div class="tools-item__label">
            用户名
          </div>
          <el-input
            v-model="input2"
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
      <el-table size="mini" border>
        <el-table-column align="center" props="" label="序号" type="index" />
        <el-table-column align="center" props="" label="用户名" />
        <el-table-column align="center" props="" label="创建人" />
        <el-table-column align="center" props="" label="创建时间" />
        <el-table-column align="center" props="" label="操作">
          <template>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
            <el-button type="text" size="mini">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination mt-10">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
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
export default {
  data() {
    return {
      isShowEditModalVisible: true,
      isShowPasswordVisible: false,
      adminInfo: {
        name: '',
        password: ''
      }
    }
  }
}
</script>
