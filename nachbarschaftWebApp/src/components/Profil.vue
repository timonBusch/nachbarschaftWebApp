<template>
    <div>

        <div class="container-fluid mt-2 w-75">

            <div class="card">
                <div class="card-header">
                    <h1 class="card-title">Profil</h1>
                    <div class="container-fluid">
                    </div>
                </div>
                <div class="col">
                    <p>Bewertung:</p>

                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                </div>
                <div class="card-body">

                    <div class="container">
                        <div class="row">
                            <div class="col-6">

                                <label>Benutzername:</label>
                                <div class="input-group mb-3">
                                    <input v-if="isLoggedInUserProfile" type="text" class="form-control" :value="this.user.benutzername"
                                           :disabled="!this.validated">
                                    <input v-else type="text" class="form-control" :value="this.getUser().benutzername"
                                           :disabled="!this.validated">
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" @click="enableInput" type="button" id="button"><i class="fa fa-pen"></i></button>
                                    </div>
                                </div>

                                <label>Vorname:</label>
                                <div class="input-group mb-3">
                                    <input v-if="isLoggedInUserProfile" type="text" class="form-control" :value="this.user.vorname" disabled>
                                    <input v-else type="text" class="form-control" :value="this.getUser().vorname" disabled>
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button"><i class="fa fa-pen"></i></button>
                                    </div>
                                </div>

                                <label>Nachname:</label>
                                <div class="input-group mb-3">
                                    <input v-if="isLoggedInUserProfile" type="text" class="form-control" :value="this.user.nachname" disabled>
                                    <input v-else type="text" class="form-control" :value="this.getUser().nachname" disabled>
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button"><i class="fa fa-pen"></i></button>
                                    </div>
                                </div>

                            </div>

                            <div class="col-6">
                                <label>PLZ:</label>
                                <div class="input-group mb-3">
                                    <input v-if="isLoggedInUserProfile" type="text" class="form-control" :value="this.user.plz" disabled>
                                    <input v-else type="text" class="form-control" :value="this.getUser().plz" disabled>
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button"><i class="fa fa-pen"></i></button>
                                    </div>
                                </div>

                                <label>Wohnort:</label>
                                <div class="input-group mb-3">
                                    <input v-if="isLoggedInUserProfile" type="text" class="form-control" :value="this.user.wohnort" disabled>
                                    <input v-else type="text" class="form-control" :value="this.getUser().wohnort" disabled>
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button"><i class="fa fa-pen"></i></button>
                                    </div>
                                </div>

                                <label>Straße:</label>
                                <div class="input-group mb-3">
                                    <input v-if="isLoggedInUserProfile" type="text" class="form-control" :value="this.user.strasse" disabled>
                                    <input v-else type="text" class="form-control" :value="this.getUser().strasse" disabled>
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button"><i class="fa fa-pen"></i></button>
                                    </div>
                                </div>

                                <label>Hausnummer:</label>
                                <div class="input-group mb-3">
                                    <input v-if="isLoggedInUserProfile" type="text" class="form-control" :value="this.user.hausnummer" disabled>
                                    <input v-else type="text" class="form-control" :value="this.getUser().hausnummer" disabled>
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button"><i class="fa fa-pen"></i></button>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div class="text-center">
                            <button v-if="isLoggedInUserProfile" type="button" class="btn btn-primary btn-lg mx-auto">Änderungen speichern</button>
                        </div>

                    </div>

                </div>

            </div>

        </div>

        <div v-if="this.getBewertungen() && this.getBewertungen().length">

            <div class="row mt-4 mb-4">
                <div class="col"/>
                <div class="col-6 mx-auto">
                    <h3>Bewertungen</h3>
                </div>
                <div class="col"/>
            </div>
            <div class="row" v-for="bewertung of this.getBewertungen()" :key="bewertung.id">
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
                                <option value="4">5</option>
                            </select>
                        </div>
                    </div>

                </div>

            </div>
        </div>


    </div>
</template>

<script>
    // TODO: Wenn man von einem Fremden Profil auf das eigene geht wird es nicht neu geladen
    import { mapState, mapGetters, mapActions } from 'vuex'
    import Axios from "axios";

    export default {
        name: "Profil",
        props: ['id'],
        data: function() {
            return {
                validated: false,
                kommentar: '',
                sterne: '',
                bewertungText: 'Bewertung...',
                isLoggedInUserProfile: true,
            }
        },

        methods: {
            enableInput: function () {
                this.validated = !this.validated;
            },
            ...mapActions('benutzer', ['fetchBewertungenByUserId', 'fetchUserInformationById']),
            ...mapGetters('benutzer', ['getBewertungen', 'getUser']),
            convert: function (value) {
                return  new Date(value).toLocaleString();
            },
            async addBewertungToProfile() {
                try {
                    const bewertungInfo = {
                        kommentar: this.kommentar,
                        sterne: this.sterne,
                        bewerter_id: this.user.id,
                        ben_id: this.getUser().id,
                    };

                    const response = await Axios.post('http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/bewertung/add?ben_id=' + bewertungInfo.ben_id +
                        '&bewerter_id=' + bewertungInfo.bewerter_id + '&sterne=' + bewertungInfo.sterne + '&kommentar=' + bewertungInfo.kommentar);

                    this.msg = response.data;

                    this.loadUserAndBewertung()

                }catch (error) {
                    this.msg = error.response.data;
                }
            },
            async loadUserAndBewertung() {
                if(this.$route.params.id) {
                    await this.fetchUserInformationById(this.id);
                    this.fetchBewertungenByUserId(this.getUser().id);
                    this.isLoggedInUserProfile = this.getUser().id === this.user.id;
                }else {
                    this.fetchBewertungenByUserId(this.user.id);
                    this.isLoggedInUserProfile = true;
                }
            }
        },
        computed: mapState('login',['user']),
        created() {
            this.loadUserAndBewertung();
        },
    }
</script>

<style scoped>

</style>