// 导出员工路由规则
import Layout from '@/layout'

export default {
  // 路由规则
  path: '/social_securitys', // 路由地址
  name: 'social_securitys', // 模块一级路由加 name 属性 做权限时使用
  component: Layout,
  children: [
    {
      path: '', // 二级路由不写，表示二级路由的默认路由
      component: () => import('@/views/social'),
      // 路由元信息，其实就是一个存储数据的对象，可以放任何内容
      name: 'social_securitys',
      meta: {
        title: '社保', // 左侧导航会读取此处 title
        icon: 'table'
      }
    },
    // 报表
    {
      path: 'detail/:id',
      hidden: true,
      component: () => import('@/views/social/detail'),
      name: 'socialDetail',
      meta: {
        title: '社保'
      }
    },
    // 历史归档
    {
      path: 'historicalArchiving',
      hidden: true,
      component: () => import('@/views/social/historical'),
      name: 'socialHistorical',
      meta: {
        title: '历史归档'
      }
    },
    // 月报表
    {
      path: 'monthStatement',
      component: () => import('@/views/social/month'),
      name: 'socialMonthStatement',
      hidden: true,
      meta: {
        title: '当月报表'
      }
    }
  ]
}
