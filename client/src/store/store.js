import Vue from 'vue';
import Vuex from 'vuex';
import axios, {AxiosResponse} from "axios";

Vue.use(Vuex);

// creates a unique ID
const uniqId = () => {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};


export const store = new Vuex.Store({
    state:{
        // Current state of the application lies here.
        isLoading: false,
        user: ''
    },
    getters:{
        // Compute derived state based on the current state. More like computed property.
        budgetList: state => {
            return state.budgetRows;
        },
    },
    mutations:{
        // Mutate the current state

        commitSetIsLoading(e) {
            state.isLoading = e;
        },

        changeUser (state, user) {
            state.user = user
        },

        logoutUser (state, user) {
            state.user = user;
            axios.get('/api/logout').then(res => {
                        console.log(res)
                    })
        }

    },
    actions:{
        // Get data from server and send that to mutations to mutate the current state

        // login(payload) {
        //     try {
        //         store.commitSetIsLoading(true);
        //
        //         console.log('login');
        //         const userRes = payload;
        //
        //         store.commitSetUser(userRes)
        //
        //     } finally {
        //         auth.commitSetIsLoading({isLoading: false})
        //     }
        // },
        //
        // logout() {
        //     console.log('logout');
        //     commitSetUser({user: {}});
        //     axios.get('/api/logout').then(res => {
        //         console.log(res)
        //     })
        // }
    }
});
