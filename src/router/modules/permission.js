// 导出员工路由规则
import Layout from '@/layout'
export default {
  // 路由规则
  path: '/permission', // 路由地址
  name: 'permission', // 模块一级路由加 name 属性 做权限时使用
  component: Layout,
  children: [
    {
      path: '', // 二级路由不写，表示二级路由的默认路由
      component: () => import('@/views/permission'),
      // 路由元信息，其实就是一个存储数据的对象，可以放任何内容
      meta: {
        title: '权限管理', // 左侧导航会读取此处 title
        icon: 'lock'
      }
    }
  ]
}
