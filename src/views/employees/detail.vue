<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 放置一个 el-card -->
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置内容 -->
            <el-form ref="userForm" :model="userInfo" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top: 30px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="userInfo.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码" prop="password2">
                <el-input v-model="userInfo.password2" style="width: 300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUser">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${userId}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- 放置内容 -->
            <!-- <user-info /> -->
            <!-- vuejs 内置了组件 component 动态组件 可以切换组件 -->
            <component :is="UserComponent" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印岗位信息">
                <router-link :to="`/employees/print/${userId}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- 放置内容 -->
            <component :is="JobComponent" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfo from './components/user-info'
import JobInfo from './components/job-info'
export default {
  name: '',
  components: {
    UserInfo,
    JobInfo
  },
  props: {},
  data() {
    return {
      UserComponent: 'UserInfo',
      JobComponent: 'JobInfo',
      userId: this.$route.params.id, // 直接将路由中参数复制给 data
      userInfo: {
        username: '',
        password2: ''
      },
      rules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getUserDetailById()
  },
  mounted() {},
  methods: {
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId)
    },
    saveUser() {
      // 调用方法时，应该校验
      this.$refs.userForm.validate().then(async() => {
        await saveUserDetailById({
          ...this.userInfo,
          password: this.userInfo.password2
        })
        this.$message.success('修改用户信息成功')
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
