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
                    <form>
                        <div class="form-group">
                            <label for="inputUserName">Benutzername</label>
                            <input required v-model="username" type="text" class="form-control" id="inputUserName">
                        </div>
                        <div class="form-group">
                            <label for="emailInput">Email Adresse</label>
                            <input required v-model="email" type="email" class="form-control" id="emailInput" aria-describedby="emailHelp">
                        </div>
                        <div class="form-group">
                            <label for="inputPassword">Passwort</label>
                            <input required v-model="password" type="password" class="form-control" id="inputPassword">
                        </div>
                        <div class="form-group">
                            <label for="inputPassword">Passwort bestätigen</label>
                            <input required v-model="passwordConf" type="password" class="form-control" id="inputConfirmPassword">
                        </div>
                        <div class="form-group">
                            <label for="inputPLZ">Postleitzahl</label>
                            <input required v-model="plz" type="text" class="form-control" id="inputPLZ">
                        </div>
                        <div class="form-check pb-3">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input" value="">Bitte Bestätigen Sie die
                                <a href="#">Datenschutzbestimmungen</a> und <a href="#">Nutzerbedingungen</a>
                            </label>
                        </div>
                        <button type="button" @click="signUp" class="btn btn-primary">Registrieren</button>
                    </form>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import AuthService from "../services/AuthService";
    export default {
        name: "Registrieren",
        data() {
            return {
                // Accept information to register
                username: '',
                password: '',
                email: '',
                plz: '',
                passwordConf: '',
                msg: '',
            }
        },
        methods: {
            async signUp() {
                try {
                    const credentials = {
                        username: this.username,
                        password: this.password,
                        email: this.email,
                        plz: this.plz
                    };
                    const response = await AuthService.signUp(credentials)

                    this.msg = response.data;

                    this.$router.push('/')
                }catch (error) {
                    this.msg = error.response.data;
                }
            }
        }
    }
</script>

<style scoped>

</style>