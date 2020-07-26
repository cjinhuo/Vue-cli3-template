export const getBaseUrl = (namespace) => {
  const rules = {
    'mock1.qa.91jkys.com': 'http://mock.qa.91jkys.com/api/project/mock/32/',
    'oa.mock.qa.91jkys.com': {
      generalBasis: 'http://operate-admin-api.qa.91jkys.com/',
      drugstore: 'http://operate-admin-api.qa.91jkys.com/drugstore/',
      apigw: 'http://apigw.qa.91jkys.com/',
      // toC: 'http://mock.qa.91jkys.com/api/project/mock/70/',
      toC: 'http://operate-admin-api.qa.91jkys.com/c-reconsitution/', // 联调
      // doctor: 'http://mock.qa.91jkys.com/api/project/mock/74/',
      doctor: 'http://operate-admin-api.qa.91jkys.com/c-reconsitution/',
      coupon: 'http://operate-admin-api.qa.91jkys.com/c-reconsitution/'
    },
    'qa.91jkys.com': {
      generalBasis: 'http://operate-admin-api.qa.91jkys.com/',
      drugstore: 'http://operate-admin-api.qa.91jkys.com/drugstore/',
      apigw: 'http://apigw.qa.91jkys.com/',
      coupon: 'http://operate-admin-api.qa.91jkys.com/c-reconsitution/',
      toC: 'http://operate-admin-api.qa.91jkys.com/c-reconsitution/',
      doctor: 'http://operate-admin-api.qa.91jkys.com/c-reconsitution/' // TODO: 医生联调地址？
      // coupon: 'http://192.168.20.48:9239/'
    },
    'pre.91jkys.com': {
      generalBasis: 'http://operate-admin.test.pre.91jkys.com/api/',
      drugstore: 'http://operate-admin.test.pre.91jkys.com/api/',
      apigw: 'http://apigw.pre.91jkys.com/',
      coupon: 'http://operate-admin.test.pre.91jkys.com/api/',
      toC: 'http://operate-admin.test.pre.91jkys.com/api/',
      doctor: 'http://operate-admin.test.pre.91jkys.com/api/' // TODO: 医生联调地址？
    },
    '91jkys.com': {
      generalBasis: 'https://operate-admin-api.91jkys.com/api/',
      drugstore: 'https://operate-admin-api.91jkys.com/api/',
      apigw: 'https://apigw.91jkys.com/',
      coupon: 'https://operate-admin-api.91jkys.com/api/',
      toC: 'https://operate-admin-api.91jkys.com/api/',
      doctor: 'https://operate-admin-api.91jkys.com/api/' // TODO: 医生联调地址？
    }
  }
  const [, rule] = Object.entries(rules).find(([host, href]) => location.host.endsWith(host)) || []
  return rule ? rule[namespace] || rule : location.origin
}
