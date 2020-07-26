let baseUrl = ''
if (
  window.location.host.includes('test-') ||
  window.location.host.includes('local') ||
  window.location.host.includes('192.168')
) {
  // baseUrl = 'http://test-simba-gw.startdtapi.com';
  // baseUrl = 'http://test-soul-server.k8s.startdtapi.com/simba';
  baseUrl = 'http://test-soul-server.k8s.startdtapi.com/simba'
} else if (window.location.host.includes('datasimba-fe-simba.k8s.startdt.net')) {
  // stable环境
  baseUrl = 'http://pre-soul-server.k8s.startdtapi.com/simba'
  // baseUrl = 'http://datasimba-simba-gateway.k8s.startdtapi.com';
} else if (window.location.host.includes('datasimba01-fe-simba.k8s.startdt.net')) {
  // stable-01环境
  baseUrl = 'http://datasimba01-simba-gateway.k8s.startdtapi.com'
} else if (window.location.host.includes('simba.yuhang.gov.cn')) {
  // 余杭政府项目旧版
  baseUrl = 'http://simbaapi.yuhang.gov.cn:8081'
} else if (window.location.host.includes('simbafe.yuhang.gov.cn')) {
  // 余杭政府项目新版
  baseUrl = 'http://simbagw.yuhang.gov.cn:8080'
} else if (window.location.host.includes('motherbuy.com')) {
  // 妈妈购
  baseUrl = 'http://simba-gw.motherbuy.com'
} else if (window.location.host.includes('simba-dataservice-web')) {
  baseUrl = 'http://test-simba-dataservice-web.startdtapi.com'
} else if (window.location.host.includes('fudao-simba')) {
  // 福道
  baseUrl = 'http://fudao-simbaapi.startdt.net'
} else if (window.location.host.includes('xianfeng-simba')) {
  // 鲜风生活
  baseUrl = 'http://xianfeng-simba-gw.startdt.net'
} else {
  baseUrl = 'http://simba-gw.startdtapi.com'
}

export default baseUrl
