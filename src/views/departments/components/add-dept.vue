<template>
  <!-- 放置弹层组件 -->
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <!-- 表单数据 label-width 设置表单宽度 -->
    <el-form ref="deptForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <!-- native 修饰符 可以找到原生元素的事件 -->
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <!-- 遍历选项 -->
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- 确定和消息 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, getDepartDetail, updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  name: '',
  components: {},
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 检查部门名称是否重复
    const checkNameRepeat = async(rule, value, callback) => {
      // value 是部门名称  要去和同级部门下的部门比较是否相同  相同不能过 / 不相同可以过
      const { depts } = await getDepartments()
      // 找同级部门下 是否有和 value 相同的数据
      // 找到同级部门的所有子部门
      let isRepeat = false
      if (this.formData.id) {
        // 有 id 就是编辑模式
        // 编辑的数据，在数据库里有！！！ 同级部门下 编辑的名字不能和其他的同级部门的名字进行重复
        // 首先找到同级部门 this.formData.id 就是当前 id 编辑的 pid 是 this.formData.pid
        // depts.filter(item => item.pid === this.formData.pid)
        isRepeat = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id).some(item => item.name === value)
      } else {
        // 没有 id 就是新增模式
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
      // 如果 isRepeat 为 true 表示找到了一样的名字
      isRepeat ? callback(new Error(`同级部门下已经存在这个${value}部门了`)) : callback()
    }
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        // 编辑模式 有 id
        // 要求是 不能有一样的 code
        isRepeat = depts.filter(item => item.id !== this.treeNode.id).some(item => item.code === value && value)
      } else {
        // 新增模式 没有 id
        isRepeat = depts.some(item => item.code === value && value)
      }
      // 要求编码 和所有的部门编码都不能重复  由于历史数据有可能没有 code 需要加一个强制性条件 value 值不为空
      isRepeat ? callback(new Error(`组织架构下已经存在这个${value}编码了`)) : callback()
    }
    return {
      // 定义一个表单数据
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      // 校验规则 { key: 数组 }
      rules: {
        name: [
          { required: true, trigger: 'blur', message: '部门名称不能为空' },
          { min: 1, max: 50, message: '部门名称长度为1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkNameRepeat }
        ],
        code: [
          { required: true, trigger: 'blur', message: '部门编码不能为空' },
          { min: 1, max: 50, message: '部门编码长度为1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkCodeRepeat }
        ],
        manager: [
          { required: true, trigger: 'blur', message: '部门管理者不能为空' }
        ],
        introduce: [
          { required: true, trigger: 'blur', message: '部门介绍不能为空' },
          { min: 1, max: 300, message: '部门介绍长度为1-300个字符', trigger: 'blur' }
        ]
      },
      peoples: [] // 接收获取的员工简单列表的数据
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    // 获取部门详情方法
    async getDepartDetail(id) {
      // 父组件调用子组件的方法  先设置了 node 数据 直接调用方法
      // props 传值是异步的
      this.formData = await getDepartDetail(id)
    },
    btnOK() {
      // 手动校验表单
      this.$refs.deptForm.validate(async isOK => {
        if (isOK) {
          if (this.formData.id) {
            // 编辑
            await updateDepartments(this.formData)
          } else {
            // 将 父级的 id 设置成了 该项的 pid
            await addDepartments({ ...this.formData, pid: this.treeNode.id })
          }
          // 表单校验通过

          // 告诉父组件
          this.$emit('addDepts') // 触发一个自定义事件
          // 此时应该去修改 showDialog 值
          // update:props 名称
          this.$emit('update:showDialog', false)
          // 关闭 dialog 的时候 触发 el-dialog 的 close 事件 不需要单独重置数据
        }
      })
    },
    btnCancel() {
      // 重置数据 因为 resetFields 只能重置 表单上的数据 非表单上的 比如 编辑中 id 不能重置
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      // 关闭弹层
      this.$emit('update:showDialog', false)
      // 清除之前的校验 可以重置数据 只能重置定义在 data 中的数据
      this.$refs.deptForm.resetFields()
    }
  }
}
</script>

<style scoped lang="less">

</style>
