// 导出员工路由规则
import Layout from '@/layout'

const salaryRouter = {
  // 路由规则
  path: '/salarys', // 路由地址
  name: 'salarys', // 模块一级路由加 name 属性 做权限时使用
  component: Layout,
  children: [
    {
      path: '', // 二级路由不写，表示二级路由的默认路由
      component: () => import('@/views/salarys'),
      name: 'salarys',
      // 路由元信息，其实就是一个存储数据的对象，可以放任何内容
      meta: {
        title: '工资', // 左侧导航会读取此处 title
        icon: 'money'
      }
    }, {
      path: 'setting',
      component: () => import('@/views/salarys/setting'),
      name: 'salarysSetting',
      hidden: true,
      meta: {
        title: '设置'
      }
    }, {
      path: 'details/:yearMonth/:id',
      component: () => import('@/views/salarys/detail'),
      name: 'salarysDetails',
      hidden: true,
      meta: {
        title: '详情'
      }
    }, {
      path: 'historicalArchiving',
      component: () => import('@/views/salarys/historical'),
      name: 'salarysHistorical',
      hidden: true,
      meta: {
        title: '历史归档'
      }
    }, {
      path: 'monthStatement',
      component: () => import('@/views/salarys/month'),
      name: 'salarysMonthStatement',
      hidden: true,
      meta: {
        title: '月报表'
      }
    }
  ]
}

export default salaryRouter
