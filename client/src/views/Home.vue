<template>
    <v-container>
        <v-layout column align-center fill-height>
        <v-title color:="white" class="display-3 white--text">VIA QUICK TRIPS</v-title>
            <v-progress-circular v-if="loading"
                    :size="200" :width="20"
                    color="#42b883" indeterminate
            ></v-progress-circular>
        <v-container grid-list-xl fill-height>
            <v-layout column align-center justify-center>
                <v-btn color="red accent-4" class="home-button" large v-on:click="locate(food)">
                    <v-title class="button-text">Find Food</v-title>
                    <v-icon class="fa">fas fa-utensils</v-icon></v-btn>
                <v-btn color="red accent-4" class="home-button" large v-on:click="locate(drink)">
                    <div class="button-text">Find Drinks</div>
                    <v-icon class="fa">fas fa-coffee</v-icon></v-btn>
                <v-btn color="red accent-4" class="home-button" large v-on:click="locate(attraction)">
                    <div class="button-text">Find Attractions</div>
                    <v-icon class="fa">fas fa-map-marked-alt</v-icon></v-btn>
            </v-layout>
        </v-container>
        </v-layout>
    </v-container>
</template>

<script>
    import router from "../router";
    import axios, {AxiosResponse} from "axios";
    import { store } from '../store/store';

    export default {

        name: 'Home',
        components: {
            store
        },

        //data
        data: () => {
            return {
                loader: null,
                loading: false,
                food: "Food",
                drink :"Drinks",
                attraction : "Attractions",
                lat : "",
                long : "",
                type : "type",
            }
        },

        //computed properties
        computed: {

            user: {
                get () {
                    return store.state.user
                },

                set (value) {
                    store.commit('changeUser', value)
                }
            }
        },

        //methods
        methods: {
            locate(type) {
                this.loading = true;
                this.type = type;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.showPosition);
                }
            },

            showPosition(position) {
                this.lat = position.coords.latitude;
                this.long = position.coords.longitude;
                console.log(this.type)
                console.log(this.lat);
                console.log(this.long);
                router.push({path: 'selection', query: {type: this.type, lat: this.lat, long: this.long}})
            }
        },

        //mount
        mounted() {
            axios
                .get('/api/user', { withCredentials: true }).then(res => {
                store.commit('changeUser', res.data);
            });
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat:300');

    .v-btn {
        height: 20%;
    }

    .router-view {
        background-color: #343a40;
    }

    .home-button {
        color: white !important;
        font-family: 'Montserrat', sans-serif;
    }

    .button-text {
        width: 80%;
        font-size: 2em;
        font-weight: bold;
        transition: all 0.5s ease !important;
    }

    .fa {
        opacity: 0.5;
        transition: all 0.5s ease !important;
    }

    .home-button:hover .fa {
        opacity: 0.9
    }

    @media screen and (max-width: 600px) {
        .title {
            font-size: 3em !important;
        }
        .button-text {
            font-size: 1.5em;
        }
    }
</style>

<style scoped>
    button {
        min-width: 100% !important;
    }
</style>
