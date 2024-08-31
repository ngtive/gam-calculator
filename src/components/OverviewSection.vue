<script setup>

import OverviewDataItem from '@/components/OverviewDataItem.vue'
import useCalculateStore from '@/stores/calculate.js'
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts';

const calcStore = useCalculateStore()


const totalDiscounted = computed(() => {
  let total = 0;

  for (let i = 0; i < calcStore.applicants.length; i ++) {
    total += calcStore.applicants[i].totalCredit * (calcStore.applicants[i].rate / 100)
  }

  return total;
})


const totalCashDiscounted = computed(() => {
  let total = 0;
  for (let i = 0; i < calcStore.applicants.length; i ++) {
    const e8 =  calcStore.applicants[i].totalCredit * (calcStore.applicants[i].rate / 100);
    const b2 = calcStore.committed.rate;
    const e6 = calcStore.applicants[i].due
    total += (e8 - ((e8*((b2 / 100) / 12)) * e6))
  }

  return total;
})


const totalCreditLeft = computed(() => {
  let total = calcStore.applicants[calcStore.applicants.length - 1].totalCredit;
  if (calcStore.applicants[calcStore.applicants.length - 1].rate > 0) {
    total -= calcStore.applicants[calcStore.applicants.length - 1].totalCredit * (calcStore.applicants[calcStore.applicants.length - 1].rate / 100)
  }
  return total
})


const chartSeries = computed(() => {
  return [totalCreditLeft.value, totalDiscounted.value,]
})

const chartOptions = {
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
  <div class="flex flex-col items-center gap-2 pt-10 px-3">
    <OverviewDataItem title="ارزش کل اعتبار" :value="`${calcStore.committed.totalCredit.toLocaleString()}`" suffix="میلیارد ریال" class="w-2/3" />
    <OverviewDataItem title="کل اعتبار تنزیل یافته" :value="totalDiscounted.toLocaleString()" suffix="میلیارد ریال" class="w-2/3" />
    <OverviewDataItem title="وجه نقد حاصل از تنزیل" :value="totalCashDiscounted.toLocaleString()" suffix="میلیارد ریال" class="w-2/3" />
    <OverviewDataItem title="اعتبار باقیمانده" :value="totalCreditLeft.toLocaleString()" suffix="میلیارد ریال" class="w-2/3" />

    <div class="mt-20" id="chart" v-if="totalCreditLeft > 0 || totalDiscounted > 0">
      <VueApexCharts type="pie" :series="chartSeries" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>

</style>