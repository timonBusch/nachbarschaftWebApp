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
                            <div class="col">

                                <label for="userName">Benutzername:</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" :value="user.benutzername" id="userName"
                                           :disabled="!this.validated">
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" @click="enableInput" type="button" id="button"><i class="fa fa-pen"></i></button>
                                    </div>
                                </div>

                                <label for="usr_vorname">Vorname:</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" :value="user.vorname" disabled>
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button"><i class="fa fa-pen"></i></button>
                                    </div>
                                </div>

                                <label for="usr_nachname">Nachname:</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" :value="user.nachname" disabled>
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button"><i class="fa fa-pen"></i></button>
                                    </div>
                                </div>

                                <label for="usr_plz">PLZ:</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" :value="user.plz" disabled>
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button"><i class="fa fa-pen"></i></button>
                                    </div>
                                </div>

                                <label for="usr_wohnort">Wohnort:</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" :value="user.wohnort" disabled>
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button"><i class="fa fa-pen"></i></button>
                                    </div>
                                </div>

                                <label for="usr_strasse">Straße:</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" :value="user.strasse" disabled>
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button"><i class="fa fa-pen"></i></button>
                                    </div>
                                </div>

                                <label for="usr_hausnummer">Hausnummer:</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" :value="user.hausnummer" disabled>
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button"><i class="fa fa-pen"></i></button>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div class="text-center">
                            <button type="button" class="btn btn-primary btn-lg mx-auto">Änderungen speichern</button>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
</template>

<script>

    import { mapState } from 'vuex'
    export default {
        name: "Profil",
        data: function() {
            return {
                validated: false
            }
        },

        methods: {
            enableInput: function () {
                this.validated = !this.validated;
            }
        },
        computed: mapState('login',['user']),

    }
</script>

<style scoped>

</style>