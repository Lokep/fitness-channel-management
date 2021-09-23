const Mock = require('mockjs')

module.exports = [
  /** 饮食计划列表 */
  {
    url: '/Admin/Diet/planList',
    type: 'post',
    response: config => {

      const LAST_PAGE = 3,
        TOTAL = 26

      const {
        beginTime,
        creatorName,
        endTime,
        pageNum,
        pageSize = 10,
        planName
      } = config.body

      let data = new Array(pageNum == LAST_PAGE ? 6 : pageSize).fill({}).map(item => {

        const createTime = Math.ceil(Math.random() * 10) % 2 == 1 ? beginTime : endTime

        return {
          ...item,
          id: '@increment',
          planName: planName || '@title(1, 3)',
          dayCount: Mock.Random.integer(1, 99),
          creatorName: creatorName || Mock.Random.cname(),
          createTime: createTime || Mock.Random.datetime('yyyy-MM-dd hh:mm:ss'),
          receiveNums: Mock.Random.integer(1, 10)
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
  
]
