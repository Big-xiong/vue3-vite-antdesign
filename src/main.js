import 'normalize.css/normalize.css'
import 'ant-design-vue/es/message/style/css';
import './assets/style/theme.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

import SvgIcon from "@/components/SvgIcon/index.vue";
import 'virtual:svg-icons-register'

import { registerDirectives } from './directives';

const initQianKun = () => {
    renderWithQiankun({
      // 当前应用在主应用中的生命周期
      // 文档 https://qiankun.umijs.org/zh/guide/getting-started#

      mount(props) {
        render(props.container)
        //  可以通过props读取主应用的参数：msg
        // 监听主应用传值
        props.onGlobalStateChange((res) => {
            // store.count = res.count
          console.log(res)
        })
      },
      bootstrap() { },
      unmount() { },
    })
}
const app = createApp(App)

const render = async (container) => {  
    // 如果是在主应用的环境下就挂载主应用的节点，否则挂载到本地
    const appDom = container ? container : "#app"
    app.use(createPinia())
    app.use(router)
    app.component('SvgIcon', SvgIcon)
    await registerDirectives(app)
    app.mount(appDom)    
}
console.log(111, qiankunWindow.__POWERED_BY_QIANKUN__)
// 判断当前应用是否在主应用中
qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render()

export default app


