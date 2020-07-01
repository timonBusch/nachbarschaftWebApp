<template>
  <div>
    <div class="container-fluid">

      <!-- Top Bar in all Anzeigen -->
      <div class="row" style="margin-top: 20px">
        <div class="col-3"></div>
        <div class="col-6">
          <div class="input-group mb-3">
            <input v-model="wordToSearch" type="text" class="form-control" placeholder="Suche...">
            <div class="input-group-append">
              <button @click="filterBySearchWord" class="btn btn-info" >Los</button>
            </div>
          </div>
        </div>
        <div class="col-3">
          <button @click="this.sortAnzeigenByDate" type="button" class="btn btn-success">
            <i class="fa fa-calendar-day" ></i>
          </button>
        </div>
      </div>

      <!-- Top Bar in all Anzeigen -->
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">

          <div class="btn-group btn-group-lg btn-block">
            <button v-if="this.isLoggedIn" @click="this.filterAnzeigenEigene" type="button" class="btn btn-success">Eigene</button>
            <button v-if="this.isLoggedIn" @click="this.filterAnzeigenFavoriten" type="button" class="btn btn-success">Favoriten</button>
            <button v-if="this.isLoggedIn" @click="this.pushToMap" type="button" class="btn btn-success">Karte</button>
            <button @click="this.fetchAnzeigen" type="button" class="btn btn-success">Alle</button>
          </div>

        </div>
        <div class="col-3"></div>
      </div>

      <!-- Anzeigen -->
      <div v-if="allAnzeigen && allAnzeigen.length">

        <div class="row" v-for="post of allAnzeigen" :key="post.id">
          <div class="col"></div>
          <div class="col-8" >

            <div class="jumbotron jumbotron-fluid anzeige-jumbotron">
              <div class="container-fluid">

                <div class="row">
                  <div class="col" >
                    <h5><router-link :to="{ name: 'anzeige', params: {id: post.id.toString()}}">{{post.titel}}</router-link></h5>
                    <p>
                      {{post.beschreibung}}
                    </p>

                    <div class="container-fluid">

                      <div class="row border-top border-light">
                        <div class="col pl-0">
                          <span class="badge badge-success">{{ convert(post.datum) }}</span>
                          <span class="badge badge-info ml-3">Thema: {{post.thema}}</span>
                          <span v-if="post.ben_id === getUser.id" class="fa fa-user ml-3"></span>
                          <button @click="removeFavoritFromData(post.id)"
                                  type="button"
                                  v-if="post.isFavorit"
                                  class="btn-sm btn-danger float-right">
                            <i class="fa fa-heart"></i>
                          </button>
                          <button @click="addFavoritToData(post.id)"
                                  type="button" v-else-if="isLoggedIn && !(post.ben_id === getUser.id)"
                                  class="btn-sm btn-success float-right">
                            <i class="fa fa-heart"></i>
                          </button>

                        </div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>
          <div class="col"></div>
        </div>

      </div>
      <div v-else class="row">
        <div class="col"/>

        <div class="col-8">
          <div class="container-fluid">
            <p class="text-center mt-4">
              Keine Anzeigen vorhanden
            </p>
          </div>

        </div>
        <div class="col"/>
      </div>


    </div>



  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import AnzService from "../services/AnzeigenService";

export default {
  name: 'Anzeigen',
  props: {
    errors: []
  },
  data() {
    return {
      msg: '',
      wordToSearch: '',
      selected: 'Alle',
      options: [
        { value: 'Alle', text: 'Alle'},
        { value: 'privat', text: 'Privat'},
        { value: 'gewerblich', text: 'Firma'}
      ]
    }
  },
  methods: {
    getPrivatOrFirma(currentAnz) {
      let art = this.fetchUserInformationById(currentAnz.ben_id);
      if (art.art === 'privat') {
        return {
          anzArtBen: 'privat',
          anzArtName: 'Privat'
        }
      } else if (art.art === 'firma') {
        return {
          anzArtBen: 'firma',
          anzArtName: 'Firma'
        }
      }
    },
    // Konvertiere ISO Datum zu lesbarem Datum
    convert: function (value) {
      return  new Date(value).toLocaleString();
    },
    ...mapActions("anzeigen",["fetchAnzeigen", "filterAnzeigenEigene"
      , "filterAnzeigenFavoriten", "filterFavoritenByAnzId", "filterAnzeigenByWord",
      "addFavorit", "sortAnzeigenByDate"]),
    ...mapActions("benutzer", ["fetchUserInformationById"]),

    // Fuege ueber store Favorit in der Datenbank hinzu
    async addFavoritToData(anz_id) {
      try {
        this.msg = await this.addFavorit(anz_id);
        this.fetchAnzeigen();

      }catch (error) {
        error.response.msg;
      }

    },

    // Entferne Favorit ueber store aus Datenbank
    async removeFavoritFromData(id) {
      try {
        const responseFav = await AnzService.filterFavoritenByAnzIdAndBenId(id, this.getUser.id)
        this.msg = await AnzService.deleteFavorit(responseFav.id);
        this.filterAnzeigenFavoriten();
      }catch (error) {
        console.log(error.response)
      }
    },

    // Filtere Beschreibungen, Titel und Themen nach einem Wort
    async filterBySearchWord() {
      try {
        this.msg = await this.filterAnzeigenByWord(this.wordToSearch);
      }catch (error) {
        console.log(error.response.data)
      }

    },
    pushToMap() {
      this.$router.push({path: '/map'});
    },

  },
  computed: {
    ...mapGetters("anzeigen",["allAnzeigen", "getFavoritData"]),
    ...mapGetters("login", ['getUser', 'isLoggedIn']),

  },
  created() {
    this.fetchAnzeigen();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.anzeige-jumbotron {
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}

#anzeigen-footer {
    padding-left: 0px;
}


</style>
