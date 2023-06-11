import { createStore } from 'vuex'


const store = createStore({
    state: {
        staffId: "",
        staffLevel: "",
        token: "",
    },
    mutations: {
        setUserID(state, staffId) {
            state.staffId = staffId
        },
        setUsername(state, staffLevel) {
            state.staffLevel = staffLevel
        },
        setToken(state, token) {
            state.token = token
        },
    }
})

export default store