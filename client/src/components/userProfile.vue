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
                        <v-btn  v-for="(social, i) in socials"
                                :key="i"
                                :color="social.color"
                                class="white--text"
                                fab
                                icon
                                small>
                            <v-icon>{{social.icon}}</v-icon>
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
                    }
                ]
            }
        },

        mounted() {
            axios
                .post('http://localhost:8081/api/show-search', {
                    owner: store.state.user.userId
                }).then(res => {
                    this.cardz = res.data;
                    console.log(res.data)
            });
        }
    }
</script>

<style scoped>

</style>