// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vtouch from 'vue-touch';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Each from 'common/service/each';
import Service from 'common/service/service';
import App from './App';
// import goods from 'components/content/goods/goods';
// import seller from 'components/content/seller/seller';
// import ratings from 'components/content/ratings/ratings';
const goods = resolve => require(['./components/content/goods/goods.vue'], resolve);
const seller = resolve => require(['./components/content/seller/seller.vue'], resolve);
const ratings = resolve => require(['./components/content/ratings/ratings.vue'], resolve);
import uvSplit from 'components/split/split';
import ratingSelect from 'components/ratingSelect/ratingSelect';
import 'common/sass/default.scss';

Vue.use(Each);
Vue.use(Vtouch, { name: 'v-touch' });
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Service, {
    url: '/api/service.json'
});
/* eslint-disable no-new */

// const routes = [{
//     path: '',
//     // redirect: '/goods',
//     redirect: {
//         path: '/goods',
//         query: { plan: 'private' }
//     },
//     component: App,
//     children: [{
//             path: '/goods',
//             name: '0',
//             query: { plan: 'private' },
//             component: goods
//         },
//         {
//             path: '/seller',
//             name: '1',
//             component: seller
//         },
//         {
//             path: '/ratings',
//             name: '2',
//             component: ratings
//         }
//     ]
// }];

const routes = [{
        path: '',
        redirect: {
            path: '/goods',
            query: { plan: 'private' }
        }
    }, {
        path: '/goods',
        name: '0',
        query: { plan: 'private' },
        component: goods
    },
    {
        path: '/seller',
        name: '1',
        component: seller
    },
    {
        path: '/ratings',
        name: '2',
        component: ratings
    }
];

var router = new VueRouter({
    linkActiveClass: 'nav-active',
    routes
});

Vue.component('uv-split', uvSplit);
Vue.component('rating-select', ratingSelect);
Vue.http.interceptors.push(function(request, next) {
    // console.log(this); // 此处this为请求所在页面的Vue实例
    // modify request
    // request.method = 'POST'; // 在请求之前可以进行一些预处理和配置

    // continue to next interceptor
    next(function(_response) {
        // 在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
        // response = response && response.body || response || {};
        var response = _response.body,
            tempHeader = response && response.responseHeader;
        if (tempHeader.returnStatus == '0') {
            window.alert(tempHeader.returnDesc);
        }
        return _response;
    });
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

// new Vue({
//     http: {
//         root: '/api'
//     },
//     router
// }).$mount('#app');

// router.push('/goods');