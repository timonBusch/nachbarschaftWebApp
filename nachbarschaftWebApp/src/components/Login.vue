<template>
    <div>

        <div class="container-fluid mt-2 w-75">

            <div class="card">
                <div class="card-header">
                    <h1 class="card-title">Login</h1>
                    <div class="container-fluid">
                    </div>
                </div>

                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <label for="emailInput">Email address</label>
                            <input required v-model="email" type="email" class="form-control" id="emailInput" aria-describedby="emailHelp">
                        </div>
                        <div class="form-group">
                            <label for="inputPassword">Password</label>
                            <input required v-model="password" type="password" class="form-control" id="inputPassword">
                        </div>
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="stayLogged">
                            <label class="form-check-label" for="stayLogged">Angemeldet bleiben</label>
                        </div>
                        <p>Noch kein Konto? <router-link to="/register">Registrieren</router-link></p>
                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                </div>

            </div>

        </div>
    </div>
</template>


<script>

    export default {
        name: "Login",
        data() {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            login: function () {
                let email = this.email
                let password = this.password
                this.$store.dispatch('login', {email, password})
                .then(() => this.$router.push('/'))
                .catch(err => console.log(err))
            }
        }
    }
</script>

<style scoped>

</style>