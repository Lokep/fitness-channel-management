const Mock = require('mockjs')

module.exports = [
  {
    url: '/Admin/DICT/category-list',
    type: 'post',
    response: config => {
      return {
        data: {
          ...Mock.mock({
            'list|10': [
              {
                id: '@increment',
                name: () => Mock.Random.ctitle(5),
                categoryType: function() {
                  return this.id
                }
              }
            ]
          })
        },
        result: 1
      }
    }
  },
  {
    url: '/Admin/DICT/food-list',
    type: 'post',
    response: config => {
      console.log(config)
      if (config.body?.categoryId) {
        return {
          data: {
            ...Mock.mock({
              'list|10': [
                {
                  id: '@increment',
                  // 'id|1': [140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150],
                  name: () => Mock.Random.ctitle(5),
                  'unit|1': ['条', '只', '杯', '头', '盘', '斤'],
                  categoryId: '@increment',
                  heat: '@integer(1, 3)',
                  protein: '@integer(1, 3)',
                  fat: '@integer(1, 3)',
                  carbonWater: '@integer(1, 3)'
                }
              ]
            })
          },
          message: '请求成功',
          result: 1
        }
      } else {
        /* 如果没有分类id */
        return {
          result: 0,
          message: 'post-data categoryId is not defined'
        }
      }
    }
  }
]
