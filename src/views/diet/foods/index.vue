
<template>
  <div class="plans">
    <!-- 操作模板 -->
    <div class="tools justify-between mb-10">
      <div class="tools-list align-center">

        <div class="tools-item align-center">
          <div class="tools-item__label">
            食物分类
          </div>
          <el-select v-model="params.categoryId" size="mini">
            <el-option
              v-for="(item, index) in categoryList"
              :key="index"
              :label="item.name"
              :value="item.id"
              clearable
              @change="handleSearch"
              @clear="handleSearch"
            />
          </el-select>
        </div>

        <div class="tools-item align-center">
          <div class="tools-item__label">
            食物名称
          </div>
          <el-input
            v-model="params.name"
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
        <el-button size="mini" type="success" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus">新建</el-button>
      </div>
    </div>

    <div class="content">
      <el-table :data="foodList" size="mini" border empty-text="暂无数据">
        <el-table-column align="center" prop="id" label="序号" />
        <el-table-column align="center" prop="name" label="食物名称" />
        <el-table-column align="center" prop="unit" label="单位" />
        <el-table-column align="center" prop="categoryId" label="食物分类" />
        <el-table-column align="center" prop="heat" label="热量（千卡）" />
        <el-table-column align="center" prop="protein" label="蛋白质（克）" />
        <el-table-column align="center" prop="fat" label="脂肪（克）" />
        <el-table-column align="center" prop="carbonWater" label="碳水（克）" />
        <el-table-column align="center" prop="creatorName" label="发布人" />
        <el-table-column align="center" prop="createTime" label="发布时间" />
        <el-table-column align="center" label="操作">
          <template>
            <div>
              <el-button type="text" size="mini">编辑</el-button>
              <el-button type="text" size="mini" style="color: #F56C6C;">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination mt-10">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePagination"
        />
      </div>
    </div>

  </div>
</template>

<script>
import { getDishCategoryList, getFoodList } from '@/api/diet'
export default {
  data() {
    return {
      params: {
        name: null,
        categoryId: null,
        pageNum: 0,
        pageSize: 10
      },
      foodList: [],
      categoryList: [],
      total: 0
    }
  },

  async created() {
    await this.getCategroyList()
    this.getFoodList()
  },

  methods: {

    handleSearch() {
      this.params.pageNum = 0
      this.getFoodList()
    },

    handlePagination(e) {
      this.params.pageNum = e - 1
      this.getFoodList()
    },

    getFoodList() {
      const { pageNum } = this.params
      getFoodList({
        ...this.params,
        pageNum: pageNum + 1
      }).then(res => {
        console.log(res.data)
        if (res.result === 1) {
          this.foodList = res.data
          this.total = res.total
        }
      })
    },

    getCategroyList() {
      return getDishCategoryList({
        categoryType: 1
      }).then(res => {
        if (res.result === 1) {
          this.categoryList = res.data
        }
      })
    }

  }

}
</script>
