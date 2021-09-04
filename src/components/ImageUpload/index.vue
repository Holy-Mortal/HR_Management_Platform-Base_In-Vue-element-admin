<template>
  <div>
    <!-- file-list 是上传的文件列表 可以绑定到上传组件 让上传组件显示 -->
    <!-- upload 组件显示的是 file-list -->
    <el-upload list-type="picture-card" :limit="1" action="#" :on-preview="preview" :on-remove="handleRemove" :on-change="changeFile" :before-upload="beforeUpload" :http-request="upload" :file-list="fileList" :class="{ disabled: fileComputed }">
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" :percentage="100" style="width: 180px" />
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img src="imgUrl" alt="" style="width: 100%">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云 cos 包
// 实例化COS对象
const cos = new COS({
  SecretId: 'AKID0mqfEWqIUzIbeSkGRL6c7ML6c0B93To9', // 身份识别 ID
  SecretKey: 'JFwNZdeRF2iOp03FFsGNDm44vWFitmNF' // 身份秘钥
})

export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: '',
      currentFileUid: null, // 记录正在上传的 uid
      percent: 0, // 当前百分比
      showPercent: false
    }
  },
  computed: {
    // 如果为 true 表示就不应该显示 + 上传了
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 点击预览事件
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    // file 是要删除的文件  // fileList 是删过之后的文件
    handleRemove(file, fileList) {
      // console.log(file)
      // console.log(fileList)
      this.fileList = this.fileList.filter(item => item.uid !== file.uid) // 将当前的删除文件排除在外
      // this.fileList = fileList
    },
    // 不能用 push  会执行多次
    changeFile(file, fileList) {
      // file 是当前的文件  fileList 是当前的最新数据
      this.fileList = fileList.map(item => item)
      // 上传成功 => 数据才能进 => 腾讯云cos
    },
    beforeUpload(file) {
      // console.log(file)
      // 先检查文件类型
      const types = ['image/jepg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        // 如果不存在
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式！')
        return false // 上传终止
      }
      // 再检查文件大小  5M 1M = 1024KB  1KB = 1024B
      const maxSize = 15 * 1024 * 1024
      if (file.size > maxSize) {
        // 超过了限制的文件大小
        this.$message.error('上传的图片大小不能大于5M')
        return false
      }
      this.currentFileUid = file.uid
      this.showPercent = true
      return true // 一定需要 return true
    },
    // 进行上传操作
    upload(params) {
      console.log(params.file)
      if (params.file) {
        // 进行上传操作
        cos.putObject({
          // 上传到腾讯云 => 哪个存储桶 域
          Bucket: 'shuiruohanyu-106-1302806742', // 存储桶
          Region: 'ap-beijing', // 地域
          Key: params.file.name, // 文件名
          Body: params.file, // 要上传的文件对象
          StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
          // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
        }, (err, data) => {
          // data返回数据之后 应该如何处理
          // console.log(err || data)
          // data 中有一个 statusCode === 200 的时候说明上传成功
          if (!err && data.statusCode === 200) {
            // 此时说明文件上传成功 要获取成功的返回地址
            // fileList 才能显示到上传组件上 将 fileList 中数据的 url 地址转化成 现在上传成功的地址
            // fileList 是一个数组，哪怕当前只是一张图片
            this.fileList = this.fileList.map(item => {
              // 找 uid 等于刚记录的 id
              if (item.uid === this.currentFileUid) {
                // upload: true 表示这张图片已经上传完毕 做标记
                // 保存 => 图片有大有小 => 上传速度有快有慢 => 根据有无upload标记决定是否去保存
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
            // 将上传成功的地址 回写到 fileList 中 fileList变化 => upload组件
            // 根据 fileList 的变化而去渲染视图
            // 关闭进度条 重置百分比
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 1000)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.disabled .el-upload--picture-card {
  display: none;
}
</style>
