<template>
    <div>
        <div class="container-fluid mt-2 w-50">
            <div class="card myNewDivHeight">
                <div class="card-header">
                    <span class="card-title h1">Chat - {{ getUser().benutzername }}</span>
                    <button @click="fetchMessages" class="btn btn-primary float-right"><i class="fa fa-sync" aria-hidden="true"></i></button>

                </div>
                <div class="card-body overflow-auto" id="chat_log">
                    <!-- Nachrichten -->
                    <div class="chat-log">
                        <div v-for="message of getCompleteChatLog()" :key="message.id">
                            <div v-if="message.zu_id === getUser().id">
                                <div class="chat-log__item chat-log__item--own" :class="`index-${message.id}`">
                                    <h3 class="chat-log__author">{{ user.benutzername }} <small>{{ convert(message.zeit) }}</small></h3>
                                    <div class="chat-log__message">{{ message.nachricht }}</div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="chat-log__item" :class="`index${message.id}`">
                                    <h3 class="chat-log__author">{{ getUser().benutzername }} <small>{{convert(message.zeit)}}</small></h3>
                                    <div class="chat-log__message">{{message.nachricht}}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="card-footer">
                    <div class="input-group mb-3">
                        <input v-model="nachricht" type="text" class="form-control" placeholder="Nachricht...">
                        <div class="input-group-append">
                            <button @click="sendMessageToUser" class="btn btn-info" type="submit">Senden</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex';
    import ChatService from "../services/ChatService";

    export default {
        data() {
            return {
                index: '',
                nachricht: '',
                msg: '',
            }
        },
        name: 'Chat',
        props: ['partnerId'],
        methods: {
            ...mapActions('chat', ['fetchSendMessages','fetchReceivedMessages', 'filterReceivedMessages',
                'savePartnerId', 'filterSendMessages', 'sortAllMessages', "updateAllMessages"]),
            ...mapActions('benutzer', ["fetchUserInformationById"]),
            ...mapGetters('chat', ['getChatParticipantMessages', 'getSendMessages', 'getOwnMessages', 'getCompleteChatLog']),
            ...mapGetters('benutzer', ['getUser']),
            async sendMessageToUser() {
                try{
                    const message = {
                        von_id: this.user.id,
                        zu_id: this.partnerId,
                        nachricht: this.nachricht,

                    }
                    this.msg = await ChatService.sendMessage(message);

                    this.fetchMessages()
                    //this.fetchMessages()
                    this.nachricht = '';


                }catch (error) {
                    error.response.data
                }

            },

            async fetchMessages() {
                await this.fetchUserInformationById(this.partnerId)
                await this.fetchReceivedMessages();
                await this.fetchSendMessages();
                this.savePartnerId(this.partnerId);
                this.filterReceivedMessages();
                this.filterSendMessages();
                this.sortAllMessages();
                this.scrollToEnd()

            },
            convert: function (value) {
                return  new Date(value).toLocaleString();
            },
            scrollToEnd: function () {
                var container = this.$el.querySelector("#chat_log");
                container.scrollTop = container.scrollHeight
            }
        },
        created() {
            this.fetchMessages()

        },
        computed: mapState('login',["user"])
    }
</script>

<style scoped>
    @media screen and (min-width: 1024px) {
        .myNewDivHeight{
            height:600px;
        }
    }
    body {
        background: #E5DDD5 url("https://www.toptal.com/designers/subtlepatterns/patterns/sports.png") fixed;
    }

    .chat-log {
        padding: 40px 0 10px;
        height: auto;
        overflow: auto;
    }
    .chat-log__item {
        background: #fafafa;
        padding: 10px;
        margin: 0 auto 20px;
        max-width: 80%;
        float: left;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgba(0,0,0,.1);
        clear: both;
    }

    .chat-log__item.chat-log__item--own {
        float: right;
        background: #DCF8C6;
        text-align: right;
    }


    .chat-log__author {
        margin: 0 auto .5em;
        font-size: 14px;
        font-weight: bold;
    }

</style>