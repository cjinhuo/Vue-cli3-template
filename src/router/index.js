import Vue from 'vue'
import Router from 'vue-router'
import BaseLayout from '@/layout/BaseLayout'
import NotFoundComponent from '@/components/NotFoundComponent'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'BaseLayout',
      component: BaseLayout
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/modules/Login')
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
