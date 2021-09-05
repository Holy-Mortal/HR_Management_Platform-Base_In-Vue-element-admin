import store from '@/store'
/**
 * 混入对象
 **/
export default {
  // 混入对象是组件的选项对象
  methods: {
    // 检查权限 key 为要检查的点
    checkPermission(key) {
      // 去用户的信息里面找  points 中有没有 key ； 有则有权限
      // store.state.user.userInfo.roles.points
      const { userInfo } = store.state.user
      if (userInfo.roles && userInfo.roles.points) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false // 若未进入 if 说明没权限
    }
  }
}
