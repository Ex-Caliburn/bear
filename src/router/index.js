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
  { path: '/',  name: 'login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     component: _import('dashboard/index'),
  //     name: 'dashboard',
  //     meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
  //   }]
  // },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/index',
    meta: {
      title: 'goods',
      icon: 'chart'
    },
    children: [{
      path: 'index',
      component: _import('goods/index'),
      name: 'goods',
      meta: { title: 'goods', icon: 'table', noCache: true }
    },{
      hidden: true,
      path: 'createGoods/:id',
      component: _import('goods/createGoods'),
      name: 'createGoods',
      meta: { title: 'createGoods', icon: 'table', noCache: true }
    },]
  },
  {
    path: '/userInfo',
    component: Layout,
    redirect: '/userInfo/index',
    meta: {
      title: 'userInfo',
      icon: 'chart'
    },
    children: [{
      path: 'userInfo',
      component: _import('userInfo/index'),
      name: 'userInfo',
      meta: { title: 'userInfo', icon: 'form', noCache: true }
    },
      {
      hidden: true,
      path: 'questionDetail',
      component: _import('userInfo/questionDetail'),
      name: 'questionDetail',
      meta: { title: 'questionDetail', icon: 'form', noCache: true }
    }]
  },
  {
    path: '/coupon',
    component: Layout,
    redirect: '/coupon/index',
    meta: {
      title: 'coupon',
      icon: 'chart'
    },
    children: [{
      path: 'coupon',
      component: _import('coupon/index'),
      name: 'coupon',
      meta: { title: 'coupon', icon: 'form', noCache: true }
    },{
      hidden: true,
      path: 'createCoupon/:id',
      component: _import('coupon/createCoupon'),
      name: 'createCoupon',
      meta: { title: 'createCoupon', icon: 'form', noCache: true }
    },{
      hidden: true,
      path: 'distributeCoupon',
      component: _import('coupon/distributeCoupon'),
      name: 'distributeCoupon',
      meta: { title: 'distributeCoupon', icon: 'form', noCache: true }
    },{
      path: 'couponActivityList',
      component: _import('coupon/couponActivityList'),
      name: 'couponActivityList',
      meta: { title: 'couponActivityList', icon: 'form', noCache: true }
    },{
      hidden: true,
      path: 'createCouponActivity/:id',
      component: _import('coupon/createCouponActivity'),
      name: 'createCouponActivity',
      meta: { title: 'createCouponActivity', icon: 'form', noCache: true }
    }]
  },
  {
    path: '/invite',
    component: Layout,
    redirect: '/invite/index',
    meta: {
      title: 'invite',
      icon: 'message'
    },
    children: [{
      path: 'invite',
      component: _import('invite/index'),
      name: 'invite',
      meta: { title: 'invite', icon: 'message', noCache: true }
    },{
      hidden: true,
      path: 'complaint',
      component: _import('invite/complaint'),
      name: 'complaint',
      meta: { title: 'complaint', icon: 'message', noCache: true }
    }]
  },
  {
    path: '/consume',
    component: Layout,
    redirect: '/consume/index',
    meta: {
      title: 'consume',
      icon: 'message'
    },
    children: [{
      path: 'consume',
      component: _import('consume/index'),
      name: 'consume',
      meta: { title: 'consume', icon: 'message', noCache: true }
    }]
  }, 
]

export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]
