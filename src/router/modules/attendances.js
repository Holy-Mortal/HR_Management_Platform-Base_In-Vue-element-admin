// 导出员工路由规则
import Layout from '@/layout'

const attendRouter = {
  // 路由规则
  path: '/attendances', // 路由地址
  name: 'attendances', // 模块一级路由加 name 属性 做权限时使用
  component: Layout,
  children: [
    {
      path: '', // 二级路由不写，表示二级路由的默认路由
      component: () => import('@/views/attendances'),
      // 路由元信息，其实就是一个存储数据的对象，可以放任何内容
      meta: {
        title: '考勤', // 左侧导航会读取此处 title
        icon: 'skill'
      }
    }, {
      path: 'archiving',
      component: () => import('@/views/attendances/historical'),
      name: 'archiving',
      hidden: true,
      meta: {
        title: '归档'
      }
    }, {
      path: 'report/:month',
      component: () => import('@/views/attendances/report'),
      name: 'reports',
      hidden: true,
      meta: {
        title: '报表'
      }
    }
  ]
}

export default attendRouter
