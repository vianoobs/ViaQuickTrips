<template>
    <!--v-flex xs12 sm12 md12-->
    <v-container>
        <v-layout>
            <v-flex xs12 sm10 offset-sm1 class="results-header-container">
                <v-title class="display-2 white--text results-header">Results For {{type}} Closest To You</v-title>
                <v-layout row wrap class="results-row">
                    <v-select v-on:change="hello" v-if="this.$route.query.type === 'Food'" :items="food" dark
                              color="red accent-4" class="py-1 ml-3" label="Categories"></v-select>
                    <v-select v-on:change="hello" v-if="this.$route.query.type === 'Drinks'" :items="drink" dark color="red accent-4"
                              class="py-1 ml-3" label="Categories"></v-select>
                    <v-select v-on:change="hello" v-if="this.$route.query.type === 'Attractions'" :items="attraction" dark
                              color="red accent-4" class="py-1 ml-3" label="Categories"></v-select>
                    <v-flex xs12 sm6 class="py-2">
                        <v-btn-toggle exclusive class="m-0">
                            <v-btn v-on:click="sort('$')" flat class="py-1">
                                <v-icon>$</v-icon>
                            </v-btn>
                            <v-btn v-on:click="sort('$$')" flat class="py-1">
                                <v-icon>$$</v-icon>
                            </v-btn>
                            <v-btn v-on:click="sort('$$$')" flat class="py-1">
                                <v-icon>$$$</v-icon>
                            </v-btn>
                            <v-btn v-on:click="sort('$$$$')" flat class="py-1">
                                <v-icon>$$$$</v-icon>
                            </v-btn>
                        </v-btn-toggle>
                    </v-flex>
                </v-layout>
                <v-card id="cardSheet" v-for="(resultCard) in info">
                    <div>
                        <v-img :src="resultCard.image_url" aspect-ratio="5"></v-img>
                        <v-card-title>
                            <v-layout row justify-space-around>
                                <div>
                                    <v-title class="headline"><a v-bind:href="resultCard.url" target="_blank">{{resultCard.name}}</a>
                                    </v-title>
                                    <div>Estimated Time</div>
                                    <div>{{Math.round(((resultCard.distance * 0.000621371) * 20))}} Min</div>
                                </div>
                                <div>
                                    <v-rating small half-increments color="red accent-4" background-color="#42b883"
                                              v-model="resultCard.rating"></v-rating>
                                    <div>Distance: {{(resultCard.distance * 0.000621371).toFixed(2)}} Miles</div>
                                    <div>PRICE: {{resultCard.price}}</div>
                                </div>
                            </v-layout>
                        </v-card-title>
                        <v-container fill-height fluid class="red accent-4">
                            <v-layout align-center justify-center>
                                <v-btn large color="white" v-on:click="result(resultCard)">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px"
                                         viewBox="0 0 504 360" style="enable-background:new 0 0 504 360;"
                                         xml:space="preserve">
                                            <g>
                    	                        <polygon class="st0"
                                                         points="0,44.9 47.8,44.9 46.1,138.1 105.6,44.9 150.8,44.9 58.4,184.3 5.7,184.3  "/>
                                                <polygon class="st0"
                                                         points="160.7,44.9 205.9,44.9 160.7,184.3 116.5,184.3  "/>
                                                <path class="st0"
                                                      d="M328.3,184.3l-7.1-139.4h-52.7l-93.8,139.4h45.6l11.6-19.7h49.3l-0.3,19.7H328.3z M251.5,134l30.9-50.7V134   H251.5z"/>
                                                <polygon class="st0"
                                                         points="181.1,325.1 405.9,122.1 354.2,34.9 504,121.8  "/>
                                            </g>
                                        </svg>
                                    <span id="text">Does it Faster</span>
                                </v-btn>
                            </v-layout>
                        </v-container>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios, {AxiosResponse} from "axios";
    import router from "../router";
    import { store } from '../store/store';

    export default  {

        components: {
            store
        },

        //data
        data() {
            return {
                food : ['Asian Fusion', 'Mexican', 'Pizza', 'Burgers', 'Italian', 'Restaurants', 'Fast Food', 'Vegetarian', 'Vegan'],
                drink : ['Juice Bars & Smoothies', 'Lounges', 'Dive Bars', 'Beer Bar', 'Cocktail Bars', 'Coffee', 'Wine Bar'],
                attraction : ['Art & Entertainment', 'Arcades', 'Tours', 'Music Venues', 'Parks', 'Amusement Parks', 'Landmarks & Historical Buildings', 'Performing Arts'],
                info : '',
            }
        },

        //computed
        computed: {
            type() {
            return this.$route.query.type
            },

            direction() {
                return store.state.direction
            },

            yelpResults() {
                return store.state.yelpFullResult
            },
        },

        // method
        methods:{
            sort(dollars) {
                this.info = [];
                console.log(this.yelpResults.businesses);
                console.log(this.yelpResults);
                this.info = this.yelpResults.businesses.filter(business => business.price === dollars)
                // console.log(this.info)
            },

            hello(e) {
                axios
                    .post('http://localhost:8081/api/yelp', {
                        lat: store.state.direction.lat,
                        long: store.state.direction.long,
                        term: e
                    })
                    .then(response => {
                        store.commit('changeYelpFullList', response.data);
                        this.info = this.yelpResults.businesses;
                        // console.log(store.state.yelpFullResult())
                    })
            },

            result(e) {
                store.commit('changeSingleResult', e);
                // console.log(store.state.singleResult)
                router.push({
                    name: 'routepreview',
                    query: {type: this.type}
                })
            },
        },

        mounted() {
            axios
                .post('http://localhost:8081/api/yelp', {
                    lat: store.state.direction.lat,
                    long: store.state.direction.long,
                    term: this.$route.query.type,
                    radius: '8000'
                })
                .then(response => {
                    store.commit('changeYelpFullList', response.data);
                    this.info = this.yelpResults.businesses;
                    // console.log(this.info)
                })
        },
    }
</script>

<style scoped>
    .st0, #text {
        color: red;
        font-weight: bold;
        fill: red;
        padding-bottom: 2vh;
    }

    #cardSheet {
        margin-bottom: .7em;
        border: solid white 2px;
        border-radius: 4px;
    }

    .v-btn__content > svg {
        height: 36px;
        width: 79px;
    }

    .results-header-container {
        text-align: center;
    }

    .results-row {
        padding-top: 1em;
    }

    .results-header {
        transition: all 0.3s ease;
    }

    @media screen and (max-width: 600px) {
        .results-header {
            font-size: 2em !important;
        }
    }
</style>
