<template>
  <bryntum-scheduler-pro
      :assignments = "assignments"
      :calendars = "calendars"
      :dependencies = "dependencies"
      :resources = "resources"
      :events = "events"
      v-bind = "schedulerProConfig"
  />
</template>

<script>
import { ref, reactive } from 'vue';
import { BryntumSchedulerPro } from '@bryntum/schedulerpro-vue-3';
import { DateHelper } from '@bryntum/schedulerpro';
import axios from "axios";

export default {
  name: 'SchedulerComponent',
  components: {
    BryntumSchedulerPro
  },
  
methods : {
  getUsers (){
   axios.get('http://localhost:3000/users').then((response)=>console.log(response))
  }

 },
 mounted() {
   this.getUsers()
 },

  setup() {
    // Scheduler configuration
    const schedulerProConfig = reactive({
      startDate: new Date(),
      endDate: DateHelper.add(new Date(), 5, 'day'),  // 5 days from the current date

      viewPreset: {
        base: 'hourAndDay', // Base preset
        tickWidth: 50, // Customize tick width
        headers: [
          { unit: 'day', dateFormat: 'ddd MMM D' }, // Day header
          { unit: 'hour', dateFormat: 'H' } // Hour separator
        ]
      },
    });

    // Sample data (static for now)
    const assignments = ref([
      { id: 1, eventId: 1, resourceId: 1 },
      { id: 2, eventId: 2, resourceId: 2 }
    ]);

    const resources = ref([
      { id: 1, name: 'Resource 1' },
      { id: 2, name: 'Resource 2' }
    ]);

    const events = ref([
      { id: 1, resourceId: 1, name: 'Event 1', startDate: new Date(), duration: 2, durationUnit: 'hour' },
      { id: 2, resourceId: 2, name: 'Event 2', startDate: new Date(), duration: 4, durationUnit: 'hour' }
    ]);

    return {
      schedulerProConfig,
      assignments,
      resources,
      events
    };
  }
};
</script>

<style lang = "scss">
@import './App.scss';
</style>