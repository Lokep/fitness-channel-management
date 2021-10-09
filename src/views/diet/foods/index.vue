<style lang="scss">
.foods {
  .align-center {
    & > div {
      flex-shrink: 0;
    }
  }
  .el-input {
    width: 210px;
  }
}
</style>
<template>
  <div class="foods">
    <!-- 操作模板 -->
    <div class="tools justify-between mb-10">
      <div class="tools-list align-center">

        <div class="tools-item align-center">
          <div class="tools-item__label">
            食物分类
          </div>
          <el-select
            v-model="params.categoryId"
            size="mini"
            clearable
            @change="handleSearch"
            @clear="handleSearch"
          >
            <el-option
              v-for="(item, index) in categoryList"
              :key="index"
              :label="item.name"
              :value="item.id"
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
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="isShowDialog = true">新建</el-button>
      </div>
    </div>

    <div class="content">
      <el-table :data="foodList" size="mini" border empty-text="暂无数据">
        <el-table-column align="center" type="index" label="序号" />
        <el-table-column align="center" prop="name" label="食物名称" />
        <el-table-column align="center" prop="unit" label="单位" />
        <el-table-column align="center" prop="categoryId" label="食物分类" />
        <el-table-column align="center" prop="heat" label="热量（千卡）" />
        <el-table-column align="center" prop="protein" label="蛋白质（克）" />
        <el-table-column align="center" prop="fat" label="脂肪（克）" />
        <el-table-column align="center" prop="carbonWater" label="碳水（克）" />
        <el-table-column align="center" prop="creatorName" label="发布人" />
        <el-table-column align="center" prop="createTime" label="发布时间">
          <template slot-scope="{ row }">
            {{ row.createTime | handleTimeFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <div>
              <el-button type="text" size="mini" @click="showEdit(row)">编辑</el-button>
              <el-button type="text" size="mini" style="color: #F56C6C;" @click="deleteFood(row)">
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

    <el-dialog
      title="编辑食物"
      width="45%"
      :visible.sync="isShowDialog"
    >

      <div>
        <el-form :inline="true" :model="food" class="demo-form-inline" label-width="7em">
          <el-form-item label="食物名称" required>
            <el-input v-model="food.name" size="mini" placeholder="请输入食物名称" />
          </el-form-item>

          <el-form-item label="食物分类" required>
            <el-select v-model="food.categoryId" size="mini" placeholder="请选择食物分类">

              <el-option
                v-for="(item, index) in categoryList"
                :key="index"
                :label="item.name"
                :value="item.id"
              />

            </el-select>
          </el-form-item>

          <el-form-item label="单位" required>
            <el-input v-model="food.unit" size="mini" placeholder="请输入食物单位" />
          </el-form-item>

          <el-form-item label="热量" required>
            <div class="align-center">
              <el-input v-model="food.heat" class="mr-5" size="mini" />
              <div>千卡</div>
            </div>
          </el-form-item>

          <el-form-item label="蛋白" required>
            <div class="align-center">
              <el-input v-model="food.protein" class="mr-5" size="mini" />克
            </div>
          </el-form-item>

          <el-form-item label="脂肪" required>
            <div class="align-center">
              <el-input v-model="food.fat" class="mr-5" size="mini" />克
            </div>
          </el-form-item>

          <el-form-item label="碳水化合物" required>
            <div class="align-center">
              <el-input v-model="food.carbonWater" class="mr-5" size="mini" />
              克
            </div>

          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getDishCategoryList, getFoodList } from '@/api/diet'
import { addFood, editFood } from '@/api/food'
import dayjs from 'dayjs'
export default {
  filters: {
    handleTimeFilter(time) {
      if (!time) return ''
      return dayjs(time).format('YYYY-MM-DD')
    }
  },
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
      total: 0,
      food: {
        categoryId: null,
        name: null,
        protein: null,
        fat: null,
        unit: null,
        carbonWater: null,
        heat: null
      },
      isShowDialog: false,
      isEdit: false
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

    handleClose() {
      this.isShowDialog = false
      this.isEdit = false
      this.food = {
        categoryId: null,
        name: null,
        protein: null,
        fat: null,
        unit: null,
        carbonWater: null,
        heat: null
      }
    },

    handleConfirm() {
      if (this.isEdit) {
        this.editFood()
      } else {
        this.addFood()
      }
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
    },

    addFood() {
      this.$confirm('是否确认添加？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        addFood({
          creatorId: '1',
          creatorName: 'admin',
          ...this.food
        }).then(res => {
          if (res.result === 1) {
            this.handleClose()
            this.handleSearch()
            this.$message.success('添加成功')
          }
        })
      }).catch(() => {})
    },
    showEdit(row) {
      this.food = JSON.parse(JSON.stringify(row))
      this.isEdit = true
      this.isShowDialog = true
    },

    editFood() {
      this.$confirm('是否确认提交？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editFood({
          creatorId: '1',
          creatorName: 'admin',
          ...this.food
        }).then(res => {
          if (res.result === 1) {
            this.handleClose()
            this.handleSearch()
            this.$message.success('更新成功')
          }
        })
      }).catch(() => {})
    }

  }

}
</script>
