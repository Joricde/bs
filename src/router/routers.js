import {createRouter, createWebHashHistory} from 'vue-router'

import loginView from "@/views/Login.vue";
import IndexView from "@/views/Index.vue";
import StaffView from "@/views/Staff.vue"
import AdminView from "@/views/Admin.vue";

import openAccount from "@/components/bissness/OpenAccount.vue";
import saveMoney from "@/components/bissness/SaveMoney.vue";
import drawMoney from "@/components/bissness/DrawMoney.vue";
import queryAccount from "@/components/bissness/QueryAccount.vue";
import queryRecords from "@/components/bissness/QueryRecords.vue";
import transMoney from "@/components/bissness/TransMoney.vue";
import changePassword from "@/components/bissness/ChangePassword.vue";
import closeAccount from "@/components/bissness/CloseAccount.vue";
import buffer from "@/test/BufferTest.vue";

const routes = [
    {path: '/', component: IndexView},
    {path: '/login', component: loginView},
    {path: '/staff', component: StaffView,},
    {path: '/admin', component: AdminView},

    {path: '/test',component: buffer},
    {path: '/test/1',component:openAccount},
    {path: '/test/2',component:saveMoney},
    {path: '/test/3',component:drawMoney},
    {path: '/test/4',component:queryAccount},
    {path: '/test/5',component:queryRecords},
    {path: '/test/6',component:transMoney},
    {path: '/test/7',component:changePassword},
    {path: '/test/8',component: closeAccount},



]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router