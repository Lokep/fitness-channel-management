
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
            v-model="input2"
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
            v-model="value1"
            size="mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>

        <div class="tools-item align-center">
          <div class="tools-item__label">
            饮食建议
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
            记录状态
          </div>
          <el-select size="mini">
            <el-option>全部</el-option>
          </el-select>
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
        <el-table-column align="center" props="" label="用户名称" />
        <el-table-column align="center" props="" label="打卡计划名称" />
        <el-table-column align="center" props="" label="打卡天数" />
        <el-table-column align="center" props="" label="餐次" />
        <el-table-column align="center" props="" label="建议摄入（千卡）" />
        <el-table-column align="center" props="" label="热量（千卡）" />
        <el-table-column align="center" props="" label="蛋白质（克）" />
        <el-table-column align="center" props="" label="脂肪（克）" />
        <el-table-column align="center" props="" label="碳水（克）" />
        <el-table-column align="center" props="" label="提交时间" />
        <el-table-column align="center" props="" label="记录状态" />
        <el-table-column align="center" props="" label="操作">
          <template>
            <div>
              <el-button type="text" size="mini">记录</el-button>
              <el-button type="text" size="mini">修改</el-button>
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
