const Mock = require('mockjs')
const TIME_FORMAT = 'yyyy-MM-dd hh:mm:ss'

module.exports = [
  /**
   * 食物分类下拉 ./plans.js
   * 食物下拉 ./plans.js
   */

  /** 食品库 食物列表 */
  {
    url: '/Admin/DICT/food-page',
    type: 'post',
    response: config => {

      const LAST_PAGE = 3,
        TOTAL = 26

      const {
        name, 
        categoryId,
        pageNum,
        pageSize = 10,
      } = config.body

      let data = new Array(pageNum == LAST_PAGE ? 6 : pageSize).fill({}).map(item => {

        return {
          ...item,
          id: '@increment',
          name: name || '@title(1, 3)',
          categoryId: categoryId || Mock.Random.integer(1, 99),

          "unit": 'g',
          "heat": Mock.Random.integer(1, 99),
          "protein": Mock.Random.integer(1, 99),
          "fat": Mock.Random.integer(1, 99),
          "carbonWater": Mock.Random.integer(1, 99),
          "creatorId": "@increment",
          "creatorName": "@cname",
          "createTime": Mock.Random.datetime(TIME_FORMAT),
        }

      })

      return {
        result: 1,
        total: TOTAL,
        data,
        message: "查询成功"
      }
    }
  },

  /** 食品库 新增食品 */
  {
    url: '/Admin/DICT/foodAdd',
    type: 'post',
    response: () => {

      return {
        result: 1,
        message: 'success'
      }
    }
  },

  /** 食品库 删除食品 */
  {
    url: '/Admin/DICT/foodDel',
    type: 'post',
    response: ({ body }) => {

      const { id } = body
      
      if (!id) {
        return {
          result: 0,
          message: 'id不能为空'
        }
      }

      return {
        result: 1,
        message: 'success'
      }

    }
  }
]