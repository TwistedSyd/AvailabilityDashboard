<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <h1>{{routeName}}</h1>
      <button class="navbar-toggler navbar-burger"
              type="button"
              @click="toggleSidebar"
              :aria-expanded="$sidebar.showSidebar"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a v-if="isAuthenticated" href="#" class="nav-link">
              <p id="user" href="">Logged in as: {{currentUser}} </p>
              <i class="ti-share"></i>
              <p @click="logOut" >
                 Logout
              </p>
            </a>
            <a v-else @click="logIn" href="#" class="nav-link">
              <i class="ti-import"></i>
              <p>
                 Login
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div></nav>
</template>

<script>
import firebase from 'firebase';

export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  /* Check is user is logged in, if not push to login page */
  created() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isAuthenticated = true;
        }else{
          this.$router.push('/login');
        }
    })
  },
  data() {
    return {
      activeNotifications: false,
      isAuthenticated: false,
      currentUser: ""
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    logIn(){
      console.log("Login");
      this.$router.push('/login');
    },
    logOut(){
      console.log("Logout");
      firebase.auth().signOut()
        .then(() => {
          this.isAuthenticated = false;
          this.$router.push('/login');
        })
    }
  },
  updated() {
    /* Regularly check to see if the user is logged in */
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isAuthenticated = true;
        }else{
          this.$router.push('/login');
        }
    })
    if(this.isAuthenticated){
      this.currentUser = firebase.auth().currentUser.email;
    }
  }
};
</script>

<style>
#user {
  padding-right: 15px;
}
</style>
