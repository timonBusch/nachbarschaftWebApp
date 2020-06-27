<template>
    <div>

        <div class="container-fluid mt-2 w-75">

            <div class="card">
                <div class="card-header">
                    <h1 class="card-title">Login</h1>
                </div>

                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <label for="emailInput">Email address</label>
                            <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" v-model="username">
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
                    this.msg = error.response.data.msg
                }

            }
        },
    }
</script>

<style scoped>

</style>