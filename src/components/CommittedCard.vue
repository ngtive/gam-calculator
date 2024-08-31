<script setup>

import { ref } from 'vue'
import useCalculateStore from '@/stores/calculate.js'

const creditType = ref('gam')

const calcStore = useCalculateStore()

</script>

<template>
  <div class="bg-white border border-green-500 p-6 rounded-lg">
    <div class="flex gap-4">
      <div class="flex items-center gap-2 w-1/2">
        <label for="committed-name">نام</label>
        <InputText id="committed-name" size="small" />
      </div>
      <div class="flex items-center gap-2 w-1/2">
        <label for="committed-credit-type">اوراق اعتباری</label>
        <Select id="committed-credit-type" v-model="creditType" :options="[{label: 'گام', value: 'gam'}]"
                size="small"
                :optionLabel="(i) => i.label"
                :optionValue="(i) => i.value">
        </Select>
      </div>
    </div>
    <div class="flex gap-4 mt-3">
      <div class="flex items-center gap-2">
        <label for="committed-total-credit">ارزش کل اعتبار</label>
        <InputNumber id="committed-total-credit" suffix=" میلیارد ریال" v-model="calcStore.committed.totalCredit" />
      </div>
      <div class="flex items-center gap-2">
        <label for="committed-total-rate">نرخ تنزیل سالانه</label>
        <InputNumber v-model="calcStore.committed.rate" showButtons dir="ltr" suffix="%" max="100" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>