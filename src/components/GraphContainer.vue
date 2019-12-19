<template>
  <div>
    <main role="main" class="col-lg-12 pt-3 px-4">
          <div class="graph d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h2 class="h2">Risk Profile by Body System</h2>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                <button  disabled class="btn btn-sm btn-outline-secondary">Share</button>
                <button disabled class="btn btn-sm btn-outline-secondary">Export</button>
                <button @click="renderPieChart()" class="btn btn-sm btn-outline-danger">TEST</button>
              </div>
            </div>

          </div>

          <div id="chart-pie-container">
            <div ref="chart-pie" id="chart-pie"></div>
          </div>

          <br/>
          <div class="graph d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h3 class="h2">Risk Profile Matrix</h3>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                <button  disabled class="btn btn-sm btn-outline-secondary">Share</button>
                <button disabled class="btn btn-sm btn-outline-secondary">Export</button>
              </div>
            </div>
          </div>

          <div id="chart-matrix-container">
            <div ref="chart-matrix" id="chart-matrix"></div>
          </div>
    </main>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
import DrugsApi from '@/api/Drugs'

export default {
  name: 'GraphContainer.vue',
  props: {
    drugs: Array
  },
  data: function () {
    return {
      reactions: [],
      piechart: {},
      matrixchart: {
        'unknown': { severe: 0, unsevere: 0 },
        'very rare': { severe: 0, unsevere: 0 },
        'rare': { severe: 0, unsevere: 0 },
        'uncommon': { severe: 0, unsevere: 0 },
        'common': { severe: 0, unsevere: 0 },
        'very common': { severe: 0, unsevere: 0 }
      }
    }
  },
  methods: {
    async getAdverseReactions (drugs) {
      DrugsApi.adverseReactions(drugs).then(result => {
        this.reactions = result.data.items

        //  Process data required for generating the pie chart
        this.reactions.forEach((reaction) => {
          if (this.piechart.hasOwnProperty(reaction.bodySystem)) {
            this.piechart[reaction.bodySystem]++
          } else {
            this.piechart[reaction.bodySystem] = 1
          }
        })

        //  Process data required for generating the matrix chart
        this.reactions.forEach((reaction) => {
          if (reaction.severity) {
            this.matrixchart[reaction.frequency].severe++
          } else {
            this.matrixchart[reaction.frequency].unsevere++
          }
        })

        //  Render pie chart
        this.renderPieChart()

        //  Render matrix chart
        this.renderMatrixChart()
      })
    },
    renderPieChart: function (event) {
      let labels = []
      let series = []

      var piechart = document.querySelector('#chart-pie')
      piechart.parentNode.removeChild(piechart)

      var piechartcontainer = document.querySelector('#chart-pie-container')
      var newPieChart = document.createElement('div')
      newPieChart.id = 'chart-pie'
      newPieChart.ref = 'chart-pie'
      piechartcontainer.appendChild(newPieChart)

      for (const property in this.piechart) {
        labels.push(property)
        series.push(this.piechart[property])
      }

      let options = {
        chart: {
          width: 720,
          type: 'pie'
        },
        labels: labels,
        series: series,
        responsive: [{
          breakpoint: 1000,
          options: {
            chart: {
              width: 1000
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }

      if (this.$refs['chart-pie'] && this.reactions.length > 0) {
        var chart = new ApexCharts(document.querySelector('#chart-pie'), options)
        chart.render()
        this.piechart = {}
      }
    },
    renderMatrixChart: function (event) {
      var matrixchart = document.querySelector('#chart-matrix')
      matrixchart.parentNode.removeChild(matrixchart)

      var matrixchartcontainer = document.querySelector('#chart-matrix-container')
      var newMatrixChart = document.createElement('div')
      newMatrixChart.id = 'chart-matrix'
      newMatrixChart.ref = 'chart-matrix'
      matrixchartcontainer.appendChild(newMatrixChart)

      console.log(this.matrixchart)
      console.log(this.reactions)
      let matrix = this.matrixchart

      function generateData (count, key) {
        var i = 0
        var series = []
        while (i < count) {
          var x = i === 0 ? 'Not Severe' : 'Severe'
          var y = (i === 0) ? matrix[key].unsevere : matrix[key].severe

          series.push({
            x: x,
            y: y
          })
          i++
        }
        return series
      }

      var options = {
        chart: {
          height: 350,
          width: 500,
          type: 'heatmap'
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#fb1f1d'],
        series: [{
          name: 'Unknown',
          data: generateData(2, 'unknown')
        },
        {
          name: 'Very Rare',
          data: generateData(2, 'very rare')
        },
        {
          name: 'Rare',
          data: generateData(2, 'rare')
        },
        {
          name: 'Uncommon',
          data: generateData(2, 'uncommon')
        },
        {
          name: 'Common',
          data: generateData(2, 'common')
        },
        {
          name: 'Very common',
          data: generateData(2, 'very common')
        }
        ]

      }
      if (this.$refs['chart-matrix']) {
        var chart = new ApexCharts(document.querySelector('#chart-matrix'), options)
        chart.render()
      }
    }
  },
  watch: {
    drugs: function (drugs) {
      this.getAdverseReactions(drugs.join(','))
    }
  }

}
</script>

<style scoped>

</style>
