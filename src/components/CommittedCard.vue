<script setup>

import { ref } from 'vue'
import useCalculateStore from '@/stores/calculate.js'
import DeleteIcon from '@/components/DeleteIcon.vue'

const creditType = ref('gam')

const calcStore = useCalculateStore()

</script>

<template>
  <div class="bg-white rounded-[16px] p-[16px] w-full">
    <div class="flex w-full justify-between items-center mb-[26px]">
      <h3 class="text-[18px] font-[600]">متعهد</h3>
      <DeleteIcon />
    </div>
    <div class="flex gap-4 w-full">
      <div class="flex flex-col gap-2 w-1/4">
        <label for="committed-name">نام</label>
        <InputText id="committed-name" />
      </div>
      <div class="flex flex-col  gap-2 w-1/4">
        <label for="committed-credit-type">اوراق اعتباری</label>
        <Select id="committed-credit-type"
                v-model="creditType"
                :options="[{label: 'گام', value: 'gam'}]"
                disabled
                size="small"
                :optionLabel="(i) => i.label"
                :optionValue="(i) => i.value">
        </Select>
      </div>
      <div class="flex flex-col gap-2 w-1/4">
        <label for="committed-total-credit">ارزش کل اعتبار</label>
        <InputNumber id="committed-total-credit" suffix=" میلیارد ریال" v-model="calcStore.committed.totalCredit" />
      </div>
      <div class="flex flex-col gap-2 w-1/4">
        <label for="committed-total-rate">نرخ تنزیل سالانه</label>
        <InputNumber v-model="calcStore.committed.rate" showButtons dir="ltr" suffix="%" max="100" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>