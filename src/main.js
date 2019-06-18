import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
import Mock from './mock'
import global_ from './components/global'//全局变量
Vue.prototype.GLOBAL = global_//全局变量挂载到Vue实例上面
import base from './components/base'//引用
Vue.use(base);//将全局函数当做插件来进行注册
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
import './styles/iconfont.scss'
import './assets/common.scss'
import './styles/color.scss'
import 'element-ui/lib/theme-chalk/display.css';
//富文本编辑框
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import addQuillTitle from './common/js/quill-title.js';
import scrollIt from './library/scroll.js';
//图片剪裁
import VueCropper from 'vue-cropper'
import $ from 'jquery'
Vue.prototype.$addQuillTitle = addQuillTitle
Vue.use(VueQuillEditor)
Vue.use(VueCropper)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
//表单验证
import VeeValidate,{ Validator } from 'vee-validate';
//错误提示转为中文
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueI18n from 'vue-i18n';

Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'zh_CN',
    // messages: {
    //     required: (field) => "请输入" + field
    // },
})
const config = {
    locale: 'zh_CN',
    fieldsBagName: 'vee-fields',
    i18n,
    i18nRootKey: 'validation',
    silentTranslationWarn: true,//去掉 warning
    dictionary: {
        zh_CN,
        zh_CN: {
            messages: {
                email: () => '请填写正确邮箱',
                required: (field) => "请输入" + field
            },
            attributes: {
                // <input type="text" v-model="phoneNumber" name="phone" v-validate="'required|phone'">
                // 上述messages提示信息中field显示的内容在此设置，对应标签的name属性
                phone: '手机号码',
            }
        }
    }
}
Vue.use(VeeValidate, config)
//NProgress.configure({ showSpinner: false });

Validator.extend('phone', {
    // 验证规则，符合规则通过，否则不通过 (规则为美国电话号码)
    validate: (value, ref) => {
        return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    },
    // 提示信息，不符合规则提示语
    getMessage: (field) => '请填写正确' + field
})

const router = new VueRouter({
    routes
})

// router.beforeEach((to, from, next) => {
//   //NProgress.start();
//   if (to.path == '/login') {
//     sessionStorage.removeItem('user');
//   }
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   if (!user && to.path != '/login') {
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// })

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
    el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount('#app')

