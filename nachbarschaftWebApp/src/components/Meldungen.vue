<template>
    <div class="container-fluid mt-2 w-75">
        <div class="card" @load="this.getAllMeldungen">
            <div class="card-header">
                <span class="card-title h2">Meldungen</span>
                <b-form-select class="col-2 float-right" v-model="selected" :options="options"></b-form-select>
            </div>
            <div class="card-body">
                <div v-if="allMeldungen && allMeldungen.length">
                    <div v-for="current of allMeldungen" :key="current.id">
                        <div class="card"
                             style="margin-top: 10px"
                             v-if="selected === 'Benutzer' && current.ben_id || selected === 'Alle' || selected === 'Anzeigen' && current.anz_id"

                        >
                            <router-link class="text-decoration-none" :to="{ name: getBenOrAnz_id(current).route, params: { id: getBenOrAnz_id(current).routeId.toString() } }">
                                <div class="card-header">
                                    <span> {{ convert(current.zeitpunkt)}} </span>
                                    <span class="float-right"> <strong> {{ getBenOrAnz_id(current).routeName }} </strong> </span>
                                </div>
                                <div class="card-body">
                                    <span class="">{{current.grund}} </span>
                                </div>
                            </router-link>
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
                selected: 'Alle',
                options: [
                    { value: 'Alle', text: 'Alle'},
                    { value: 'Anzeigen', text: 'Anzeigen'},
                    { value: 'Benutzer', text: 'Benutzer'}
                ]
            }
        },
        methods: {
            convert: function (value) {
                return  new Date(value).toLocaleString();
            },
            ...mapActions("meldungen",["getAllMeldungen"]),
            getBenOrAnz_id(current) {
                if (current.ben_id != null) {
                    return {
                        route: 'profil',
                        routeId: current.ben_id,
                        routeName: 'Benutzer'
                    }
                } else {
                    return {
                        route: 'anzeige',
                        routeId: current.anz_id,
                        routeName: 'Anzeige'
                    }
                }
            }
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

    .nounderline {
        text-decoration: none !important
    }

</style>