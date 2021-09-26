const Mock = require('mockjs')

module.exports = [
  {
    url: '/Admin/Motion/planList',
    type: 'post',
    response: config => {
      return {
        data: {
          ...Mock.mock({
            'list|10': [
              {
                id: '@increment',
                planName: () => Mock.Random.ctitle(5),
                creatorName: () => Mock.Random.cname(),
                receiveNums: () => Mock.Random.integer(1, 2000),
                createTime: () => Mock.Random.date(),
                'dayCount|1': [1, 2, 3, 4, 5, 6, 7]
              }
            ],
            total: 100
          })
        },
        result: 1
      }
    }
  },
  {
    url: '/Admin/Motion/clockList',
    type: 'post',
    response: config => {
      return {
        data: {
          ...Mock.mock({
            'list|10': [
              {
                id: '@increment',
                memberId: '@increment',
                memberName: () => Mock.Random.ctitle(5),
                planName: () => Mock.Random.ctitle(5),
                'typeName|1': [0, 1],
                'suggestConsume|1': [0, 1],
                'consumeFeat|1': [0, 1],
                'submitTime': Mock.Random.date(),
                'isRecord|1': [0, 1],
                'dayNum|1': () => [1, 2, 3, 4, 5, 6, 7],
                'dayCount|1': () => [1, 2, 3, 4, 5, 6, 7]
              }
            ]
          })
        },
        result: 1
      }
    }
  }
]
