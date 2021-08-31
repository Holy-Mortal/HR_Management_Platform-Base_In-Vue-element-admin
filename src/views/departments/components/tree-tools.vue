<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
    <el-col>
      <!-- 左侧内容 -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <!-- 右侧内容 -->
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 -->
          <el-dropdown @command="operateDepts">
            <!-- 内容 -->
            <span>
              操作
              <i class="el-icon-arrow-down" />
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  name: 'TreeTools',
  props: {
    // 定义传入的属性
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 点击 编辑 新增 删除 时触发
    operateDepts(type) {
      if (type === 'add') {
        // 添加子部门 在当前点击的部门（this.treeNode）下 添加子部门
        this.$emit('addDepts', this.treeNode) // 触发自定义事件 告诉父组件 显示弹层
      } else if (type === 'edit') {
        // 编辑部门
        this.$emit('editDepts', this.treeNode) // 触发自定义事件 点击谁 编辑谁
      } else {
        // 删除部门
        this.$confirm('您确定要删除组织架构中该部门吗？').then(() => {
          return delDepartments(this.treeNode.id)
        }).then(() => {
          // 只需要等到成功时，调用接口删除，后端数据变化而前端没变
          this.$emit('delDepts') // 触发自定义事件
          this.$message.success('删除部门成功！')
        })
      }
    }
  }
}
</script>

<style>

</style>
