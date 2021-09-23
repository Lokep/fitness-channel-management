const Mock = require('mockjs')
const TIME_FORMAT = 'yyyy-MM-dd hh:mm:ss'

module.exports = [
  /** 饮食计划列表 */
  {
    url: '/Admin/Diet/planList',
    type: 'post',
    response: config => {
      const LAST_PAGE = 3
      const TOTAL = 26

      const {
        beginTime,
        creatorName,
        endTime,
        pageNum,
        pageSize = 10,
        planName
      } = config.body

      const data = new Array(pageNum === LAST_PAGE ? 6 : pageSize).fill({}).map(item => {
        const createTime = Math.ceil(Math.random() * 10) % 2 === 1 ? beginTime : endTime

        return {
          ...item,
          id: '@increment',
          planName: planName || '@title(1, 3)',
          dayCount: Mock.Random.integer(1, 99),
          creatorName: creatorName || Mock.Random.cname(),
          createTime: createTime || Mock.Random.datetime(TIME_FORMAT),
          receiveNums: Mock.Random.integer(1, 10)
        }
      })

      return {
        result: 1,
        total: TOTAL,
        data,
        message: '查询成功'
      }
    }
  },

  /** 饮食计划删除 */
  {
    url: '/Admin/Diet/planDel',
    type: 'post',
    response: ({
      body
    }) => {
      const result = Math.ceil(Math.random() * 10) % 3 === 0 ? 0 : 1

      const {
        id = ''
      } = body

      return {
        result: id && result ? 1 : 0,
        message: id && result === 1 ? '成功' : '失败'
      }
    }
  },

  /** 新增饮食计划 */
  {
    response: ({
      body
    }) => {
      const {
        createTime,
        creatorId,
        creatorName,
        dayCount,
        // id,
        // isDelete,
        planName,
        receiveNums,
        ruleList,
        updateTime
      } = body

      if (!creatorName || !createTime || !creatorId || !dayCount || !planName || !updateTime || !receiveNums) {
        return {
          result: 0,
          message: '新增失败'
        }
      } else if (
        !ruleList ||
        ruleList.length === 0 ||
        ruleList.findIndex(item => !item.detailList || item.detailList.length === 0) > -1
      ) {
        return {
          result: 0,
          message: '新增失败'
        }
      }

      return {
        result: 1,
        message: '新增成功'
      }
    }
  },

  {
    url: '/Admin/Diet/planUpdate',
    type: 'post',
    response: ({
      body
    }) => {
      const {
        createTime,
        creatorId,
        creatorName,
        dayCount,
        id,
        // isDelete,
        planName,
        receiveNums,
        ruleList,
        updateTime
      } = body

      if (!id || !creatorName || !createTime || !creatorId || !dayCount || !planName || !updateTime || !receiveNums) {
        return {
          result: 0,
          message: '新增失败'
        }
      } else if (
        !ruleList ||
        ruleList.length === 0 ||
        ruleList.findIndex(item => !item.detailList || item.detailList.length === 0) > -1
      ) {
        return {
          result: 0,
          message: '新增失败'
        }
      }

      return {
        result: 1,
        message: '新增成功'
      }
    }
  },

  /** 食物分类（下拉框） */
  {
    url: '/Admin/DICT/category-list',
    type: 'post',
    response: ({ body }) => {
      const { categoryType } = body

      if (categoryType !== 1) {
        return {
          result: 0,
          data: [],
          message: 'categoryType目前只能等于1'
        }
      }

      return {
        result: 1,
        data: [
          {
            'id': '1',
            'name': '谷类及薯类',
            'categoryType': true,
            'createTime': Mock.random.datetime(TIME_FORMAT),
            'isDelete': false
          },
          {
            'id': '2',
            'name': '动物性食物',
            'categoryType': true,
            'createTime': Mock.random.datetime(TIME_FORMAT),
            'isDelete': false
          },
          {
            'id': '3',
            'name': '豆类和坚果类',
            'categoryType': true,
            'createTime': Mock.random.datetime(TIME_FORMAT),
            'isDelete': false
          },
          {
            'id': '4',
            'name': '蔬菜、水果和菌藻类',
            'categoryType': true,
            'createTime': Mock.random.datetime(TIME_FORMAT),
            'isDelete': false
          },
          {
            'id': '5',
            'name': '纯能量食物',
            'categoryType': true,
            'createTime': Mock.random.datetime(TIME_FORMAT),
            'isDelete': false
          },
          {
            'id': '6',
            'name': '其他',
            'categoryType': true,
            'createTime': Mock.random.datetime(TIME_FORMAT),
            'isDelete': false
          }
        ],
        message: '成功'
      }
    }
  },

  /** 食物（下拉框） */
  {
    url: '/Admin/DICT/food-list',
    type: 'post',
    response: ({ body }) => {
      const { categoryId } = body

      const data = new Array(7).fill({}).map(item => {
        return {
          ...item,

          id: '@increment',
          name: '@cname',
          unit: '克',
          categoryId: categoryId,
          heat: '@integer(1, 3)',
          protein: '@integer(1, 5)',
          fat: '@integer(1, 3)',
          carbonWater: '@integer(1, 8)'
        }
      })

      return {
        result: 1,
        data,
        message: 'success'
      }
    }
  }
]
