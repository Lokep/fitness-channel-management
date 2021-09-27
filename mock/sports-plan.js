const Mock = require('mockjs')
const TIME_FORMAT = 'yyyy-MM-dd hh:mm:ss'
module.exports = [{
    url: '/Admin/Repository/add',
    type: 'post',
    response: config => {
      // {
      //   "content": "string",
      //   "createTime": 0,
      //   "creatorId": "string",
      //   "creatorName": "string",
      //   "id": "string",
      //   "isDelete": 0,
      //   "receiveNums": 0,
      //   "title": "string",
      //   "updateTime": 0
      // }

      return {
        'result': 1,
        'data': true,
        'message': '成功'
      }
    }
  },
  /** 计划列表 */
  {
    url: '/Admin/Repository/list',
    type: 'post',
    response: ({
      body
    }) => {
      const {
        pageNum,
        pageSize
      } = body
      return {
        result: 1,
        'data|10': [{
          'id|0-10': 1,
          'title': Mock.Random.cname(),
          'content': Mock.Random.cparagraph(3, 5),
          'creatorName': 'admin',
          'receiveNums': Mock.Random.integer(3, 5),
          'createTime': Mock.Random.datetime(TIME_FORMAT)
        }],

        'total': 10

      }
    }
  },
  /** 会员列表 */
  {
    url: '/Admin/Member/list',
    type: 'post',
    response: ({
      body
    }) => {

      return {
        "result": 1,
        "total": 1,
        "data|10": [{
          "id": "1",
          "name": "@cname",
          "wechatName": "@name",
          "mobile": '@integer(150, 190)',
          "openId": "199192",
          "sex": Mock.Random.boolean(),
          "birth": "@date",
          "height": "@integer(130000000000, 190000000000)",
          "weight": "@integer(50, 90)",
          "blood": true
        }],
        "message": "查询成功"
      }
    }
  },
  /** 删除计划 */
  {
    url: '/Admin/Repository/del',
    type: 'post',
    response: ({ body }) => {
      if (!body.id) {
        return {
          result: 0,
          message: 'id不可为空'
        }
      }
      return {
        result: 1,
        message: 'success'
      }
    }
  },
  /** 下发计划 */
  {
    url: '/Admin/Repository/planDistribute',
    type: 'post',
    response: ({ body }) => {

      const { planId = '', memberList = [] } = body

      if (!planId || memberList.length == 0) {
        return {
          result: 0,
          message: 'planId或memberList不能为空'
        }
      }

      return {
        result: 1,
        message: 'success'
      }
    }
  }
]
