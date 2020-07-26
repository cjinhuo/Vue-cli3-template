import riskAssessment from './RiskAssessment/routes'
export default {
  path: 'enterpriceService',
  name: 'enterpriceService',
  component: BlankLayout,
  meta: {
    title: '企业服务',
    // hideInMenu: true,
    // hideInBreadcrumb: true,
    hideMenuLayout: false
  },
  redirect: { name: 'riskAssessment' },
  children: [riskAssessment]
}
