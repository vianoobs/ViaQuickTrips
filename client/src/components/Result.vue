<template>
    <v-container>
        <v-container>
            <v-layout>
                <v-flex xs12 sm10 offset-sm1>
                    <v-title class="display-2 white--text">{{card.name}}</v-title>
                    <v-card id="cardSheet">
                        <v-img :src="card.image_url" aspect-ratio="2"></v-img>
                        <v-card-title>
                            <v-layout row justify-space-around><div>
                                <v-title class="headline"><a v-bind:href="card.url" target="_blank">{{card.name}}</a></v-title>
                                <div>Estimated Time</div>
                                <div>{{Math.round(((card.distance * 0.000621371) * 20))}} Min</div>
                            </div>
                                <div>
                                    <v-rating small half-increments color="red accent-4" background-color="#42b883" v-model="card.rating"></v-rating>
                                    <div>Distance: {{(card.distance * 0.000621371).toFixed(2)}} Miles</div>
                                    <div>PRICE: {{card.price}}</div>
                                </div>
                            </v-layout>
                        </v-card-title>
                        <v-container v-for="(transit) in google[0].steps" fill-height fluid class="red accent-4 resultP">
                            <v-container fill-height fluid class="white resultBorder">
                                <v-layout>
                                    <v-icon v-if="travelPic(transit.travel_mode) === 1" color="red accent-4">fas fa-bus</v-icon>
                                    <v-icon v-if="travelPic(transit.travel_mode) === 2" color="red accent-4">fas fa-walking</v-icon>
                                    <v-title class="px-2">{{transit.travel_mode}}</v-title>
                                    <v-chip v-if="travelPic(transit.travel_mode) === 1" v-bind:style="{backgroundColor: transit.transit_details.line.color, borderRadius: '.7em'}" class="viaBus">{{transit.transit_details.line.short_name}}</v-chip>
                                    <v-layout v-if="travelPic(transit.travel_mode) === 1" column class="px-3">
                                        <v-title v-if="travelPic(transit.travel_mode) === 1"> Bus Arrival Time: {{transit.transit_details.departure_time.text}}</v-title>
                                        <v-title>{{transit.html_instructions.split(',')[0]}}</v-title>
                                    </v-layout>
                                    <v-title v-if="travelPic(transit.travel_mode) === 2" >{{transit.html_instructions.split(',')[0]}}</v-title>
                                    <v-spacer></v-spacer>
                                    <v-title>{{transit.duration.text}}</v-title>
                                </v-layout>
                            </v-container>
                        </v-container>
                        <v-container fill-height fluid class="red accent-4">
                            <v-layout align-center justify-center>
                                <v-btn v-on:click="url" v-bind:style="{textDecoration: 'none'}" target="_blank">Start Adventure</v-btn>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script>
    import axios, {AxiosResponse} from "axios";
    import router from "../router";
    import { store } from '../store/store';

    export default {
        components:{
            store
        },

        computed: {

            card: {
                get () {
                    return store.state.singleResult
                },

                set (value) {
                    store.commit('changeSingleResult', value)
                }
            },

            google: {
                get () {
                    return store.state.google
                },

                set (value) {
                    store.commit('changeGoogleResult', value)
                }
            }
        },

        mounted() {
            axios
                .post('http://localhost:8081/api/maps', {
                    currentLat:store.state.direction.lat,
                    currentLong:store.state.direction.long,
                    destination:this.card.location.address1 + this.card.location.city
                })
                .then(response => {
                    store.commit("changeGoogleResult", response.data)
                    // console.log(store.state.google)
                })
        },

        methods: {
            travelPic(e){
                if (e === 'TRANSIT') {
                    return 1
                }else if (e === 'WALKING'){
                    return 2
                }
            },

            url(){
                let url ="";
                if( (navigator.platform.indexOf("iPhone") !== -1)
                    || (navigator.platform.indexOf("iPod") !== -1)
                    || (navigator.platform.indexOf("iPad") !== -1))
                    url = "comgooglemaps://?daddr=" + this.google[0].end_address.split(" ").join("+") + "&directionsmode=transit";
                else {
                    url = "https://www.google.com/maps/dir/?api=1&destination=" + this.google[0].end_address.split(",").join("%2C").split(" ").join("+") + "&travelmode=transit&dir_action=navigate";
                    window.open(
                        url,
                        '_blank' // <- This is what makes it open in a new window.
                    );
                }
                if (store.state.user !== '') {
                    axios
                        .post('http://localhost:8081/api/save-search', {
                            owner: store.state.user.userId,
                            name: this.card.name,
                            address: this.google[0].end_address,
                            imgURL: this.card.image_url,
                            URL: this.card.url,
                            googleURL: url
                        }).then(res => {
                        // console.log(res.data)
                    });
                }

                return url
            }
        }

    }
</script>

<style scoped>
    .viaBus {
        max-height: 50px;
    }
    .layout > a > button {
        width: 100%;
        min-height: 3em;
    }
    .resultP{
        padding: 1em 2em;
    }
    .resultBorder{
        box-shadow: 1px 3px 7px 0px #333a41;
        border-radius: .5em;
    }
    #cardSheet {
        margin-bottom: .7em;
        border: solid white 2px;
        border-radius: 4px;
    }
</style>


