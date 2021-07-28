
<template>
  <div class="plans">
    <!-- 操作模板 -->
    <div class="tools justify-between mb-10">
      <div class="tools-list align-center">

        <div class="tools-item align-center">
          <div class="tools-item__label">
            食物分类
          </div>
          <el-input
            v-model="input2"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
          />
        </div>

        <div class="tools-item align-center">
          <div class="tools-item__label">
            食物分类
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
      <el-table size="mini" border empty-text="暂无数据">
        <el-table-column align="center" props="" label="序号" />
        <el-table-column align="center" props="" label="食物名称" />
        <el-table-column align="center" props="" label="单位" />
        <el-table-column align="center" props="" label="食物分类" />
        <el-table-column align="center" props="" label="热量（千卡）" />
        <el-table-column align="center" props="" label="蛋白质（克）" />
        <el-table-column align="center" props="" label="脂肪（克）" />
        <el-table-column align="center" props="" label="碳水（克）" />
        <el-table-column align="center" props="" label="发布人" />
        <el-table-column align="center" props="" label="发布时间" />
        <el-table-column align="center" props="" label="操作">
          <template>
            <div>
              <el-button type="text" size="mini">编辑</el-button>
              <el-button type="text" size="mini" style="color: #F56C6C;">删除</el-button>
            </div>
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

  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>
