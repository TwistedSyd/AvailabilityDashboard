<template>
    <div class="row">
      <div class="col-12 over">
        <card id="login-card">
          <h1 id="title">Login</h1>
          <div class="row">
            <div class="col-md-6 login-input">
              <fg-input type="email"
                        label="Put your email here:"
                        placeholder="Email"
                        v-model="email">
              </fg-input>
            </div>
            <div class="col-md-6 login-input">
              <fg-input type="password"
                        label="Put your password here:"
                        placeholder="Password"
                        v-model="password">
              </fg-input>
            </div>
          </div>
          <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="logIn">
            Login
          </p-button>
          </div>
        <div v-if="error !== null" class="alert alert-danger">
          <span>{{error}}</span>
        </div>
        </card>
      </div>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: "login",
  data(){
    return {
      email: '',
      password: '',
      isAuthenticated: false,
      error: null,
    }
  },
  components: {
  },
  created() {
    /* Check to see if the user is logged in, if so push user to dashboard page */
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.isAuthenticated = true
            this.$router.push('/dashboard')
        }
    })
  },
  methods: {
    /* Log user into Firebase/Firestore auth */
    logIn(){
      console.log("Login");
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.isAuthenticated = true;
          this.$router.push('/dashboard');
        })
        .catch(error => this.error = error.message)
    }
  }
};
</script>

<style>
#title {
  border-bottom: 1px solid rgb(105, 105, 105);
  text-align: left;
  padding-bottom: 5px;
}
#login-card {
  background-color: rgb(247, 247, 247) !important;
}
</style>
