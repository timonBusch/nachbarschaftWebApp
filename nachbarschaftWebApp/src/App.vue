<template>
  <div id="app">

    <div class="d-flex" :class="[isActive ? 'toggled' : '']" id="wrapper">

      <!-- Sidebar -->
      <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="sidebar-heading">Menü</div>
        <div class="list-group list-group-flush">
          <a href="index.html" class="list-group-item list-group-item-action bg-light">Startseite</a>
          <a href="profil.html" class="list-group-item list-group-item-action bg-light">Profil</a>
          <a href="login.html" class="list-group-item list-group-item-action bg-light">Login</a>

        </div>
      </div>

      <!-- Content -->
      <div id="page-content-wrapper">

        <nav class="navbar navbar-expand-lg bg-light border-bottom">
          <button class="btn btn-primary"  @click.prevent="toggleClass">Menü</button>
          <div class="container-fluid">
            <h1 >Nachbarschaftshilfe</h1>
          </div>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

        </nav>

        <Anzeigen :msg="message"/>

      </div>
    </div>

  </div>
</template>

<script>
import Anzeigen from './components/Anzeigen.vue'

import axios from 'axios'

export default {
  name: 'App',
  components: {
    Anzeigen,

  },
  data(){
    return {
      message: 'HelloWorld!',
      isActive: true,
      info: null
    }
  },
  methods: {
    toggleClass: function () {
      this.isActive = !this.isActive
    }
  },
  mounted() {
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then(response => (this.info = response))
  }

}
</script>

<style>


body {
  overflow-x: hidden;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin .25s ease-out;
  -moz-transition: margin .25s ease-out;
  -o-transition: margin .25s ease-out;
  transition: margin .25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#page-content-wrapper {
  min-width: 100vw;
}

#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}
</style>
