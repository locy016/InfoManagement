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
      component: () => import('./views/job-type/index.vue'),
      meta: { topShow: true }
    },
    {
      path: '/job-list',
      name: 'job-list',
      component: () => import('./views/job/job-list.vue'),
      meta: { topShow: true }
    },
    {
      path: '/add-job',
      name: 'add-job',
      component: () => import('./views/job/add-job.vue'),
      meta: { topShow: true }
    },
    {
      path: '/add-hr',
      name: 'add-hr',
      component: () => import('./views/hr/add-hr.vue'),
      meta: { topShow: true }
    },
    {
      path: '/hr-list',
      name: 'hr-list',
      component: () => import('./views/hr/hr-list.vue'),
      meta: { topShow: true }
    },
    {
      path: '/add-project',
      name: 'add-project',
      component: () => import('./views/project/add-project.vue'),
      meta: { topShow: true }
    },
    {
      path: '/project-list',
      name: 'project-list',
      component: () => import('./views/project/project-list.vue'),
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
