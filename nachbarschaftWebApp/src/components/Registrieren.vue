<template>
    <div>
        <div class="container-fluid mt-2 w-75">

            <div class="card">
                <div class="card-header">
                    <h1 class="card-title">Registrieren</h1>
                    <div class="container-fluid">
                    </div>
                </div>

                <div class="card-body">
                    <b-form v-if="show">
                        <div v-if="this.wrongUsername" class="alert alert-danger">
                            Sie müssen einen Benutzernamen angeben.
                        </div>
                        <b-form-group
                            id="input-group-username"
                            label="Benutzername"
                            label-for="input-username">
                            <b-form-input
                                id="input-username"
                                v-model="form.username"
                                type="text"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <div v-if="this.wrongEmailName" class="alert alert-danger">
                            Sie müssen einen E-Mail-Adresse angeben.
                        </div>
                        <div v-if="this.wrongEmailUsed" class="alert alert-danger">
                            Die E-Mail-Adresse ist bereits vorhanden.
                        </div>
                        <b-form-group
                            id="input-group-email"
                            label="E-Mail-Addresse"
                            label-for="input-email"
                            >
                            <b-form-input
                                id="input-email"
                                v-model="form.email"
                                type="email"
                                required
                                ></b-form-input>
                        </b-form-group>
                        <div v-if="this.wrongPassword" class="alert alert-danger">
                            Sie müssen ein Passwort angeben.
                        </div>
                        <b-form-group
                            id="input-group-password"
                            label="Passwort"
                            label-for="input-password"
                            >
                            <b-form-input
                                id="input-password"
                                v-model="form.password"
                                type="password"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <div v-if="this.wrongPasswordConf" class="alert alert-danger">
                            Die beiden Passwörter stimmen nicht überein.
                        </div>
                        <b-form-group
                            id="input-group-conf_password"
                            label="Passwort bestätigen"
                            label-for="input-conf_password"
                            >
                            <b-form-input
                                id="input-conf_password"
                                v-model="form.passwordConf"
                                type="password"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <div v-if="this.wrongPlz" class="alert alert-danger">
                            Sie müssen eine Postleitzahl angeben.
                        </div>
                        <b-form-group
                            id="input-group-plz"
                            label="Postleitzahl"
                            label-for="input-plz"
                            >
                            <b-form-input
                                id="input-plz"
                                v-model="form.plz"
                                type="text"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <div v-if="this.wrongDatenschutz" class="alert alert-danger">
                            Sie müssen die Datenschutz- und Nutzerbedingungen akzeptieren.
                        </div>
                        <b-form-group>
                            <b-form-checkbox-group
                                id="input-checkbox-datenschutz"
                                v-model="form.datenschutz"
                                >
                                <b-form-checkbox value="checked_in">Bitte Bestätigen Sie die
                                    <a href="#">Datenschutzbestimmungen</a> und <a href="#">Nutzerbedingungen</a></b-form-checkbox>
                            </b-form-checkbox-group>
                        </b-form-group>
                        <b-button @click.prevent="signUp()" variant="success">Registrieren</b-button>
                    </b-form>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import AuthService from "../services/AuthService";
    import axios from "axios";

    export default {
        name: "Registrieren",
        data() {
            return {
                // Accept information to register
                form: {
                    username: '',
                    email: '',
                    password: '',
                    passwordConf: '',
                    plz: '',
                    datenschutz: []
                },
                msg: '',
                show: true,
                wrongUsername: false,
                wrongEmailName: false,
                wrongEmailUsed: false,
                wrongPassword: false,
                wrongPasswordConf: false,
                wrongPlz: false,
                wrongDatenschutz: false,
            }
        },
        methods: {
            async signUp() {
                try {
                    if (!this.form.username) throw 'username';
                    this.wrongUsername = false;

                    if (!this.form.email) throw 'emailName';
                    this.wrongEmailName = false;

                    if ((await axios.get('http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/benutzer/email?email=' + this.form.email)).data !== null) throw 'emailUsed';
                    this.wrongEmailUsed = false;

                    if (!this.form.password) throw 'password';
                    this.wrongPassword = false;

                    if (this.form.passwordConf !== this.form.password) throw 'passwordConf';
                    this.wrongPasswordConf = false;

                    if (!this.form.plz) throw 'plz';
                    this.wrongPlz = false;

                    if (this.form.datenschutz.length === 0) throw 'datenschutz';
                    this.wrongDatenschutz = false;

                    const credentials = {
                        username: this.form.username,
                        password: this.form.password,
                        email: this.form.email,
                        plz: this.form.plz
                    };
                    const response = await AuthService.signUp(credentials)

                    this.msg = response.data;

                    this.$router.push('/');

                } catch (error) {
                    console.log(error);
                    switch(error) {
                        case 'username':
                            this.wrongUsername = true;
                            break;
                        case 'emailName':
                            this.wrongEmailName = true;
                            break;
                        case 'emailUsed':
                            this.wrongEmailUsed = true;
                            break;
                        case 'password':
                            this.wrongPassword = true;
                            break;
                        case 'passwordConf':
                            this.wrongPasswordConf = true;
                            break;
                        case 'plz':
                            this.wrongPlz = true;
                            break;
                        case 'datenschutz':
                            this.wrongDatenschutz = true;
                            break;
                        default:
                            console.log("Something bad happend. " + this.msg);
                    }
                }

            },
        }
    }
</script>

<style scoped>

</style>