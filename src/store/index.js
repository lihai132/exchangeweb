//index.js
import Vue from 'vue'
import vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(vuex);
import LoginStore from './login';
import PopupStore from './popup';
// import AssetsStore from './assets';
export default new vuex.Store({
    modules: {
        Login: LoginStore,
        Popup: PopupStore
        
    },
    plugins: [createPersistedState()]
})