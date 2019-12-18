<template>
<div class="affix" >
  <div class="text-left">
    <div class="text-left">
      <br/>
      <div class="drug-search-container">
        <h1> Patient Profile </h1>
        <div v-if="selectedDrugs.length > 0">
          <ul>
            <li :key="index" v-for="(drug, index) in selectedDrugs">
                {{ drug }}
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No drugs added to patient profile. Use the input below to search drugs.</p>
        </div>
        <vue-bootstrap-typeahead
          ref="drugsAutocomplete"
          :data="drugs"
          v-model="drugSearch"
          size="sm"
          :serializer="d => d.name"
          placeholder="Add to drug patient profile..."
          @hit="selectedDrugs.push($event.name); $refs.drugsAutocomplete.inputValue = ''"
        />
        <br/>
        <button @click="resetSelected()">Reset</button>
        <hr/>
      </div>
      <div class="about-container" >
        <h1>About</h1>
        <p>
          This tool plot areas of risk for additive side-effects when given a patient drug profile. The data is sourced
          from the Royal Pharmaceutical Societies Optimised Content API.
        </p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import DrugsApi from '@/api/Drugs'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import _ from 'underscore'

export default {
  name: 'Sidebar',
  components: {
    VueBootstrapTypeahead
  },
  data: function () {
    return {
      drugs: [],
      drugSearch: '',
      selectedDrugs: []
    }
  },
  methods: {
    async getDrugs (term) {
      DrugsApi.autoComplete(term).then(results => {
        this.drugs = results.data.items
      })
    },
    resetSelected () {
      this.selectedDrugs = []
    }
  },
  watch: {
    drugSearch: _.debounce(function (term) {
      if (term.length > 2) {
        this.getDrugs(term)
      }
    }, 100),
    selectedDrugs: function () {
      this.$emit('selectedDrugChange', this.selectedDrugs)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
