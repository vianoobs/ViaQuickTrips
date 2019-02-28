<template>
    <v-app>
        <navbar></navbar>
        <v-content>
            <router-view class="router-view"></router-view>
        </v-content>
    </v-app>
</template>

<script>
    import Vue from 'vue';
    import Vuetify from 'vuetify'
    Vue.use(Vuetify);

    import Navbar from '@/components/Navbar.vue';

    export default {
        name: 'App',
        components: {
            Navbar,
        },
        data() {
            return {

            };
        },
    };
</script>
<style>
    v-app {
        height: 100%;
        width: 100%;
        display: table;
    }
    .navbar {
        display: table-row;
    }
    .router-view {
        width: 100%;
        height: 100%;
    }
</style>
