<template>
    <div>
        <div class="container-fluid mt-2">
            <div class="card">
                <div class="card-header">
                    <h1 class="card-title">Nachrichten</h1>
                </div>
                <div class="card-body">
                    <div class="list-group list-group-flush">
                        <div v-for="chat of this.getLastChats()" :key="chat.nachricht">
                            <router-link :to="{ name: 'chat', params: {partnerId: chat.chatpartner.toString()}}">
                                <div class="list-group-item list-group-item-action bg-light text-decoration-none">
                                    <span class="h5 text-decoration-none">{{ chat.benutzername }}</span>
                                    <span class="h5 float-right">{{convert(chat.zeit)}}</span>
                                </div>
                            </router-link>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: "ChatOverview",
        methods: {
            ...mapGetters('chat', ['getLastChats']),
            ...mapActions('chat', ['fetchLastChat']),
            convert: function (value) {
                return  new Date(value).toLocaleString();
            }
        },
        created() {
            this.fetchLastChat()
        }
    }
</script>

<style scoped>

</style>