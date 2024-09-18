<script setup>

import OverviewDataItem from '@/components/OverviewDataItem.vue'
import useCalculateStore from '@/stores/calculate.js'
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts';
import OverviewFirstCard from '@/components/OverviewFirstCard.vue'
import OverviewSecondCard from '@/components/OverviewSecondCard.vue'

const calcStore = useCalculateStore()


const totalDiscounted = computed(() => {
  let total = 0;

  for (let i = 0; i < calcStore.state.applicants.length; i ++) {
    total += calcStore.state.applicants[i].totalCredit * (calcStore.state.applicants[i].rate / 100)
  }

  return total;
})


const totalCashDiscounted = computed(() => {
  let total = 0;
  for (let i = 0; i < calcStore.state.applicants.length; i ++) {
    const e8 =  calcStore.state.applicants[i].totalCredit * (calcStore.state.applicants[i].rate / 100);
    const b2 = calcStore.committed.rate;
    const e6 = calcStore.state.applicants[i].due
    total += (e8 - ((e8*((b2 / 100) / 12)) * e6))
  }

  return total;
})


const totalCreditLeft = computed(() => {
  let total = calcStore.state.applicants[calcStore.state.applicants.length - 1].totalCredit;
  if (calcStore.state.applicants[calcStore.state.applicants.length - 1].rate > 0) {
    total -= calcStore.state.applicants[calcStore.state.applicants.length - 1].totalCredit * (calcStore.state.applicants[calcStore.state.applicants.length - 1].rate / 100)
  }
  return total
})


const chartSeries = computed(() => {
  return [totalCreditLeft.value, totalDiscounted.value]
})

const chartOptions = {
  plotOptions: {
    pie: {
      donut: {
        size: '65%',  // The size of the inner circle
        labels: {
          show: true,
          name: {
            offsetY: -10,  // Vertical offset for the name
            formatter: function (val) {
              return val;
            }
          },
          value: {
            offsetY: 10,  // Vertical offset for the value
            formatter: function (val) {
              return val;
            }
          }
        }
      }
    }
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '16px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
      colors: ['#333']
    },
    dropShadow: {
      enabled: false
    },
    offsetX: 0,  // Horizontal offset for the labels
    offsetY: 0,  // Vertical offset for the labels
  },
  chart: {
    width: 380,
    type: 'pie',
    fontFamily: 'Yekan Bakh',

  },
  fontFamily: 'Yekan Bakh',
  labels: ['اعتبار باقی مانده', 'کل اعتبار تنزیل یافته'],
    responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }],
  theme: {
    monochrome: {
      enabled: true,
    },
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-[24px] pt-10 px-3 h-full">
    <OverviewFirstCard>
      <OverviewDataItem title="ارزش کل اعتبار" :value="`${calcStore.committed.totalCredit.toLocaleString()}`" suffix="میلیارد ریال" class="w-2/3" />
      <OverviewDataItem title="کل اعتبار تنزیل یافته" :value="totalDiscounted.toLocaleString()" suffix="میلیارد ریال" class="w-2/3" />
      <OverviewDataItem title="وجه نقد حاصل از تنزیل" :value="totalCashDiscounted.toLocaleString()" suffix="میلیارد ریال" class="w-2/3" />
      <OverviewDataItem title="اعتبار باقیمانده" :value="totalCreditLeft.toLocaleString()" suffix="میلیارد ریال" class="w-2/3" />
    </OverviewFirstCard>

    <OverviewSecondCard>
      <div class="mt-20" id="chart" >
        <VueApexCharts type="donut" :series="chartSeries" :options="chartOptions" />
      </div>
    </OverviewSecondCard>
  </div>
</template>

<style scoped>

</style>