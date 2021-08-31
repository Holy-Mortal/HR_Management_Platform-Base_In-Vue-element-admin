<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容- 头部 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- 放置一个 el-tree -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 传入内容 插槽内容 会循环多次-->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据 -->
          <!-- {data}: 解构得到的每个节点的数据对象 slot-scope="{ data }" -->
          <tree-tools slot-scope="{ data }" :tree-node="data" @addDepts="addDepts" @editDepts="editDepts" @delDepts="getDepartments" />
        </el-tree>
      </el-card>
    </div>
    <!-- 放置新增弹层组件 -->
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import AddDept from './components/add-dept.vue'

import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
export default {
  name: '',
  components: {
    TreeTools,
    AddDept
  },
  props: {},
  data() {
    return {
      company: {}, // 头部的数据结构
      departs: [],
      defaultProps: {
        label: 'name' // 表示从这个属性显示内容
      },
      showDialog: false, // 默认不显示弹层
      node: null, // 记录当前点击的 node 节点
      loading: false // 用来控制进度弹层的显示和隐藏
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getDepartments() // 调用自身的方法
  },
  mounted() {},
  methods: {
    async getDepartments() {
      this.loading = true
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(result.depts, '') // 需要将其转化成树形结构
      // console.log(result)
      this.loading = false
    },
    // 监听 tree-tools 中触发的点击添加子部门的事件 node 表示当前点击的部门
    addDepts(node) {
      this.showDialog = true // 显示弹层
      this.node = node
    },
    editDepts(node) {
      this.showDialog = true // 显示弹层
      this.node = node
      // 调用获取部门详情的方法
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
