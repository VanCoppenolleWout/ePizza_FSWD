<script lang="ts">
import { defineComponent } from 'vue'
import { ref, computed } from 'vue'
import { DoughnutChart } from 'vue-chart-3'
import { Chart, DoughnutController, ArcElement } from 'chart.js'

export default defineComponent({
  setup(props: any) {
    Chart.register(DoughnutController, ArcElement)

    const data: any = computed(() => ({
      labels: '',
      datasets: [
        {
          data: props.stockData,
          backgroundColor: [
            '#859900',
            '#d33682',
            '#cb4b16',
            '#77CEFF',
            '#0079AF',
            '#123E6B',
            '#97B0C4',
            '#A5C8ED',
          ],
        },
      ],
    }))
    const options = ref({
      plugins: {
        title: {
          text: 'Doughnut',
        },
        tooltips: {
          enabled: true,
        },
      },
    })
    return {
      data,
      options,
    }
  },

  props: {
    stockData: Array,
  },

  components: {
    DoughnutChart,
  },
})
</script>

<template>
  <DoughnutChart :chartData="data" :options="options" style="max-width: 40%" />
</template>
