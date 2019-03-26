import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  { path: '/login',  name: 'login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  },
  {
    hidden: true,
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [{
      path: 'index',
      component: _import('documentation/index'),
      name: 'documentation',
      meta: { title: 'documentation', icon: 'documentation', noCache: true }
    }]
  },
  {
    path: '/audit',
    component: Layout,
    redirect: '/audit/index',
    meta: {
      title: 'audit',
      icon: 'chart'
    },
    children: [{
      path: 'index',
      component: _import('audit/index'),
      name: 'audit',
      meta: { title: 'audit', icon: 'table', noCache: true }
    }, {
      hidden: true,
      path: 'pSDetail',
      component: _import('audit/pSDetail'),
      name: 'pSDetail',
      meta: { title: 'pSDetail', icon: 'table', noCache: true }
    }]
  },
  {
    path: '/question',
    component: Layout,
    redirect: '/question/index',
    meta: {
      title: 'question',
      icon: 'chart'
    },
    children: [{
      path: 'question',
      component: _import('question/index'),
      name: 'question',
      meta: { title: 'question', icon: 'form', noCache: true }
    },
      {
      hidden: true,
      path: 'questionDetail',
      component: _import('question/questionDetail'),
      name: 'questionDetail',
      meta: { title: 'questionDetail', icon: 'form', noCache: true }
    }]
  },
  {
    path: '/invite',
    component: Layout,
    redirect: '/invite/index',
    meta: {
      title: 'invite',
      icon: 'chart'
    },
    children: [{
      path: 'invite',
      component: _import('invite/index'),
      name: 'invite',
      meta: { title: 'invite', icon: 'form', noCache: true }
    }]
  },
  {
    path: '/feedback',
    component: Layout,
    redirect: '/feedback/index',
    meta: {
      title: 'feedback',
      icon: 'message'
    },
    children: [{
      path: 'feedback',
      component: _import('feedback/index'),
      name: 'feedback',
      meta: { title: 'feedback', icon: 'message', noCache: true }
    },{
      path: 'complaint',
      component: _import('feedback/complaint'),
      name: 'complaint',
      meta: { title: 'complaint', icon: 'message', noCache: true }
    }]
  }
  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: _import('svg-icons/index'),
  //     name: 'icons',
  //     meta: { title: 'icons', icon: 'icon', noCache: true }
  //   }]
  // }
]

export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]
