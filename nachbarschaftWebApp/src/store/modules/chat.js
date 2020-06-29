import Axios from "axios";
// Saves the current state

const state = {
  sendMessages: [],
  receivedMessages: [],
  participantsMessages: [],
  ownMessageToParticipant: [],
  lastChats: [],
  partnerId: '',
  completeChatLog: [],
};

// Getter to return state variables
const getters = {
    getSendMessages: state => state.sendMessages,
    getReceivedMessages: state => state.receivedMessages,
    getChatParticipantMessages: state => state.participantsMessages,
    getLastChats: state => state.lastChats,
    getOwnMessages: state => state.ownMessageToParticipant,
    getCompleteChatLog: state => state.completeChatLog

};

// Actions that call mutation functions
const actions = {
    async fetchSendMessages({commit, rootState}) {
        const userId = rootState.login.user.id
        const response = await Axios.get("http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/nachricht/von_id?von_id=" + userId);

        commit('SET_SEND_MESSAGES', response.data);
    },
    async fetchReceivedMessages({commit, rootState}) {
        const userId = rootState.login.user.id
        const response = await Axios.get("http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/nachricht/zu_id?zu_id=" + userId);

        commit('SET_RECEIVED_MESSAGES', response.data);
    },
    async fetchLastChat({commit, rootState}) {
        const userId = rootState.login.user.id
        const response = await Axios.get("http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/letzter_chat/id?id=" + userId);

        commit('SET_LAST_CHATS', response.data);
    },
    filterReceivedMessages({state, commit}) {

        let participantMessage = []
        for(let i = 0; i < state.receivedMessages.length; i++) {
            if(state.receivedMessages[i].von_id == state.partnerId) {
                participantMessage.push(state.receivedMessages[i]);
            }
        }
        commit('SET_PARTICIPANT_MESSAGES', participantMessage);
    },
    filterSendMessages({state, commit}) {
      let ownMessage = []
      for(let i = 0; i < state.sendMessages.length; i++) {
          if(state.sendMessages[i].zu_id == state.partnerId) {
              ownMessage.push(state.sendMessages[i])
          }
      }
        commit('SET_OWN_MESSAGES_TO_PARTICIPANT', ownMessage)
    },

    sortAllMessages({state, commit}) {
        let unsortedLog = state.ownMessageToParticipant.concat(state.participantsMessages);
        for(let i = unsortedLog.length; i > 1; i--) {
            for(let y = 0; y < i-1; y++) {
                if(unsortedLog[y].zeit > unsortedLog[y+1].zeit) {
                    let first = unsortedLog[y];
                    unsortedLog[y] = unsortedLog[y + 1];
                    unsortedLog[y+1] = first;
                }
            }
        }
        commit('SET_COMPLETE_CHAT_LOG', unsortedLog);

    },
    savePartnerId({commit}, id) {

        commit('SET_PARTNER_ID', id)
    },
    updateAllMessages({commit}, message) {

        commit('UPDATE_ALL_MESSAGES', message)
    }

};

// Changes state in vuex storage
const mutations = {
    SET_SEND_MESSAGES: (state, messages) => (state.sendMessages = messages),
    SET_RECEIVED_MESSAGES: (state, messages) => (state.receivedMessages = messages),
    SET_PARTICIPANT_MESSAGES: (state, messages) => (state.participantsMessages = messages),
    SET_LAST_CHATS: (state, chats) => (state.lastChats = chats),
    SET_PARTNER_ID: (state, id) => (state.partnerId = id),
    SET_OWN_MESSAGES_TO_PARTICIPANT: (state, messages) => (state.ownMessageToParticipant = messages),
    SET_COMPLETE_CHAT_LOG: (state, messages) => (state.completeChatLog = messages),
    UPDATE_ALL_MESSAGES: (state, message) => (state.completeChatLog.unshift(message)),

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};