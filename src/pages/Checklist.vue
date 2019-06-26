<template>
 <div class="checklist">
    <v-card color="blue lighten-3">
            <v-list two-line>
              <v-subheader>
                <h2>{{title}}</h2>
              </v-subheader>
              <v-divider></v-divider>
              <v-layout align-center>
      <strong class="mx-3 info--text" style="color:darkblue">
        Remaining: {{ remainingTasks}}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-3" style="color:darkgreen">
        Completed: {{ completedTasks }}
      </strong>
   
    </v-layout>
    <v-divider></v-divider>
               <template v-for="(item, index) in fullBuildItems">
        <v-list-tile :key="index">
        <v-list-tile-action>
            <v-checkbox v-model="item.done" color="info darken-3"></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content>
            {{item.content}}
        </v-list-tile-content>
        </v-list-tile>
        <v-divider 
            v-if="index + 1 < fullBuildItems.length"
            :key="index"
        ></v-divider>
        </template>
            </v-list>
          </v-card>
 </div>
</template>

<script>

export default {
    name: "checklist",
        data() {
         return {
             title: "Builder Checklist",
             fullBuildItems: [ 
                { content: "Spin Up Client (if applicable)", index: 1 },
                { content: "Spin Up Locations", index: 2 },
                { content: "Clone Appropriate site to location", index: 3  },
                { content: "Import correct Home page", index: 4  },
                { content: "Choose Colors", index: 5 },
                { content: "Currate Photos", index: 6  },
                { content: "Add Copy", index: 7  },
                { content: "Add Hyperlinks", index: 8  },
                { content: "Configure CTAs", index: 9  },
                { content: "Update Footer Links", index: 10 },
                { content: "Configure Sticky Nav", index: 11 },
                { content: "Add Redirects", index: 12 },
                { content: "Add SEO Strategy", index: 13 },
                { content: "Configure Pay Online Button", index: 14 },
                { content: "Update Email Overrides", index: 15 },
                { content: "Configure Call Pooling/Call Tracking", index: 16 },
                { content: "Configure RepMan/Chatmeter", index: 17 },
                { content: "Configure Blog Page", index: 18 },
                { content: "Check Maps Widget", index: 19 },
                { content: "Check H1s", index: 20 },
                { content: "Check for 404s", index: 21 },
                { content: "Check Typekit - jch5str", index: 22 },
                { content: "Delete Pages Not Being Used", index: 23 },
                { content: "Double Check Units Widget", index: 24 },
                { content: "Double Check Flip Cards", index: 25 },
                { content: "Double Check Liquid Values", index: 26 },
                { content: "Get CSS Aproved", index: 27 },
                { content: "Check Access Hours Format", index: 28 }
    ],
    }
        },
    computed: {
    fullBuildItems() {
      return this.fullBuildItems;
    },
    completed() {
        return this.completed;
    },
    completedTasks () {
        return this.fullBuildItems.filter(completed => completed.done).length
    },
    remainingTasks () {
        return this.fullBuildItems.length - this.completedTasks
    },
    }
}
</script>
