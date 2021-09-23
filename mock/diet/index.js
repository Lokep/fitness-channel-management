const Mock = require('mockjs')

const Foods = require('./foods')
const Plans = require('./plans')
const Records = require('./records')

const List = []
const count = 10
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    planName: () => Mock.Random.ctitle(5),
    dayCount: '@integer(1, 3)',
    creatorName: Mock.Random.cname(),
    createTime: '@datetime',
    receiveNums: '@integer(1, 3)'
  }))
}

module.exports = [
  {
    url: '/diet/plan/page',
    type: 'get',
    response: config => {
      return {
        data: {
          ...Mock.mock({
            'list|10': [{
              id: '@increment',
              planName: () => Mock.Random.ctitle(5),
              dayCount: '@integer(1, 3)',
              creatorName: () => Mock.Random.cname(),
              createTime: '@datetime',
              receiveNums: '@integer(1, 3)'
            }]
          }),
          total: 20
        },
        res: 0
      }
    }
  },
  // {
  //   url: '/diet/plan/page',
  //   type: 'get',
  //   response: config => {
  //     return {
  //       data: {
  //         ...Mock.mock({
  //           'list|10': [{
  //             id: '@increment',
  //             planName: () => Mock.Random.ctitle(5),
  //             dayCount: '@integer(1, 3)',
  //             creatorName: () => Mock.Random.cname(),
  //             createTime: '@datetime',
  //             receiveNums: '@integer(1, 3)'
  //           }]
  //         }),
  //         total: 20
  //       },
  //       result: 1
  //     }

  //   }
  // },
  {
    url: '/diet/plan/delete',
    type: 'delete',
    response: ({ body, method, query }) => {
      const { id = '' } = body || {}

      return {
        res: id ? 0 : 1,
        msg: 'success'
      }
    }
  },
  ...Foods,
  ...Records,
  ...Plans
]
