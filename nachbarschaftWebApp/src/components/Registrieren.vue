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
                        <div v-if="this.form.username != null">
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
                        <b-form-group>
                            <b-form-checkbox-group
                                id="input-checkbox-datenschutz"
                                v-model="form.datenschutz"
                                >
                                <b-form-checkbox value="checked_in">Bitte Bestätigen Sie die
                                    <a href="#">Datenschutzbestimmungen</a> und <a href="#">Nutzerbedingungen</a></b-form-checkbox>
                            </b-form-checkbox-group>
                        </b-form-group>
                        <b-button @click.prevent="signUp" variant="primary">Registrieren</b-button>
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
                form: {
                    username: '',
                    email: '',
                    password: '',
                    passwordConf: '',
                    plz: '',
                    datenschutz: []
                },
                msg: '',
            }
        },
        methods: {
            async signUp() {
                try {
                    const credentials = {
                        username: this.form.username,
                        password: this.form.password,
                        email: this.form.email,
                        plz: this.form.plz
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