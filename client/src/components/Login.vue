<template>
    <div class="text-xs-center">
        <v-btn v-if="user" slot="activator" color="white" flat :disabled="value" class="login-button">
            <span v-on:click="logout()">Logout</span>
        </v-btn>
        <!--persistent="true"-->
        <v-dialog v-model="value" width="500" :dark="true">
            <v-btn v-if="user === '' && !value" slot="activator" color="white" flat :disabled="value" class="login-button">
                <span >Login</span>
            </v-btn>

            <v-card>
                <v-card-title class="headline grey darken-3 modal-title" primary-title>
                    Login to Quick Trips
                </v-card-title>

                <v-card-text class="social-login-button-container">
                    <a href="http://localhost:8081/api/auth/google"><v-btn color="red" class="social-login-button google"><span class="social-name">Google</span>
                        <v-icon class="social-icon">fab fa-google</v-icon></v-btn>
                    </a>
                    <a href="http://localhost:8081/auth/facebook"><v-btn color="blue" class="social-login-button facebook"><span class="social-name">Facebook</span>
                        <v-icon class="social-icon">fab fa-facebook</v-icon>
                    </v-btn>
                    </a>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" flat @click="value = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

    import axios from "axios";
    // import {weatherData} from "./weatherData";

    import { store } from '../store/store';

    export default {
        //data
        data() {
            return {
                value : false
            }
        },

        methods: {
            logout(){
                console.log("logged out");
                console.log(this.value)
                store.commit('logoutUser', '');
            }
        },

        computed: {
            isLoading() {
                return store.state.isLoading;
            },

            user() {
                console.log(store.state.user)
                console.log(this.value)
                return store.state.user
            }
        },

    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat:300,600');

    .login-button {
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
    }

    .modal-title {
        display: flex;
        justify-content: center;
        color: white;
    }

    .social-login-button-container {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    .social-login-button {
        height: 4em !important;
        width: 12em;
    }

    .social-login-button div {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    .social-name {
        font-size: 1.2em;
        flex-grow: 1;
        color: white;
    }

    .social-icon {
        width: 30%;
        font-size: 2.5em;
    }

    .google .social-icon {
        color: rgba(255, 255, 255, 0.6) !important;
    }

    .facebook .social-icon {
        color: rgba(255, 255, 255, 0.6) !important;
    }
</style>
