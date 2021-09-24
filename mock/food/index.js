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
                  name: () => Mock.Random.ctitle(5),
                  'xx|1': ['条', '只', '杯', '头', '盘', '斤'],
                  categoryId: 1,
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