# **Bryntum Scheduler Pro in Vue.js Documentation**

## **Overview**
This documentation covers how to integrate Bryntum Scheduler Pro into a Vue.js project and configure it to display a five-day timeline with hour separators. It includes installation steps, configuration options, and sample code for a basic setup.

## **Table of Contents**
1. [Installation](#installation)
2. [Component Setup](#component-setup)
3. [Scheduler Configuration](#scheduler-configuration)
4. [Data Binding](#data-binding)
5. [Dynamic Data Fetching](#dynamic-data-fetching)
6. [Styling](#styling)
7. [Error Handling and Best Practices](#error-handling-and-best-practices)
8. [Advanced Features](#advanced-features)

---

## **1. Installation**

### **1.1. Install Bryntum Scheduler Pro**
To use Bryntum Scheduler Pro in your Vue.js project, you need to install the package. Ensure you have access to the Bryntum npm registry with the correct license.

```bash
npm install --save @bryntum/schedulerpro @bryntum/schedulerpro-vue-3
```

### **1.2. Additional Dependencies**
Ensure you have Vue.js installed. If not, you can install it as follows:

```bash
npm install vue
```

---

## **2. Component Setup**

### **2.1. Create a Vue Component**
Create a Vue component that will serve as the container for the scheduler. This component will import and initialize Bryntum Scheduler Pro.

#### **Example: SchedulerComponent.vue**

```vue
<template>
  <bryntum-scheduler-pro
      :assignments="assignments"
      :resources="resources"
      :events="events"
      v-bind="schedulerProConfig"
  />
</template>

<script>
import { ref, reactive } from 'vue';
import { BryntumSchedulerPro } from '@bryntum/schedulerpro-vue-3';
import { DateHelper } from '@bryntum/schedulerpro';

export default {
  name: 'SchedulerComponent',
  components: {
    BryntumSchedulerPro
  },
  setup() {
    // Scheduler configuration (explained in the next section)
    const schedulerProConfig = reactive({
      startDate: new Date(),
      endDate: DateHelper.add(new Date(), 5, 'day'),  // Five-day span
      viewPreset: {
        base: 'hourAndDay',
        tickWidth: 50,
        headers: [
          { unit: 'day', dateFormat: 'ddd MMM D' },
          { unit: 'hour', dateFormat: 'H' }
        ]
      },
      timeAxis: {
        continuous: false,
        generateTicks: (start, end) => {
          return DateHelper.getRange(start, end, 'hour', 1);
        }
      }
    });

    // Sample static data
    const assignments = ref([...]);
    const resources = ref([...]);
    const events = ref([...]);

    return {
      schedulerProConfig,
      assignments,
      resources,
      events
    };
  }
};
</script>

<style lang="scss">
.scheduler-container {
  height: 600px;
  width: 100%;
}
</style>
```

### **2.2. Template Explanation**
- **`<bryntum-scheduler-pro>`**: The primary component from Bryntum Scheduler Pro.
- **Data Binding**: The data is passed via Vue.js bindings (`:assignments`, `:resources`, `:events`).
- **Configuration Binding**: The scheduler is configured via the `v-bind="schedulerProConfig"` directive, passing a reactive configuration object.

---

## **3. Scheduler Configuration**

### **3.1. `viewPreset` Configuration**
The `viewPreset` determines the structure and appearance of the timeline. In this case, we're using a custom preset based on `hourAndDay` with the following key configurations:

- **`tickWidth`**: Defines the width of each hour segment.
- **`headers`**: Controls the headers displayed at the top. Here, we display days (`unit: 'day'`) and hour separators (`unit: 'hour'`).
  
### **3.2. `timeAxis` Configuration**
The `timeAxis` configures the intervals and tick marks along the timeline:

- **`continuous: false`**: Ensures there are no gaps in the timeline.
- **`generateTicks`**: Generates hourly ticks across the five-day span.

```javascript
timeAxis: {
  continuous: false,
  generateTicks: (start, end) => {
    return DateHelper.getRange(start, end, 'hour', 1);
  }
}
```

### **3.3. Start and End Dates**
The `startDate` and `endDate` properties define the visible range of the timeline. We set it to span five days:

```javascript
startDate: new Date(),
endDate: DateHelper.add(new Date(), 5, 'day')
```

---

## **4. Data Binding**

### **4.1. Resources**
Resources represent the entities that will appear along the vertical axis (e.g., employees, machines). These are passed as an array of objects with unique `id` and `name` properties:

```javascript
const resources = ref([
  { id: 1, name: 'Resource 1' },
  { id: 2, name: 'Resource 2' }
]);
```

### **4.2. Events**
Events are tasks or appointments that are assigned to resources. Each event should have a `startDate`, `duration`, and `resourceId` that links it to a resource:

```javascript
const events = ref([
  { id: 1, resourceId: 1, name: 'Event 1', startDate: new Date(), duration: 2, durationUnit: 'hour' },
  { id: 2, resourceId: 2, name: 'Event 2', startDate: new Date(), duration: 4, durationUnit: 'hour' }
]);
```

### **4.3. Assignments**
Assignments link events to resources. Typically, they are not necessary unless multiple resources are assigned to a single event:

```javascript
const assignments = ref([
  { id: 1, eventId: 1, resourceId: 1 },
  { id: 2, eventId: 2, resourceId: 2 }
]);
```

---

## **5. Dynamic Data Fetching**

### **5.1. Fetch Data via Axios**
You can dynamically fetch resources, events, or any other data from an API using `axios` or any other HTTP client. Here’s an example of fetching user data from an API and setting it as resources:

```javascript
methods: {
  fetchResources() {
    axios.get('http://localhost:3000/resources')
      .then((response) => {
        this.resources.value = response.data;
      })
      .catch((error) => {
        console.error('Error fetching resources:', error);
      });
  }
},
mounted() {
  this.fetchResources(); // Fetch resources on mount
}
```

This allows you to populate the scheduler with data fetched from a backend.

---

## **6. Styling**

### **6.1. Basic Styling**
Define the container size for your scheduler in your component’s style section:

```css
.scheduler-container {
  height: 600px;
  width: 100%;
}
```

### **6.2. Custom CSS**
You can further customize the appearance of the scheduler using custom CSS or SCSS. For example, you can adjust colors, font sizes, or layout specifics.

---

## **7. Error Handling and Best Practices**

### **7.1. Error Handling**
When fetching data or initializing the scheduler, ensure proper error handling is in place. For example, wrap your API calls in try-catch blocks or use `.catch()` with promise-based HTTP requests.

```javascript
fetchResources() {
  axios.get('http://localhost:3000/resources')
    .then((response) => {
      this.resources.value = response.data;
    })
    .catch((error) => {
      console.error('Error fetching resources:', error);
    });
}
```

### **7.2. Best Practices**
- **Component Lifecycle**: Ensure that data is loaded at the correct lifecycle stage (e.g., `mounted()`).
- **Reactive Data**: Use `ref` and `reactive` for data that needs to be dynamically updated.
- **Config Modularity**: Consider moving complex configurations (e.g., `viewPreset`) to separate utility files for better maintainability.

---

## **8. Advanced Features**

### **8.1. Drag-and-Drop Support**
Bryntum Scheduler Pro supports drag-and-drop for events. To enable this feature, ensure that draggable configurations are set up correctly. Consult the [Bryntum Scheduler Pro documentation](https://bryntum.com/products/schedulerpro/) for more details.

### **8.2. Event Listeners**
You can listen to events such as event clicks, drags, or drops by using the `listeners` property in the scheduler configuration:

```javascript
listeners: {
  eventClick: ({ eventRecord }) => {
    console.log('Event clicked:', eventRecord);
  }
}
```

### **8.3. Custom Views**
You can create custom views and presets by extending the default `viewPreset` configurations. This allows you to create highly tailored scheduling interfaces that match your application's requirements.

---

## **Conclusion**

This documentation provides a comprehensive guide