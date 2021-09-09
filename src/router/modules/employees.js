// 导出员工路由规则
import Layout from '@/layout'
export default {
  // 路由规则
  path: '/employees', // 路由地址
  name: 'employees', // 模块一级路由加 name 属性 做权限时使用
  component: Layout,
  children: [
    {
      path: '', // 二级路由不写，表示二级路由的默认路由
      component: () => import('@/views/employees'),
      name: 'employees',
      // 路由元信息，其实就是一个存储数据的对象，可以放任何内容
      meta: {
        title: '员工管理', // 左侧导航会读取此处 title
        icon: 'people'
      }
    }, {
      path: 'detail/:id', // ?的含义是表示该参数可传可不传  动态路由参数  /employees/detail/123
      component: () => import('@/views/employees/detail'),
      hidden: true, // 表示该内容不在左侧菜单显示
      meta: {
        title: '员工详情'
      }
    }, {
      path: 'print/:id', // ?的含义是表示该参数可传可不传  动态路由参数  /employees/detail/123
      component: () => import('@/views/employees/print'),
      hidden: true, // 表示该内容不在左侧菜单显示
      meta: {
        title: '员工打印'
      }
    }
  ]
}
