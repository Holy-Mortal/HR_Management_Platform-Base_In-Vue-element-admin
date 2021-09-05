<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <!-- 多选框组 v-model 双向绑定 -->
    <el-checkbox-group v-model="roleIds">
      <!-- 要循环的选项 -->
      <!-- 要显示  角色名称  存储  角色 id label 表示要存储的值 -->
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <!-- 定义 footer 的插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnOK">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  name: '',
  components: {},
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      // 用户 id 当前要处理的用户
      type: String,
      default: null,
      required: true // 要求必须传该 id
    }
  },
  data() {
    return {
      list: [], // 负责存储当前所有的角色 id
      roleIds: [] // 负责存储 当前用户所拥有的角色 id
    }
  },
  computed: {},
  watch: {},
  created() {
    // 获取所有角色
    this.getRoleList()
  },
  mounted() {},
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList({
        page: 1,
        pagesize: 20
      }) // 默认只取 10 条数据 角色数量不会太多
      this.list = rows
    },
    // props 传值是异步的 不能用 this.userId
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id) // 将用户所拥有的角色赋值给当前用户的对象
      this.roleIds = roleIds // 赋值本用户的角色
    },
    async btnOK() {
      // 保存用户的角色
      await assignRoles({
        id: this.userId,
        roleIds: this.roleIds
      })
      // 关闭弹层
      this.$emit('update:showRoleDialog', false)
      // this.$parent.showRoleDialog = false
    },
    btnCancel() {
      // 取消
      this.roleIds = [] // 清空原来的数组
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
