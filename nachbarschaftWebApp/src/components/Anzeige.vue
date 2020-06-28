<template>
    <div>
        <div class="jumbotron jumbotron-fluid">
            <div class="container-fluid ">
                <div class="row mb-2 mx-2">
                    <div class="col pb-2">
                        <h3> {{ this.getCurrentAnzeige.titel }} </h3>
                    </div>
                    <div v-if="this.isLoggedIn && this.getCurrentAnzeige.ben_id !== this.user.id">
                        <!-- Melden Button:-->
                        <b-button v-b-modal.modal-prevent-closing class="btn-danger btn-sm float-right mr-4">
                            <b-icon :icon="this.ex" scale="2"></b-icon>
                        </b-button>

                        <b-modal
                                id="modal-prevent-closing"
                                ref="modal"
                                title="Melden"
                                @show="resetModal"
                                @hidden="resetModal"
                                @ok="handleOk"
                        >
                            <form ref="form" @submit.stop.prevent="handleSubmit">
                                <b-form-group
                                        :state="nameState"
                                        label="Bitte geben Sie die Beschwerde ein"
                                        label-for="name-input"
                                        invalid-feedback="Sie müssen einen Grund angeben"
                                >
                                    <b-form-input
                                            id="name-input"
                                            v-model="text"
                                            :state="nameState"
                                            required
                                    ></b-form-input>
                                </b-form-group>
                            </form>
                            <template v-slot:modal-footer="{ ok, cancel}">
                                <!-- Emulate built in modal footer ok and cancel button actions -->
                                <b-button size="sm" variant="danger" @click="ok()">
                                    Melden
                                </b-button>
                                <b-button size="sm" @click="cancel()">
                                    Abbrechen
                                </b-button>
                            </template>
                        </b-modal>
                    </div>
                </div>
                <div class="row mb-2 mx-2">
                    <div class="col-2">
                        <button @click="pushToAnzeige(getCurrentAnzeige.ben_id)" type="button" class="btn btn-primary">Vollständiges Profil</button>
                    </div>
                    <div class="col-10" >
                        <div v-if="this.isLoggedIn && this.getCurrentAnzeige.ben_id === this.user.id">
                            <h3 class="float-left"><span class="font-weight-bold">Thema:</span> {{this.getCurrentAnzeige.thema}} </h3>
                                <button @click="removeAnzeige(getCurrentAnzeige.id)" type="button" class="btn btn-primary btn-sm float-right">
                                    <i :class="this.x"></i>
                                </button>
                        </div>
                        <div v-if="this.isLoggedIn">
                            <button @click="addFavoritToData" type="button" class="btn btn-primary btn-sm float-right mr-2">
                                <i :class="this.heart"></i>
                            </button>
                        </div>

                    </div>
                </div>

                <div class="row mx-2">
                    <div class="col-2">
                        <div class="row">
                            <div class="col">
                               <span class="font-weight-bold">Benutzername:</span>
                                <p>{{ this.getUser.benutzername }}</p>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span>
                                <span class="fa fa-star"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col pt-5">
                                <p class="font-weight-bold">PLZ:</p>
                                <p>{{ this.getUser.plz }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col pt-5">
                                <p class="font-weight-bold">Wohnort:</p>
                                <p class="text-capitalize">{{ this.getUser.wohnort }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col pt-5">
                                <button type="button" class="btn btn-primary btn-block"><i class="fa fa-comment"></i></button>
                            </div>
                        </div>

                    </div>
                    <div class="col-10 border-left border-primary" >
                        {{ this.getCurrentAnzeige.beschreibung }}
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    // TODO: Bewertungen auswerten und Sterne anpassen
    // TODO: Chat
    // TODO: Eigene Anzeige bearbeiten koennen ?
    // TODO: Favoriten entfernen
    import {mapActions, mapGetters, mapState} from "vuex";
    import AnzService from "../services/AnzeigenService";

    export default {
        name: "Anzeige",
        props: ['id'],
        data() {
            return {
                msg: '',
                nameState: null,
                text: "",
                ex: "exclamation",
                heart: "fa fa-heart",
                x: "fa fa-times",
            }
        },
        methods: {

            checkFormValidity() {
                const valid = this.$refs.form.checkValidity()
                this.nameState = valid
                return valid
            },
            resetModal() {
                this.name = ''
                this.nameState = null
            },
            handleOk(bvModalEvt) {
                // Prevent modal from closing
                bvModalEvt.preventDefault()
                // Trigger submit handler
                this.handleSubmit()
            },
            async handleSubmit() {
                if (!this.checkFormValidity()) {
                    return
                }
                await AnzService.anzeigeMelden(this.id, this.text);
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing')
                })
            },
            ...mapActions("anzeigen", ["filterAnzeigenById", "addFavorit"]),
            ...mapActions("benutzer", ["fetchUserInformationById"]),

            async fetchAnzeigenInformation() {
                await this.filterAnzeigenById(this.id);
                await this.fetchUserInformationById(this.getCurrentAnzeige.ben_id);
            },
            pushToAnzeige: function (id) {
                this.$router.push({name: 'profil', params: {id}});
            },
            async addFavoritToData() {
                try {
                    this.msg = await this.addFavorit(this.getCurrentAnzeige.id);

                }catch (error) {
                    error.response.msg;
                }

            },
            async removeAnzeige(id) {
                try {
                    this.msg = await AnzService.deleteAnzeige(id)
                    this.$router.push("/");
                }catch (error) {
                    error.response.data

                }
            }
        },
        computed: {
            ...mapGetters("anzeigen",["getCurrentAnzeige"]),
            ...mapGetters("benutzer", ["getUser"]),
            ...mapGetters("login", ["isLoggedIn"]),
            ...mapState('login', ['user'])
        },

        created() {
            this.fetchAnzeigenInformation();

        },

    }
</script>

<style scoped>

</style>