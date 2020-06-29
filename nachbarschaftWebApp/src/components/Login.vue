<template>
    <div>
        <div class="container-fluid mt-2 w-75">
            <div class="card">
                <div class="card-header">
                    <h1 class="card-title">Login</h1>
                </div>
                <div class="card-body">
                    <b-form v-if="show">
                        <div v-if="this.wrong" class="alert alert-danger">
                            <strong>E-Mail-Adresse oder Password falsch!</strong> Überprüfen Sie Ihre Eingaben.
                        </div>
                        <b-form-group
                                id="input-group-1"
                                label="E-Mail-Addresse"
                                label-for="input-1"
                        >
                            <b-form-input
                                    id="input-1"
                                    v-model="form.email"
                                    type="email"
                                    required
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                                id="input-group-2"
                                label="Passwort"
                                label-for="input-2"
                                description="Sage niemanden deine Passwort."
                        >
                            <b-form-input
                                    id="input-2"
                                    v-model="form.password"
                                    type="password"
                                    required

                            ></b-form-input>
                        </b-form-group>

                        <p>Noch kein Konto? <router-link to="/register">Registrieren</router-link></p>

                        <b-form-group id="input-group-4">
                            <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
                                <b-form-checkbox value="me">Angemeldet bleiben</b-form-checkbox>
                            </b-form-checkbox-group>
                        </b-form-group>

                        <b-button @click.prevent="loginUser()" variant="primary">Login</b-button>
                    </b-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import AuthService from "../services/AuthService";
    import axios from "axios";

    export default {
        data() {
            return {
                form: {
                    email: '',
                    password: '',
                    checked: []
                },
                show: true,
                msg: '',
                wrong: false
            }
        },
        methods: {
            ...mapActions('login', ["login", "userLogin"]),
            async loginUser() {
                try {
                    const credentials = {
                        username: this.form.email,
                        password: this.form.password
                    };

                    const response = await AuthService.login(credentials);

                    this.msg = response.msg;

                    const token = response.jwt;

                    this.login(token);

                    const user = await axios.get( 'http://85.214.106.187:8080/nachbarschaftshilfe-0.0.1/benutzer/email?email='
                        + credentials.username)
                        .then(response => response.data);

                    this.userLogin(user);
                    this.$router.push('/')
                    this.wrong = false;

                } catch (error) {

                    this.wrong = true;

                }
            }
        }
    }
</script>
