<template>
  <div class="hello">
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
        <div class="col-3">Sortieren</div>
      </div>

      <!-- Top Bar in all Anzeigen -->
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">

          <div class="btn-group btn-group-lg btn-block">
            <button type="button" class="btn btn-primary">Eigene</button>
            <button type="button" class="btn btn-primary">Favoriten</button>
            <button type="button" class="btn btn-primary">Karte</button>
            <button type="button" class="btn btn-primary">Alle</button>
          </div>

        </div>
        <div class="col-3"></div>
      </div>

      <!-- Anzeigen -->
      <div class="row">
        <div class="col"></div>
        <div class="col-8">

          <div class="jumbotron jumbotron-fluid" id="anzeige-jumbotron">
            <div class="container-fluid">

              <div class="row">
                <div class="col-8 col-sm-8" >

                  <h5><a href="#">Ueberschrift</a></h5>
                  <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.
                  </p>

                  <div class="container-fluid">

                    <div class="row border-top border-light">
                      <div class="col pl-0">
                        <span class="badge badge-success">20.05.2020</span>
                        <span class="badge badge-info ml-3">25.05.2020 15:00 Uhr</span>
                      </div>
                    </div>

                  </div>

                </div>
                <div class="col-4 col-sm-4">
                  <img src="placeholder.jpg" class="img-thumbnail" alt="placeholder">
                </div>
              </div>

            </div>
          </div>

          <div class="jumbotron jumbotron-fluid" id="anzeige-jumbotron">
            <div class="container-fluid">

              <div class="row">
                <div class="col-8 col-sm-8" >

                  <h5><a href="#">Ueberschrift</a></h5>
                  <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.
                  </p>

                  <div class="container-fluid">

                    <div class="row border-top border-light">
                      <div class="col pl-0">
                        <span class="badge badge-success">20.05.2020</span>
                        <span class="badge badge-info ml-3">25.05.2020 15:00 Uhr</span>
                      </div>
                    </div>

                  </div>

                </div>
                <div class="col-4 col-sm-4">
                  <img src="placeholder.jpg" class="img-thumbnail" alt="placeholder">
                </div>
              </div>

            </div>
          </div>

        </div>
        <div class="col"></div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Anzeigen',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#anzeige-jumbotron {
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}

#anzeigen-footer {
    padding-left: 0px;
}

#anzeigen-infos {
  padding-left: 10px;
}
</style>
