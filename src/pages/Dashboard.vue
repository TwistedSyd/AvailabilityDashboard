<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>
    <h2> Available Builders</h2>
    <div class="row">
      <div class="col-md-3 col-xl-3" v-for="available in availableBuilders" :key="available.name">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${available.type}`" slot="header">
            <i :class="available.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <h6>{{available.name}}</h6>
          </div>
        </stats-card>
      </div>
    </div>
    <h2>Busy Builders</h2> 
    <div class="row">
      <div class="col-md-3 col-xl-3" v-for="not in notAvailable" :key="not.name">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${not.type}`" slot="header">
            <i :class="not.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <h6>{{not.name}}</h6>
          </div>
        </stats-card>
      </div>
    </div>
  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import Chartist from 'chartist';
import firebase from 'firebase';
import { db } from '../main';


export default {
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      refInfo: db.collection("info").doc("build-stats"),
      refAvailable: db.collection("builders").where("available", "==", true),
      refNot: db.collection("builders").where("available", "==", false),
      info: [],
      dividers: {
        available: "Available Builders",
        busy: "Busy Builders"
      },
      statsCards: [
        {
          type: "success",
          icon: "ti-hand-open",
          title: "Builders with Bandwidth",
          value: "",
          footerText: "Number of builders that currently\nhave avilability.",
          footerIcon: "ti-info"
        },
        {
          type: "danger",
          icon: "ti-pencil",
          title: "Tasks Available",
          value: "",
          footerText: "Total number of tasks available for builders\nto assign themselves.",
          footerIcon: "ti-info"
        },
        {
          type: "info",
          icon: "ti-ruler-pencil",
          title: "# of Build Tasks",
          value: "",
          footerText: "Number of available tasks that\nare classified as build.",
          footerIcon: "ti-info"
        },
        {
          type: "info",
          icon: "ti-archive",
          title: "Other Tasks",
          value: "",
          footerText: "Number of tasks not classified\nas build.",
          footerIcon: "ti-info"
        }
      ],
      availableBuilders: [],
      notAvailable: []
    };
  },
  created() {
    this.refInfo.get()
      .then((doc) => {
        if(doc.exists){
          this.info = doc.data();
          this.statsCards[1].value = doc.data().total;
          this.statsCards[2].value = doc.data().build;
          this.statsCards[3].value = doc.data().other;
        }else{
          alert("No such document!");
        }
      });
    this.refAvailable.onSnapshot((querySnapshot) => {
      this.availableBuilders = [];
      this.statsCards[0].value = 0;
      querySnapshot.forEach((doc) => {
        this.statsCards[0].value++;
        this.availableBuilders.push({
          name: doc.data().name,
          available: doc.data().available,
          icon: doc.data().icon,
          type: doc.data().type,
          email: doc.data().email
        });
      });
    });
    this.refNot.onSnapshot((querySnapshot) => {
      this.notAvailable = [];
      querySnapshot.forEach((doc) => {
        this.notAvailable.push({
          name: doc.data().name,
          available: doc.data().available,
          icon: doc.data().icon,
          type: doc.data().type,
          email: doc.data().email
        });
      });
    });
  },
  components: {
    StatsCard,
    ChartCard
  }
};
</script>
<style>
</style>
