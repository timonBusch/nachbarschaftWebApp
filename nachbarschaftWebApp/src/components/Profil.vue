<template>
    <div>

        <div class="container-fluid mt-2 w-75">

            <div class="card">
                <div class="card-header">
                    <span class="card-title h2">Profil</span>
                    <!--<div v-if="!isLoggedInUserProfile">-->
                        <!-- Melden Button:-->
                        <b-button v-if="!isLoggedInUserProfile && !this.isAdmin" v-b-modal.modal-prevent-closing class="btn-danger btn-sm float-right">
                            <i :class="this.ex"></i>
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
                    <!--</div>-->
                    <div class="container-fluid">
                    </div>
                </div>
                <div class="col">
                    <button v-if="isLoggedInUserProfile || this.isAdmin" @click="enableEditingMode" type="button" class="btn btn-primary float-right mt-1 mr-4">
                        <i class="fa fa-pen"></i>
                    </button>
                    <p>Bewertung:</p>
                    <div v-if="this.getAverageStars !== 0">
                        <div  v-for="n in this.getAverageStars" :key="n">
                            <span class="fa fa-star checked float-left"></span>
                        </div>
                    </div>
                    <div v-else>
                        <span>Keine Bewertungen vorhanden</span>
                    </div>

                </div>
                <div class="card-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-6">

                                <label>Benutzername:</label>
                                <div class="input-group mb-3">
                                    <div class="border border-primary rounded-lg w-100 p-2">
                                        <div v-if="editingMode">
                                            <input v-model="benutzername" type="text" class="form-control border-0" placeholder="Benutzername...">
                                        </div>
                                        <div v-else>
                                            <span>{{this.currentUser.benutzername}}</span>
                                        </div>
                                    </div>
                                </div>

                                <label>Vorname:</label>
                                <div class="input-group mb-3">
                                    <div class="border border-primary rounded-lg w-100 p-2">
                                        <div v-if="editingMode">
                                            <input v-model="vorname" type="text" class="form-control border-0" placeholder="Vorname...">
                                        </div>
                                        <div v-else>
                                            <span>{{this.vorname}}</span>
                                        </div>
                                    </div>
                                </div>

                                <label>Nachname:</label>
                                <div class="input-group mb-3">
                                    <div class="border border-primary rounded-lg w-100 p-2">
                                        <div v-if="editingMode">
                                            <input v-model="nachname" type="text" class="form-control border-0" placeholder="Nachname...">
                                        </div>
                                        <div v-else>
                                            <span>{{this.nachname}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6">
                                <label>PLZ:</label>
                                <div class="input-group mb-3">
                                    <div class="border border-primary rounded-lg w-100 p-2">
                                        <div v-if="editingMode">
                                            <input v-model="plz" type="text" class="form-control border-0" placeholder="PLZ...">
                                        </div>
                                        <div v-else>
                                            <span>{{this.plz}}</span>
                                        </div>
                                    </div>
                                </div>

                                <label>Wohnort:</label>
                                <div class="input-group mb-3">
                                    <div class="border border-primary rounded-lg w-100 p-2">
                                        <div v-if="editingMode">
                                            <input v-model="wohnort" type="text" class="form-control border-0" placeholder="Wohnort...">
                                        </div>
                                        <div v-else>
                                            <span>{{this.wohnort}}</span>
                                        </div>
                                    </div>
                                </div>

                                <label>Straße:</label>
                                <div class="input-group mb-3">
                                    <div class="border border-primary rounded-lg w-100 p-2">
                                        <div v-if="editingMode">
                                            <input v-model="strasse" type="text" class="form-control border-0" placeholder="Straße...">
                                        </div>
                                        <div v-else>
                                            <span>{{this.strasse}}</span>
                                        </div>
                                    </div>
                                </div>

                                <label>Hausnummer:</label>
                                <div class="input-group mb-3">
                                    <div class="border border-primary rounded-lg w-100 p-2">
                                        <div v-if="editingMode">
                                            <input v-model="hausnummer" type="text" class="form-control border-0" placeholder="Hausnummer...">
                                        </div>
                                        <div v-else>
                                            <span>{{this.hausnummer}}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div class="text-center">
                            <button v-if="this.editingMode === true && isLoggedInUserProfile || this.isAdmin && this.editingMode === true" @click="updateProfile"
                                    type="button" class="btn btn-primary btn-lg mx-auto">Änderungen speichern</button>
                        </div>

                    </div>

                </div>

            </div>

        </div>

        <div v-if="this.getBewertungen && this.getBewertungen.length">

            <div class="row mt-4 mb-4">
                <div class="col"/>
                <div class="col-6 mx-auto">
                    <h3>Bewertungen</h3>
                </div>
                <div class="col"/>
            </div>
            <div class="row" v-for="bewertung of this.getBewertungen" :key="bewertung.id">
                <div class="col"/>
                <div class="col-6 mx-auto">

                    <div class="jumbotron jumbotron-fluid pt-3 pb-3">
                        <div class="container-fluid">
                            <span class="h5 mr-3" >{{ bewertung.ben_name }}</span>
                            <span class="h5 mr-3" >{{ convert(bewertung.datum) }}</span>
                            <span class="h5">({{ bewertung.sterne }} Sterne)</span>
                            <div class="row border-top border-light">
                                <div class="col pl-0">
                                    <div class="container-fluid mt-2">
                                        <span>{{bewertung.kommentar}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col"/>
            </div>
        </div>
        <div v-if="this.isLoggedIn">
            <div v-if="!isLoggedInUserProfile" class="row mt-3">
                <div class="col-6 mx-auto mb-4">
                    <div class="container-fluid">
                        <div class="input-group">
                            <input required v-model="kommentar" type="text" class="form-control" placeholder="Nachricht...">
                            <div class="input-group-append">
                                <button @click="addBewertungToProfile" type="button" class="btn btn-primary">Senden</button>
                                <select required v-model="sterne" class="custom-select">
                                    <option selected>Bewertung...</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'
    import Axios from "axios";
    import BenutzerService from "../services/BenutzerService";
    import AnzService from "../services/AnzeigenService";

    export default {
        name: "Profil",
        props: ['id'],
        data: function() {
            return {
                currentUser: '',
                kommentar: '',
                sterne: '',
                bewertungText: 'Bewertung...',
                editingMode: false,
                benutzername: '',
                vorname: '',
                nachname: '',
                plz: '',
                wohnort: '',
                strasse: '',
                hausnummer: '',
                isLoggedInUserProfile: '',
                msg: '',
                ex: "fa fa-exclamation",
                text: "",
                nameState: null
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
                await AnzService.benutzerMelden(this.id, this.text);
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing')
                })
            },
            enableEditingMode: function () {
                this.editingMode = !this.editingMode;
            },
            ...mapActions('benutzer', ['fetchBewertungenByUserId', 'fetchUserInformationById', 'calcAverageStars']),
            ...mapActions('login', ['userLogin']),

            convert: function (value) {
                return  new Date(value).toLocaleString();
            },
            async addBewertungToProfile() {
                try {
                    const bewertungInfo = {
                        kommentar: this.kommentar,
                        sterne: this.sterne,
                        bewerter_id: this.user.id,
                        ben_id: this.getUser.id,
                    };

                    const response = await Axios.post('http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/bewertung/add?ben_id='
                        + bewertungInfo.ben_id +
                        '&bewerter_id=' + bewertungInfo.bewerter_id + '&sterne=' + bewertungInfo.sterne + '&kommentar=' + bewertungInfo.kommentar);

                    this.msg = response.data;

                    this.loadUserAndBewertung()

                }catch (error) {
                    this.msg = error.response.data;
                }
            },
            async loadUserAndBewertung() {

                await this.fetchUserInformationById(this.id);
                await this.fetchBewertungenByUserId(this.getUser.id);
                this.currentUser = this.getUser;
                this.isLoggedInUserProfile = this.getUser.id === this.user.id;
                this.calcAverageStars();

                this.benutzername = this.currentUser.benutzername;
                this.vorname = this.currentUser.vorname;
                this.nachname = this.currentUser.nachname;
                this.plz = this.currentUser.plz;
                this.wohnort = this.currentUser.wohnort;
                this.strasse = this.currentUser.strasse;
                this.hausnummer = this.currentUser.hausnummer;
            },
            /**
             * Aktualisiere Benutzer Daten
             * @returns {Promise<void>}
             */
            async updateProfile() {

                    try {

                        const userData = {
                            id: this.currentUser.id,
                            benutzername: this.benutzername,
                            vorname: this.vorname,
                            nachname: this.nachname,
                            plz: this.plz,
                            wohnort: this.wohnort,
                            strasse: this.strasse,
                            hausnummer: this.hausnummer,
                            email: this.currentUser.email,
                            passwort: this.currentUser.passwort,
                            typ: this.currentUser.typ,
                            art: this.currentUser.art
                        }

                        this.msg = await BenutzerService.updateProfile(userData)

                        // Lade Benutzer mit geaenderten Daten
                        await this.fetchUserInformationById(this.user.id);
                        this.userLogin(this.getUser);

                        // Bearbeitung beenden
                        this.editingMode = false

                    }catch (error) {
                        error.response.data
                    }

            }
        },
        computed: {
            ...mapState('login',['user']),
            ...mapGetters('benutzer', ['getBewertungen', 'getUser', 'getAverageStars']),
            ...mapGetters('login', ['isLoggedIn', 'isAdmin']),
        },
        created() {
            this.loadUserAndBewertung();
        },
    }
</script>

<style scoped>

</style>