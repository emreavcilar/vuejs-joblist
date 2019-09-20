import Vue from 'vue';
import Vuex from 'vuex';
// import { mutations, STORAGE_KEY } from './mutations';
// import actions from './actions';
// import plugins from './plugins';

import {listModule} from './listModule';
import {detailModule} from './detailModule';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
// const debug = true;

export default new Vuex.Store({
    /*state: {
        todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    },*/

    /*actions,
    mutations,
    plugins*/

    modules: {
        // alert,
        // account,
        // users
        listModule,
        detailModule
    },

    strict: debug,
    plugins: debug ? [createLogger()] : []
});