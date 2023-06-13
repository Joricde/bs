import {createRouter, createWebHashHistory} from 'vue-router'

import loginView from "@/views/Login.vue";
import HomeView from "@/views/Home.vue"
import PersonalView from "@/views/Profile.vue"
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
    {path: '/staff', component: StaffView,children:[
            {path: '', component: HomeView},
            {path: '/profile', component: PersonalView},
            {path: '/buffer',component: buffer},

            {path: '/openAccount',component:openAccount},
            {path: '/saveMoney',component:saveMoney},
            {path: '/drawMoney',component:drawMoney},
            {path: '/queryAccount',component:queryAccount},
            {path: '/queryRecords',component:queryRecords},
            {path: '/transMoney',component:transMoney},
            {path: '/changePassword',component:changePassword},
            {path: '/closeAccount',component: closeAccount},
            {path: '/message',component: ExecutionMS},

        ]},
    {path: '/admin', component: AdminView},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router