<template>
  <table class="table" :class="tableClass">
    <thead>
    <slot name="titles">
       <th v-for="title in titles" :key="title">{{title}}</th>
    </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="(column, index) in columns"
            :key="index"
            >
         <div v-if="column !== 'link' && column !== 'assign'">
          {{itemValue(item, column)}}
         </div>
         <div v-if="column === 'link'">
            <a :href="itemValue(item, column)" target="_blank">{{itemValue(item, column)}}</a> 
         </div>
         <div v-if="column === 'assign' && item.assign === ''">
            <drop-down title="Assign Builder" >
              <div v-for="builder in availableBuilders" :key="builder">
               <a class="dropdown-item" href="#" @click="assignBuilder(builder, item.id, item.type)">{{builder}}</a>
              </div>
            </drop-down>
         </div>
         <div v-if="column === 'assign' && item.assign !== ''">
            {{itemValue(item, column)}}
         </div>
          <div v-if="column === 'remove' && item.assign === ''" class="close-icon"> 
            <span v-b-tooltip.hover title="Delete Task" @click="removeTask(item.id, item.type)" class="ti-close"></span>
          </div>  
          <div v-if="column === 'remove' && item.assign !== ''" class="close-icon" id="reassign"> 
            <span v-b-tooltip.hover title="Reassign Task" @click="reassignTask(item.id, item.type)" class="ti-back-right"></span>
          </div> 
        </td>         
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
import firebase from "firebase";
import { db } from "../main";
const decrement = firebase.firestore.FieldValue.increment(-1);
const increment = firebase.firestore.FieldValue.increment(1);

export default {
  name: 'paper-table',
  data() {
    return {
      ref: db.collection("builders"),
      availableBuilders: []
    }
  },
  created() {
    this.ref.onSnapshot((querySnapshot) => {
      this.availableBuilders = [];
      querySnapshot.forEach((doc) => {
        if(doc.data().available == true){
          this.availableBuilders.push(doc.data().name);
        }
      });
    });
  },
  props: {
    titles: Array,
    columns: Array,
    data: Array,
    type: {
      type: String, // striped | hover
      default: "striped"
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    }
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    }
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
    assignBuilder(builder, id, type) {
      db.collection("tasks").doc(id).update({
        assign: builder
      });
      if(type.toUpperCase() === "BUILD"){
        db.collection("info").doc("build-stats").update({
          total: decrement,
          build: decrement
        });
      }else{
        db.collection("info").doc("build-stats").update({
          total: decrement,
          other: decrement
        });
      }
    },
    removeTask(id, type) {
      console.log("Checking: " + id);
      this.$bvModal.msgBoxConfirm("Are you sure you want to delete this task?", {
        title: "Please Confirm",
        size: "md",
        buttonSize: "md",
        okTitle: "DELETE",
        cancelTitle: "Cancel"
      })
        .then(value => {
          if(value == true){
            console.log("Gonna delete");
            db.collection("tasks").doc(id).delete();
            if(type.toUpperCase() === "BUILD"){
              db.collection("info").doc("build-stats").update({
                total: decrement,
                build: decrement
              });
            }else{
              db.collection("info").doc("build-stats").update({
                total: decrement,
                other: decrement
              });
            }
          }else{
            console.log("Cancelling delete operation.");
          }
        })
        .catch(err => {
          console.log("There was an error.");
        })
    },
    reassignTask(id, type) {
      db.collection("tasks").doc(id).update({
        assign: ''
      });
      if(type.toUpperCase() === "BUILD"){
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
  }
};
</script>
<style>
.dropdown {
   list-style: none;
}

.close-icon {
  width: 15px;
}

.close-icon [class^="ti-"],
.close-icon [class*=" ti-"] {
  color: rgb(255, 0, 0);
  margin-top: 3px;
  transition: .3s;
}

.close-icon:hover [class^="ti-"],
.close-icon:hover [class*=" ti-"] {
  font-size: 1.5em;
  margin-top: -5px;
}

#reassign [class^="ti-"],
#reassign [class*=" ti-"] {
  color: blue;
}
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5) !important;
}
</style>
