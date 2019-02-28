<template>
    <div>
        <v-container grid-list-xl>
            <Search></Search>
        </v-container>
    </div>
</template>

<script>
    import Search from "@/components/Search.vue";

    export default {
        name: "Selection",
        components: {
            Search
        }
    }
</script>

<style scoped>

</style>