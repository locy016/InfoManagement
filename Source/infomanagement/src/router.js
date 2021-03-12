import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: { topShow: false }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: { topShow: true }
    },
    {
      path: '/job-type',
      name: 'job-type',
      component: () => import('./views/job-type/list.vue'),
      meta: { topShow: true }
    },
    {
      path: '/job-list',
      name: 'job-list',
      component: () => import('./views/job/list.vue'),
      meta: { topShow: true }
    },
    {
      path: '/job-add',
      name: 'job-add',
      component: () => import('./views/job/add.vue'),
      meta: { topShow: true }
    },
    {
      path: '/hr-add',
      name: 'hr-add',
      component: () => import('./views/hr/add.vue'),
      meta: { topShow: true }
    },
    {
      path: '/hr-import',
      name: 'hr-import',
      component: () => import('./views/hr/import.vue'),
      meta: { topShow: true }
    },
    {
      path: '/hr-list',
      name: 'hr-list',
      component: () => import('./views/hr/list.vue'),
      meta: { topShow: true }
    },
    {
      path: '/project-add',
      name: 'project-add',
      component: () => import('./views/project/add.vue'),
      meta: { topShow: true }
    },
    {
      path: '/project-list',
      name: 'project-list',
      component: () => import('./views/project/list.vue'),
      meta: { topShow: true }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: { topShow: true }
    }
  ]
})
