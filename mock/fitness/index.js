const Mock = require('mockjs')
// module.exports = []
module.exports = [
  /* 健身运动删除 */
  {
    url: '/Admin/Motion/planDel',
    type: 'post',
    response: ({ body }) => {
      if (body?.id) {
        return {
          result: 1,
          message: '删除成功'
        }
      }
      return {
        result: 0,
        message: '删除失败，id不存在'
      }
    }
  },
  /* 获取详情 */
  {
    url: '/Admin/Motion/planGet',
    type: 'post',
    response: config => {
      return {
        data: {
          id: '@increment',
          planName: () => Mock.Random.ctitle(5),
          'dayCount|1': [1, 2, 3, 4, 5, 6, 7],
          'ruleList|0-4': [
            {
              id: '@increment',
              'dayNum|1': [1, 2, 3, 4, 5, 6, 7],
              recommendConsume: () => '建议消耗',
              content: () => '打卡内容',
              advice: () => '运动建议'
            },
            {
              id: '@increment',
              'dayNum|1': [1, 2, 3, 4, 5, 6, 7],
              recommendConsume: () => '建议消耗',
              content: () => '打卡内容',
              advice: () => '运动建议'
            }
          ]
        },
        result: 1
      }
    }
  },
  /* 健身运动运动计划列表 */
  {
    url: '/Admin/Motion/planList',
    type: 'post',
    response: config => {
      return {
        data: [
          {
            id: '@increment',
            planName: () => Mock.Random.ctitle(5),
            creatorName: () => Mock.Random.cname(),
            receiveNums: () => Mock.Random.integer(1, 2000),
            createTime: () => Mock.Random.date(),
            'dayCount|1': [1, 2, 3, 4, 5, 6, 7]
          },
          {
            id: '@increment',
            planName: () => Mock.Random.ctitle(5),
            creatorName: () => Mock.Random.cname(),
            receiveNums: () => Mock.Random.integer(1, 2000),
            createTime: () => Mock.Random.date(),
            'dayCount|1': [1, 2, 3, 4, 5, 6, 7]
          }
        ],
        total: 100,
        result: 1
      }
    }
  }
  // {
  //   url: '/Admin/Motion/clockList',
  //   type: 'post',
  //   response: config => {
  //     return {
  //       data: {
  //         ...Mock.mock({
  //           'list|10': [
  //             {
  //               id: '@increment',
  //               memberId: '@increment',
  //               memberName: () => Mock.Random.ctitle(5),
  //               planName: () => Mock.Random.ctitle(5),
  //               'typeName|1': [0, 1],
  //               'suggestConsume|1': [0, 1],
  //               'consumeFeat|1': [0, 1],
  //               'submitTime': Mock.Random.date(),
  //               'isRecord|1': [0, 1],
  //               'dayNum|1': () => [1, 2, 3, 4, 5, 6, 7],
  //               'dayCount|1': () => [1, 2, 3, 4, 5, 6, 7]
  //             }
  //           ]
  //         })
  //       },
  //       result: 1
  //     }
  //   }
  // }
]
