<template>
  <div>
    <div class="container-fluid">

      <!-- Top Bar in all Anzeigen -->
      <div class="row" style="margin-top: 20px">
        <div class="col-3">

          <div class="form-group">
            <select class="form-control" >
              <option>Alle</option>
              <option>Privat</option>
              <option>Firma</option>
            </select>

          </div>

        </div>
        <div class="col-6"><input type="text" class="form-control" id="search"></div>
        <div class="col-3"></div>
      </div>

      <!-- Top Bar in all Anzeigen -->
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">

          <div class="btn-group btn-group-lg btn-block">
            <button @click="this.filterAnzeigenEigene" type="button" class="btn btn-primary">Eigene</button>
            <button @click="filterAnzeigenFavoriten" type="button" class="btn btn-primary">Favoriten</button>
            <button type="button" class="btn btn-primary">Karte</button>
            <button @click="this.fetchAnzeigen" type="button" class="btn btn-primary">Alle</button>
          </div>

        </div>
        <div class="col-3"></div>
      </div>

      <!-- Anzeigen -->
      <div v-if="allAnzeigen && allAnzeigen.length">

        <div class="row" v-for="post of allAnzeigen" :key="post.id">
          <div class="col"></div>
          <div class="col-8">

            <div class="jumbotron jumbotron-fluid anzeige-jumbotron">
              <div class="container-fluid">

                <div class="row">
                  <div class="col-8 col-sm-8" >

                    <h5><a href="" @click="pushToAnzeige(post.id.toString())">{{post.titel}}</a></h5>
                    <p>
                      {{post.beschreibung}}
                    </p>

                    <div class="container-fluid">

                      <div class="row border-top border-light">
                        <div class="col pl-0">
                          <span class="badge badge-success">{{ convert(post.datum) }}</span>
                          <span class="badge badge-info ml-3">Thema: {{post.thema}}</span>
                        </div>
                      </div>

                    </div>

                  </div>
                  <div class="col-4 col-sm-4">
                    <img src="../assets/placeholder.jpg" class="img-thumbnail" alt="placeholder">
                  </div>
                </div>

              </div>
            </div>

          </div>
          <div class="col"></div>
        </div>

      </div>


    </div>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors" :key="error.message">
        {{error.message}}
      </li>
    </ul>

  </div>
</template>

<script>


import {mapActions, mapGetters} from "vuex";

export default {
  name: 'Anzeigen',
  props: {
    errors: []
  },
  methods: {
    convert: function (value) {
      return  new Date(value).toLocaleString();
    },
    ...mapActions("anzeigen",["fetchAnzeigen", "filterAnzeigenEigene"
      , "filterAnzeigenFavoriten"]),

    pushToAnzeige: function (id) {
      console.log(id);
      this.$router.push({name: 'anzeige', params: {id}});
    },

  },
  computed: mapGetters("anzeigen",["allAnzeigen"]),
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
