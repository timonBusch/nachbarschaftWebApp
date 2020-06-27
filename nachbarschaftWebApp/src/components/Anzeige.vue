<template>
    <div>
        <div class="jumbotron jumbotron-fluid">
            <div class="container-fluid ">
                <div class="row mb-2 mx-2">
                    <div class="col pb-2">
                        <h3> {{ this.getCurrentAnzeige.titel }} </h3>
                    </div>
                </div>
                <div class="row mb-2 mx-2">
                    <div class="col-2">
                        <button @click="pushToAnzeige(getCurrentAnzeige.ben_id)" type="button" class="btn btn-primary">Vollständiges Profil</button>
                    </div>
                    <div class="col-10">
                        <h3 class="float-left"><span class="font-weight-bold">Thema:</span> {{this.getCurrentAnzeige.thema}} </h3>
                        <a class="float-right" href="#"><i class="fa fa-heart"></i> </a>
                        <a class="float-right pr-3" href="#"><i class="fa fa-exclamation"></i> </a>
                    </div>
                </div>

                <div class="row mx-2">
                    <div class="col-2">
                        <div class="row">
                            <div class="col">
                               <span class="font-weight-bold">Benutzername:</span>
                                <p>{{ this.getUser.benutzername }}</p>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span>
                                <span class="fa fa-star"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col pt-5">
                                <p class="font-weight-bold">PLZ:</p>
                                <p>{{ this.getUser.plz }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col pt-5">
                                <p class="font-weight-bold">Wohnort:</p>
                                <p class="text-capitalize">{{ this.getUser.wohnort }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col pt-5">
                                <button type="button" class="btn btn-primary btn-block"><i class="fa fa-comment"></i></button>
                            </div>
                        </div>

                    </div>
                    <div class="col-10 border-left border-primary" >
                        {{ this.getCurrentAnzeige.beschreibung }}
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    export default {
        name: "Anzeige",
        props: ['id'],
        methods: {
            ...mapActions("anzeigen", ["filterAnzeigenById"]),
            ...mapActions("benutzer", ["fetchUserInformationById"]),
            async fetchAnzeigenInformation() {
                await this.filterAnzeigenById(this.id);
                await this.fetchUserInformationById(this.getCurrentAnzeige.ben_id);
            },
            pushToAnzeige: function (id) {
                this.$router.push({name: 'profil', params: {id}});
            },
        },
        computed: {
            ...mapGetters("anzeigen",["getCurrentAnzeige"]),
            ...mapGetters("benutzer", ["getUser"])
        },

        created() {
            this.fetchAnzeigenInformation();

        },

    }
</script>

<style scoped>

</style>