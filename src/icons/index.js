import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
// 将 svg 目录下所有的 .svg 后缀文件全部引入到项目中
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
// 以上两行代码含义：将 svg 目录下的所有 .svg 后缀的文件全部引入到项目中
