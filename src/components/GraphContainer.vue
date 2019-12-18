<template>
  <div>
    <main role="main" class="col-lg-12 pt-3 px-4">
          <div class="graph d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 class="h2">Risk Profile by Body System (Pie Chart)</h1>
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
            <h1 class="h2">Risk Profile Matrix</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                <button  disabled class="btn btn-sm btn-outline-secondary">Share</button>
                <button disabled class="btn btn-sm btn-outline-secondary">Export</button>
              </div>
            </div>
          </div>

          <div ref="chart-heatmap" id="chart-heatmap"></div>
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
      piechart: {}
    }
  },
  methods: {
    async getAdverseReactions (drugs) {
      DrugsApi.adverseReactions(drugs).then(result => {
        this.reactions = result.data.items
        this.reactions.forEach((reaction) => {
          if (this.piechart.hasOwnProperty(reaction.bodySystem)) {
            this.piechart[reaction.bodySystem]++
          } else {
            this.piechart[reaction.bodySystem] = 1
          }
        })
        this.renderPieChart()
      })
    },
    renderPieChart: function (event) {
      console.log('render pie chart')
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
          width: 1080,
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
    renderHeatmapChart: function (event) {
      function generateData (count, yrange) {
        var i = 0
        var series = []
        while (i < count) {
          var x = 'w' + (i + 1).toString()
          var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min

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
          type: 'heatmap'
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#008FFB'],
        series: [{
          name: 'Metric1',
          data: generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric2',
          data: generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric3',
          data: generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric4',
          data: generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric5',
          data: generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric6',
          data: generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric7',
          data: generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric8',
          data: generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric9',
          data: generateData(18, {
            min: 0,
            max: 90
          })
        }
        ],
        title: {
          text: 'HeatMap Chart (Single color)'
        }

      }
      if (this.$refs['chart-heatmap']) {
        var chart = new ApexCharts(document.querySelector('#chart-heatmap'), options)
        chart.render()
      }
    }
  },

  mounted () {
    this.renderHeatmapChart()
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
