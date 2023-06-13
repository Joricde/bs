import {createStore} from 'vuex'

const defaultState = ()=>{
    return {
        staffData: {
            name: sessionStorage.getItem('name')||"",
            staffId: sessionStorage.getItem('staffId')||"",
            staffLevel: sessionStorage.getItem('staffLevel')||"",
            number:sessionStorage.getItem('number')||0,
        },
        token: sessionStorage.getItem('token')||"",
        adminId:sessionStorage.getItem('adminId')||"",
    }
}


const store = createStore({
    state: defaultState(),
    mutations: {
        setToken(state, token) {
            state.token = token
            sessionStorage.setItem('token',token)
        },
        setStaff(state, staff) {
            state.staffData.name = staff.name
            sessionStorage.setItem('name',staff.name)
            state.staffData.staffId = staff.staffId
            sessionStorage.setItem('staffId',staff.staffId)
            state.staffData.staffLevel = staff.staffLevel
            sessionStorage.setItem('staffLevel',staff.staffLevel)
            state.staffData.number = staff.number
            sessionStorage.setItem('number', staff.number)
        },
        setAdminId(state, adminId){
            state.adminId = adminId
            sessionStorage.setItem('staffLevel',adminId)
        },
        clearState(state){
            sessionStorage.clear()
            Object.assign(state, defaultState())
        }


    }
})

export default store