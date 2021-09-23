const Mock = require('mockjs')

module.exports = [
  {
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
  {
    url: '/Admin/Repository/list',
    type: 'post',
    response: ({ body }) => {
      const { pageNum, pageSize } = body
      return {
        result: 1,
        'data': {
          'list|10': [{
            'id|0-10': 1,
            'title': Mock.Random.cname(),
            'content': Mock.Random.cparagraph(3, 5),
            'creatorName': 'admin',
            'receiveNums': Mock.Random.integer(3, 5),
            'createTime': Mock.Random.datetime('YYYY-MM-DD')
          }],
          'total': {
            pageNum,
            pageSize
          }
        }
      }
    }
  }
]
