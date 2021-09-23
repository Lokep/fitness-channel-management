const Mock = require('mockjs')
const TIME_FORMAT = 'yyyy-MM-dd hh:mm:ss'

module.exports = [
  
  /** 饮食打卡列表 */
  {
    url: '/Admin/Diet/clockList',
    type: 'post',
    response: ({ body }) => {

      const LAST_PAGE = 3,
        TOTAL = 26

      const {
        beginTime,
        isRecord,
        memberName,
        endTime,
        pageNum,
        pageSize = 10,
        planName
      } = body

      let data = new Array(pageNum == LAST_PAGE ? 6 : pageSize).fill({}).map(item => {

        const createTime = Math.ceil(Math.random() * 10) % 2 == 1 ? beginTime : endTime

        return {
          ...item,
          id: '@increment',
          planName: planName || '@title(1, 3)',

          dayCount: Mock.Random.integer(1, 99),
          dayNum: Mock.Random.integer(1, 99),

          isRecord: isRecord || '@integer(0, 1)',

          memberId: Mock.Random.integer(1, 100),
          memberName: memberName || Mock.Random.cname(),

          createTime: createTime || Mock.Random.datetime(TIME_FORMAT),
          receiveNums: Mock.Random.integer(1, 10),

          suggestTake: Mock.Random.integer(1, 10),
          heat: Mock.Random.integer(1, 10),
          protein: Mock.Random.integer(1, 10),
          fat: Mock.Random.integer(1, 10),
          carbonWater: Mock.Random.integer(1, 10),
          submitTime: Mock.random.datetime(TIME_FORMAT),
        }

      })

      return {
        result: 1,
        total: TOTAL,
        data,
        message: "查询成功"
      }
    }
  }
]