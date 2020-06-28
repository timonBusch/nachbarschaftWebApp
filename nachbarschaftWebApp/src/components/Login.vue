<!--
<template>
    <div>
        <div class="container-fluid mt-2 w-75">
            <div class="card">
                <div class="card-header">
                    <h1 class="card-title">Login</h1>
                </div>
                <div class="card-body">
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
                                    placeholder="gib deine E-Mail-Addresse ein"
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
                                    v-model="form.name"
                                    required
                                    placeholder="Passwort"

                            ></b-form-input>
                        </b-form-group>

                        <p>Noch kein Konto? <router-link to="/register">Registrieren</router-link></p>

                        <b-form-group id="input-group-4">
                            <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
                                <b-form-checkbox value="me">Angemeldet bleiben</b-form-checkbox>
                            </b-form-checkbox-group>
                        </b-form-group>

                        <b-button type="submit" variant="primary">Login</b-button>
                    </b-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    email: '',
                    name: '',
                    food: null,
                    checked: []
                },
                foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
                show: true
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault()
                alert(JSON.stringify(this.form))
            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.form.email = ''
                this.form.name = ''
                this.form.food = null
                this.form.checked = []
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>
-->

<template>
    <div>

        <div class="container-fluid mt-2 w-75">

            <div class="card">
                <div class="card-header">
                    <h1 class="card-title">Login</h1>
                </div>

                <div class="card-body">
                    <form>
                        <div class="alert alert-danger">
                            <strong>E-Mail-Adresse falsch!</strong>
                        </div>
                        <div class="form-group">
                            <label for="emailInput">Email address</label>
                            <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" v-model="username">
                        </div>
                        <div class="alert alert-danger">
                            <strong>Passwort falsch!</strong>
                        </div>
                        <div class="form-group">
                            <label for="inputPassword">Password</label>
                            <input type="password" class="form-control" id="inputPassword" v-model="password">
                        </div>
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="stayLogged">
                            <label class="form-check-label" for="stayLogged">Angemeldet bleiben</label>
                        </div>
                        <p>Noch kein Konto? <router-link to="/register">Registrieren</router-link></p>
                        <button @click.prevent="loginUser()" class="btn btn-primary">Login</button>
                    </form>
                    <p v-if="msg">{{ msg }}</p>
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
        name: "Login",
        data() {
          return {
              // Accept user Infos
              username: '',
              password: '',
              msg: ''
          }
        },
        methods: {
            ...mapActions('login',["login", "userLogin"]),
            async loginUser() {
                try {
                    const credentials = {
                        username: this.username,
                        password: this.password
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
                }catch (error) {
                    this.msg = error.response.data.msg;
                    console.log(this.msg);
                }

            }
        },
    }
</script>

<style scoped>

</style>
