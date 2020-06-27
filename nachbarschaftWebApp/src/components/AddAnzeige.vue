<template>
    <div>
        <div class="row mt-4">

            <div class="col-2">

            </div>
            <div class="col-8">
                <div class="card">
                    <div class="card-header">
                        <h1 class="card-title">Neue Anzeige</h1>
                        <div class="container-fluid">
                        </div>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="row mb-2">
                                <div class="col-4">
                                    <input required v-model="titel" type="text" class="form-control" id="titel" placeholder="Titel" name="titel">
                                </div>
                                <div class="col-2">
                                    <div class="form-group">
                                        <div class="input-group mb-3">
                                            <select required v-model="thema" class="custom-select" id="inputGroupSelect02">
                                                <option selected>Thema...</option>
                                                <option>Garten</option>
                                                <option>Sozialleben</option>
                                                <option>Spendenaufruf</option>
                                                <option>Haushalt</option>
                                                <option>Sonstiges</option>
                                            </select>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col">
                                   <textarea required v-model="beschreibung" class="form-control" rows="5" id="beschreibung" placeholder="Beschreibung"/>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col">
                                    <button @click.prevent="addAnzeigeToData" class="btn btn-primary">Veröffentlichen</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-2">

            </div>

        </div>

    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        name: "AddAnzeige",
        data() {
            return {
                // Accept information to add a Anzeige
                titel: '',
                beschreibung: '',
                thema: '',
                msg: '',
            }
        },
        methods: {
            async addAnzeigeToData() {
                try {
                    const anzeigenInfo = {
                        titel: this.titel,
                        beschreibung: this.beschreibung,
                        thema: this.thema
                    }
                    const response = await this.addAnzeige(anzeigenInfo)

                    this.msg = response.data;

                    this.$router.push("/");

                }catch (error) {
                    this.msg = error.response.data;
                }

            },
            ...mapActions('anzeigen', ['addAnzeige']),
        }
    }
</script>

<style scoped>

</style>