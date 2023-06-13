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
import ExecutionMS from "@/components/ExecutionMS.vue";

const routes = [
    {path: '/', component: IndexView},
    {path: '/login', component: loginView},
    {path: '/staff', component: StaffView,},
    {path: '/admin', component: AdminView},

    {path: '/act'/'buffer',component: buffer},
    {path: '/act/openAccount',component:openAccount},
    {path: '/act/saveMoney',component:saveMoney},
    {path: '/act/drawMoney',component:drawMoney},
    {path: '/act/queryAccount',component:queryAccount},
    {path: '/act/queryRecords',component:queryRecords},
    {path: '/act/transMoney',component:transMoney},
    {path: '/act/changePassword',component:changePassword},
    {path: '/act/closeAccount',component: closeAccount},
    {path: '/act/message',component: ExecutionMS},



]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router