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
        user: '',
        yelpFullResult: '',
        singleResult: '',
        direction: {lat: '', long: ''},
        google: '',
    },
    getters:{
        // Compute derived state based on the current state. More like computed property.
        user: state => {
            return state.user;
        },
        yelpFullResult: state => {
            return state.yelpFullResult;
        },
        yelpSingleResult: state => {
            return state.singleResult;
        },
        directionLat: state => {
            return state.direction.lat;
        },
        directionLong: state => {
            return state.direction.long;
        },
        googleResult: state => {
            return state.google;
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
        },

        changeYelpFullList(state, results) {
            state.yelpFullResult = results;
        },

        changeSingleResult(state, single){
            state.singleResult = single;
        },

        changeGoogleResult(state, google){
            state.google = google;
        },

        changeDirection(state, {lat, long}){
            state.direction.lat = lat;
            state.direction.long = long;
            console.log(long)
        }
    },
    actions:{

    }
});
