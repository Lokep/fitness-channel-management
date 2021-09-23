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
  },


  /**  */
  {
    url: '/Admin/Diet/clockGet',
    type: 'post',
    response: ({ body }) => {
      const  { id } = body
      
      if (!id) {
        return {
          result: 0,
          data: {},
          message: 'id不能为空'
        }
      }

      let data = []

      for (let i = 1; i <= 4; i++) {
        data.push({
          "id": "@increment",
          "memberId": "@increment",
          "planName": "@ctitle",
          "mealType": i,
          "submitTime": Mock.random.datetime(TIME_FORMAT),
          "picUrl": Mock.random.image('100*100', 'skyblue'),
          "dayNum": '@integer(1, 10)',
          "dayCount": '@integer(1, 10)',
          "suggestTake": '@integer(1, 10)',
          "describe|描述内容": Mock.random.cparagraph(1, 3),
          "advice": Mock.random.cparagraph(1, 3),
          "detailList": [
            {
              "id": "@increment",
              categoryId: "@increment",
              foodId: "@increment",
              nums: '@integer(1, 10)'
            }
          ],
        })
      }

      return {
        result: 1,
        data,
        message: 'success'
      }
    }
  }
]