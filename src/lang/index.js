// 多语言实例化文件
import Vue from 'vue' // 引入 Vue 组件
import VueI18n from 'vue-i18n' // 引入语言国际化的包
import Cookie from 'js-cookie' // 引入cookie工具包
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 引入中文语言包
import elementEN from 'element-ui/lib/locale/lang/en' // 引入英文语言包
import elementJA from 'element-ui/lib/locale/lang/ja' // 引入日文语言包
import customZH from './zh' // 自定义中文语言包
import customEN from './en' // 自定义英文语言包

Vue.use(VueI18n) // 完成 VueI18n 语言包全局注册
export default new VueI18n({
  // i18n的选项
  locale: Cookie.get('language') || 'zh', // 指的是当前的多语言的类型 随意定义的字符串
  // 指的是当前的语言包
  messages: {
    zh: {
      // 语言包    elementUI 语言包 + 自定义语言包
      ...elementZH,
      ...customZH
    }, // 中文(zh)
    en: {
      // 语言包    elementUI 语言包 + 自定义语言包
      ...elementEN,
      ...customEN
    }, // 英文(en)
    ja: {
      // 语言包    elementUI 语言包 + 自定义语言包
      ...elementJA
    }, // 日语(ja)
    sp: {} // 西班牙语(sp)
  }
})
