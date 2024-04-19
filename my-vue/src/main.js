import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
app.use(ElementPlus).mount('#app')
