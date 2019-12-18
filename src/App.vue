<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row h-100">
        <div class="controls col-sm-4 col-lg-2">
          <Sidebar :drugs="selectedDrugs" v-on:selectedDrugChange="onSelectedDrugChange" :reset="reset"/>
        </div>
        <div class="visualisation col-sm-4 col-lg-10">
          <GraphContainer :drugs="selectedDrugs" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import GraphContainer from './components/GraphContainer.vue'

export default {
  name: 'app',
  components: {
    Sidebar,
    GraphContainer
  },
  data () {
    return {
      selectedDrugs: []
    }
  },
  methods: {
    drugListUpdate: function (id) {
      console.log('Event from parent component emitted', id)
    },
    onSelectedDrugChange (value) {
      this.selectedDrugs = value
    },
    reset () {
      this.selectedDrugs = []
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
