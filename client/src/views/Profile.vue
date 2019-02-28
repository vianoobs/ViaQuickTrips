<template>
    <v-container grid-list-xl>
        <userProfile></userProfile>
    </v-container>
</template>

<script>
    import userProfile from '@/components/userProfile'

    export default {
        name: "Profile",
        components: {
            userProfile
        }
    }
</script>

<style scoped>

</style>