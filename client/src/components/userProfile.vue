<template>
    <v-container fluid grid-list-md grey lighten-4>
        <v-container>

        </v-container>
        <v-subheader>Recent Routes</v-subheader>
        <v-layout row wrap>
            <v-spacer></v-spacer>
            <v-flex v-for="(card, i) in cardz"
                    :key="i"
                    xs12 sm6 md4>
                <v-card>
                    <v-img :src="card.imageURL" aspect-ratio="1" alt="Image">
                        <span class="headline white--text pl-3 pt-3" v-text="">{{card.name}}</span>
                        <v-layout align-end fill-height pa-3 white--text>
                            <span class="title white--text pl-3 pb-3" v-text="">{{card.address}}</span>
                        </v-layout>
                    </v-img>
                    <v-card-actions class="white justify-center">
                        <v-btn :href="card.googleURL" target="_blank"
                                color = "#42b883"
                                class="white--text"
                                fab
                                icon
                                small>
                            <v-icon>fas fa-map-marked-alt</v-icon>
                        </v-btn>
                        <v-btn :href="card.URL" target="_blank"
                               color="red accent-4"
                               class="white--text"
                               fab
                               icon
                               small>
                            <v-icon>fab fa-yelp</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios, {AxiosResponse} from "axios";
    import { store } from '../store/store';

    export default {
        name: "userProfile",
        data() {
            return {
                types: ['Places to Be', 'Places to See'],
                cardz: {},
                socials: [
                    {
                        icon: 'fab fa-yelp',
                        color: 'red accent-4'
                    },
                    {
                        icon: "fas fa-map-marked-alt",
                        color:"#42b883"
                    }
                ]
            }
        },

        mounted() {
            axios
                .post('/api/show-search', {
                    owner: store.state.user.userId
                }).then(res => {
                    this.cardz = res.data;
                    // console.log(res.data)
            });
        }
    }
</script>

<style scoped>

    .v-btn--floating.v-btn--small .v-icon {
        font-size: 21px;
        margin-left: 9px;
        margin-top: 17px;
    }

</style>