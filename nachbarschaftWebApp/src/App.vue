<template>
  <div id="app">

    <div class="d-flex" :class="[isActive ? 'toggled' : '']" id="wrapper">

      <!-- Sidebar -->
      <div class="bg-light border-right" id="sidebar-wrapper">
        <div v-if="!this.isAdmin" class="sidebar-heading">Menü</div>
        <div v-else class="sidebar-heading">Admin Menü</div>
        <div class="list-group list-group-flush">
          <router-link to="/" class="list-group-item list-group-item-action bg-light">Startseite</router-link>
          <div v-if="this.isLoggedIn">
            <a href="" @click="pushToProfile()" class="list-group-item list-group-item-action bg-light">Profil</a>
            <router-link :to="{name: 'add'}" class="list-group-item list-group-item-action bg-light">Neue Anzeige</router-link>
            <router-link :to="{ name: 'nachrichten'}" class="list-group-item list-group-item-action bg-light">Nachrichten</router-link>
            <router-link v-if="this.isAdmin" :to="{ name: 'meldungen'}" class="list-group-item list-group-item-action bg-light">Meldungen</router-link>
          </div>



        </div>
      </div>

      <!-- Content -->
      <div id="page-content-wrapper">

        <nav class="navbar navbar-expand-lg bg-light border-bottom">
          <button class="btn btn-success"  @click.prevent="toggleClass">Menü</button>
          <div class="container-fluid">
            <h1 >Nachbarkraft</h1>

            <div v-if="user.benutzername">
              <span class="mr-2">Willkommen {{ user.benutzername }}</span>
              <button class="btn btn-success" @click="logoutUser">Logout</button>
            </div>

            <div v-else>
              <button class="btn btn-success" @click="$router.push({name: 'login'})">Login</button>
            </div>

          </div>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

        </nav>

        <keep-alive include="add_anzeige">
          <router-view></router-view>
        </keep-alive>


      </div>

    </div>

  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  export default {
    name: 'App',
    data(){
      return {
        isActive: true,
        info: null,

      }
    },
    methods: {
      ...mapActions('login',["logout"]),
      toggleClass: function () {
        this.isActive = !this.isActive
      },
      logoutUser() {
        this.logout();
        this.$router.push('/')
      },
      pushToProfile() {
        this.$router.push({ name: 'profil', params: { id: this.user.id }})
      }
    },
    computed: {
      ...mapState('login',['user']),
      ...mapGetters('login',['isLoggedIn', 'isAdmin', "getUser"])
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
