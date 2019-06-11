<template>
   <div class="row">
     
      <div class="text-center">
         <p-button @click.native.prevent="showAddForm=true" id="add-task-button" type="success">Add New Task</p-button>
      </div>
      <div class="col-12 over">
         <card :title="table1.title" :subTitle="table1.subTitle">
            <div slot="raw-content" class="table-responsive">
               <paper-table type="hover" :data="table1.data" :columns="table1.columns" :titles="table1.titles"></paper-table>
            </div>
         </card>
      </div>
      <div class="col-12 under">
         <card :title="table2.title" :subTitle="table2.subTitle">
            <div slot="raw-content" class="table-responsive">
               <paper-table type="hover" :data="table2.data" :columns="table1.columns" :titles="table2.titles"></paper-table>
            </div>
         </card>
      </div>
      <b-modal @ok="addTask" @hidden="clearTask" v-model="showAddForm" centered title="Add New Task" id="add-task-modal">
        <fg-input type="text" v-model="task.client" placeholder="Client"></fg-input>
        <fg-input type="text" v-model="task.type" placeholder="Task Type (i.e. Build)"></fg-input>
        <fg-input type="text" v-model="task.link" placeholder="Liquid Planner Link"></fg-input>
        <fg-input type="number" v-model="task.locations" placeholder="# of locations"></fg-input>
        <fg-input type="text" v-model="task.pm" placeholder="Name of PM"></fg-input>
      </b-modal>
   </div>
</template>
<script>
import { PaperTable } from "@/components";
import firebase from "firebase";
import { db } from "../main";

const column1Titles = ["Client", "Type", "LP Link", "# of Locations", "PM", "Assign Builder"];
const column2Titles = ["Client", "Type", "LP Link", "# of Locations", "PM", "Assigned Builder"];
const tableColumns = ["client", "type", "link", "locations", "pm", "assign", "assigned", "remove"]; 

export default {
  components: {
    PaperTable
  },
  data() {
    return {
      dataRef: db.collection("tasks"),
      showAddForm: false,
      task: {
        client: '',
        type: '',
        link: '',
        locations: 0,
        pm: '',
        assign: ''
      },
      table1: {
        title: "Available Tasks",
        subTitle: "Available tasks for builders to grab when they have extra time",
        titles: [...column1Titles],
        columns: [...tableColumns],
        data: []
      },
      table2: {
         title: "Assigned Tasks",
         subTitle: "Tasks that are currently being worked on (will be deleted in 48 hours)",
         titles: [...column2Titles],
         data: []
      }
    };
  },
  created() {
    this.dataRef.onSnapshot((querySnapshot) => {
      this.table1.data = [];
      this.table2.data = [];
      querySnapshot.forEach((doc) => {
        if(doc.data().assign == ""){
          this.table1.data.push({
            id: doc.id,
            assign: doc.data().assign,
            client: doc.data().client,
            link: doc.data().link,
            locations: doc.data().locations,
            pm: doc.data().pm,
            type: doc.data().type
          });
        }else{
          this.table2.data.push({
            id: doc.id,
            assign: doc.data().assign,
            client: doc.data().client,
            link: doc.data().link,
            locations: doc.data().locations,
            pm: doc.data().pm,
            type: doc.data().type
          });
        };
      });
    });
  },
  methods: {
    addTask() {
      const increment = firebase.firestore.FieldValue.increment(1);
      db.collection("tasks").add(this.task);
      if(this.task.type.toUpperCase() === "BUILD"){
        db.collection("info").doc("build-stats").update({
          total: increment,
          build: increment
        });
      }else{
        db.collection("info").doc("build-stats").update({
          total: increment,
          other: increment
        });
      }
    },
    clearTask() {
      this.task.client = '';
      this.task.type = '';
      this.task.link ='';
      this.task.pm = '';
      this.task.locations = '';
      this.task.assign ='';
    }
  }
};
</script>

<style>
.content {
   overflow: hidden;
}
.over {
   position: absolute;
   z-index: 5; 
}
.under {
   position: absolute;
   z-index: 0;
}
#add-task-button {
   margin: 20px !important;
}
</style>
