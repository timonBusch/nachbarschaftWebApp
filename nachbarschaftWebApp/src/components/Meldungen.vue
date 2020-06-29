<template>
    <div class="container-fluid mt-2 w-75">
        <div class="card" @load="this.getAllMeldungen">
            <div class="card-header">
                <span class="card-title h2">Meldungen</span>

            </div>
            <b-form-select class="col-2 form-group form-control" style="margin-top: 10px" v-model="selected" :options="options"></b-form-select>
            <!--
            <select class="col-2 form-group form-control" style="margin-top: 10px">
                <option >Alle</option>
                <option>Anzeigen</option>
                <option>Benutzer</option>
            </select>
            -->
            <div class="card-body">
                <div v-if="allMeldungen && allMeldungen.length">
                    <div class="card" v-for="currentMeldung of allMeldungen" :key="currentMeldung.id">
                        <div class="card-header">
                            <!-- TODO: Benutzer- oder Anzeigenname -->

                        </div>
                        <div class="card-body">
                            <!-- TODO: Grund -->
                        </div>
                        <div class="card-footer">
                            <!-- TODO: Status -->
                        </div>
                    </div>
                </div>
                <div v-else>
                    Es sind keine Meldungen vorhanden.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Meldungen",
        data() {
            return {
                selected: null,
                options: [
                    { value: null, text: 'Alle'},
                    { value: 'Anzeigen', text: 'Anzeigen'},
                    { value: 'Benutezr', text: 'Benutzer'}
                ]
            }
        },
        methods: {
            ...mapActions("meldungen",["getAllMeldungen"]),
        },
        computed: {
            ...mapGetters("meldungen",["allMeldungen"]),
        },
        created() {
            this.getAllMeldungen();
        }
    }
</script>

<style scoped>

</style>