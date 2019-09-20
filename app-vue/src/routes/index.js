import Vue from 'vue';
import Router from 'vue-router';
// import Hello from '../components/HelloWorld';
import ListView from '../views/ListView';
import DetailView from '../views/DetailView';
import * as ROUTES from '../const/ROUTES';

Vue.use(Router);

const routes = [
    {
        path: ROUTES.HOME,
        redirect: ROUTES.JOB_LIST
    },
    {
        path:ROUTES.JOB_LIST,
        name:"LİSTE",
        title:"Liste Sayfası",
        component:ListView
    },
    {
        path:ROUTES.JOB_DETAIL,
        name:"DETAY",
        title:"Detay Sayfası",
        component:DetailView
    }
];

export default new Router({
    mode:'history',
    routes,
});