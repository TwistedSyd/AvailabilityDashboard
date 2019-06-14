<template>
  <div class="sidebar"
       :data-background-color="backgroundColor"
       :data-active-color="activeColor">
    <div class="sidebar-wrapper" id="style-3">
      <div class="logo">
        <a href="#" class="simple-text">
            <div class="logo-img">
               <img src="@/assets/img/favicon.png" alt="">
            </div>
          {{title}}
        </a>
      </div>
      <slot>

      </slot>
      <ul class="nav">
        <!-- By default vue-router adds an active class to each route link. 
          This way the links are colored when clicked -->
        <slot name="links">
          <sidebar-link v-for="(link,index) in sidebarLinks"
                        :key="index"
                        :to="link.path"
                        :name="link.name"
                        :icon="link.icon">
          </sidebar-link>
        </slot>
      </ul>
      <moving-arrow :move-y="arrowMovePx">
      </moving-arrow>
      <div v-if="isAuthenticated && isBuilder" id="toggleAvailable">
        <h3>Toggle Availability</h3>
        <hr>
        <p>Logged in as: 
          {{userInfo.name}}
          {{currentUser}}</p>
        <toggle-switch
          @change="updateAvailable($event.value)"
          :options="myOptions"
          v-model="toggleSet"/>
      </div>
    </div>
  </div>
</template>
<script>
import MovingArrow from "./MovingArrow.vue";
import SidebarLink from "./SidebarLink";
import firebase from "firebase";
import { db } from "../../main" ;


export default {
  props: {
    title: {
      type: String,
      default: "Builder Availability"
    },
    backgroundColor: {
      type: String,
      default: "black",
      validator: value => {
        let acceptedValues = ["white", "black", "darkblue"];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    activeColor: {
      type: String,
      default: "info",
      validator: value => {
        let acceptedValues = [
          "primary",
          "info",
          "success",
          "warning",
          "danger"
        ];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      autoClose: this.autoClose,
      addLink: this.addLink,
      removeLink: this.removeLink
    };
  },
  components: {
    MovingArrow,
    SidebarLink
  },
  computed: {
    /**
     * Styles to animate the arrow near the current active sidebar link
     * @returns {{transform: string}}
     */
    arrowMovePx() {
      return this.linkHeight * this.activeLinkIndex;
    }
  },
  data() {
    return {
      refUser: db.collection("builders"),
      userInfo: {
        name: '',
        email: '',
        available: '',
        type: '',
        icon: ''
      },
      toggleSet: '',
      isBuilder: false,
      linkHeight: 65,
      activeLinkIndex: 0,
      windowWidth: 0,
      isWindows: false,
      hasAutoHeight: false,
      links: [],
      isAuthenticated: false,
      currentUser: "",
      myOptions: {
        layout: {
          color: 'white',
          backgroundColor: 'gray',
          selectedColor: 'white',
          selectedBackgroundColor: 'green',
          borderColor: '#fff',
          fontFamily: 'Arial',
          fontWeight: 'bold',
          fontWeightSelected: 'bold',
          squareCorners: false,
          noBorder: false
        },
        items: {
          delay: .4,
          preSelected: '',
          disabled: false,
          labels: [
            {name: 'No', color: 'white', backgroundColor: 'red'}, 
            {name: 'Yes', color: 'white', backgroundColor: 'green'}
          ]
        }
      }
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isAuthenticated = true;
        }else{
          this.$router.push('/login');
        }
    })
  },
  mounted() {
    this.$watch("$route", this.findActiveLink, {
      immediate: true
    });
  },
  updated() {
    /* Check if user is logged in, if not push to login page */
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isAuthenticated = true;
        }else{
          this.$router.push('/login');
          this.isAuthenticated = false;
        }
    });
    if(this.isAuthenticated){
      this.currentUser = firebase.auth().currentUser.email;
    };
    /* Check if the current user is a builder, 
        if so update current user data, 
        if not do nothing */
    if(this.currentUser != ""){
      this.refUser.doc(this.currentUser).get()
        .then((doc) => {
          if(doc.exists){
            this.isBuilder = true;
            this.userInfo.name = doc.data().name;
            this.userInfo.email = doc.data().email;
            this.userInfo.available = doc.data().available;
            this.userInfo.icon = doc.data().icon;
            this.userInfo.type = doc.data().type;
            if(doc.data().available == true){
              this.toggleSet = "Yes";
            }else{
              this.toggleSet = "No";
            }
          }else{
            this.isBuilder = false;
          }
        });
    }
  },
  methods: {
    findActiveLink() {
      this.links.forEach((link, index) => {
        if (link.isActive()) {
          this.activeLinkIndex = index;
        }
      });
    },
    addLink(link) {
      const index = this.$slots.links.indexOf(link.$vnode);
      this.links.splice(index, 0, link);
    },
    removeLink(link) {
      const index = this.links.indexOf(link);
      if (index > -1) {
        this.links.splice(index, 1);
      }
    },
    /* Update the availability of the current user (if they are a builder) */
    updateAvailable(availableValue) {
      if(availableValue == "Yes" && this.currentUser != ""){
        db.collection("builders").doc(this.currentUser).update({
          available: true,
          icon: "ti-hand-open",
          type: "success"
        });
      }else if(availableValue == "No" && this.currentUser != ""){
        db.collection("builders").doc(this.currentUser).update({
          available: false,
          icon: "ti-time",
          type: "danger"
        });
      }
    }
  }
};

</script>
<style>
#toggleAvailable {
  color: white;
  position: absolute;
  bottom: 50px;
  margin-left: 15px;
  margin-right: 25px;
}
</style>
