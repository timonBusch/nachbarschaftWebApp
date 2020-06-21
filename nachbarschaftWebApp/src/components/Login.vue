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
                            <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" v-model="loginInfo.email">
                        </div>
                        <div class="form-group">
                            <label for="inputPassword">Password</label>
                            <input type="password" class="form-control" id="inputPassword" v-model="loginInfo.password">
                        </div>
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="stayLogged">
                            <label class="form-check-label" for="stayLogged">Angemeldet bleiben</label>
                        </div>
                        <p>Noch kein Konto? <router-link to="/register">Registrieren</router-link></p>
                        <button @click="loginUser" class="btn btn-primary">Login</button>
                    </form>
                    <h3>Users</h3>
                    <div v-for="user in allUsers" :key="user.id">

                        {{  user.benutzername }}

                    </div>
                </div>

            </div>

        </div>
    </div>
</template>


<script>
    import  { mapGetters } from "vuex";
    export default {
        name: "Login",
        data() {
          return {
              // Accept user Infos
              loginInfo: {
                  email: '',
                  password: ''
              }
          }
        },
        methods: {
            //...mapActions('login',["fetchUsers"]),
            // Call loginUser in login Script
            // TODO: Wird nicht aufgefuren ?
            async loginUser() {
                let user = await this.$store.dispatch('login/loginUser', this.loginInfo)
                if(user.error) {
                    alert(user.error)
                }else {
                    alert("Thank you for signing in" + user.benutzername)
                }
            }
        },
        computed: mapGetters('login',['allUsers']),
        created() {
            //this.fetchUsers()
            // Call fetchUsers mutation in login Script
            this.$store.dispatch("login/fetchUsers")
        }
    }
</script>

<style scoped>

</style>