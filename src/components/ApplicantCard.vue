<script setup>
  import SepLine from '@/components/SepLine.vue'
  import AddIcon from '@/components/AddIcon.vue'
  import useCalculateStore from '@/stores/calculate.js'
  import { computed } from 'vue'

  const props = defineProps([
    'applicant',
    'showAdd',
    'idx',
    'counter'
  ])

  const calcStore = useCalculateStore()


  const totalCreditDiscounted = computed(() => {
    return props.applicant.totalCredit * (props.applicant.rate / 100)
  })

  const cashFromDiscount = computed(() => {
    const e8 = totalCreditDiscounted.value;
    const b2 = calcStore.committed.rate;
    const e6 = props.applicant.due

    return (e8 - ((e8*((b2 / 100) / 12)) * e6))
  })

  const creditBalance = computed(() => {
    return props.applicant.totalCredit - totalCreditDiscounted.value;
  })
</script>

<template>
  <div class="flex flex-col items-center">
    <AddIcon @click="calcStore.addRawApplicant()" v-if="showAdd" />
    <SepLine />
    <div class="bg-white border p-6 rounded-lg border-green-500">
      <div class="flex gap-2">
        <div class="w-12/12 xl:w-8/12">
          <div class="flex  gap-2">
            <label>نام</label>
            <InputText placeholder="نام متقاضی" class="w-full" size="small" v-model="applicant.name" />
          </div>
          <div class="flex  mt-2 gap-2">
            <label>زمان باقیمانده تا سررسید</label>
            <InputNumber max="12" placeholder=" ماه" suffix=" ماه" v-model="applicant.due" />
          </div>
          <div class="flex  mt-2 gap-2">
            <label>میزان مجاز تنزیل براساس جایگاه</label>
            <InputNumber max="100" placeholder="%" suffix="%" v-model="applicant.rate" />
          </div>
          <div class="flex  border-t pt-2 mt-2">
            <div class="w-4/12">
              <label>تسویه دیون دولتی</label>
              <InputNumber placeholder="%" suffix="%" v-model="applicant.government" max="100"  />
            </div>
            <div class="w-4/12">
              <label>انتقال در معاملات</label>
              <InputNumber placeholder="%" suffix="%" v-model="applicant.transfer" max="100" />
            </div>
            <div class="w-4/12">
              <label>نگهداری تا سررسید</label>
              <InputNumber placeholder="%" suffix="%" v-model="applicant.hold" max="100" />
            </div>
          </div>
        </div>
        <div class="w-12/12 xl:w-4/12 border-r pr-2 ">
          <div class="flex justify-between">
            <label>ارزش اعتبار انتقال یافته</label>
            <InputNumber readonly v-model="applicant.totalCredit" suffix=" میلیارد ریال" />
          </div>
          <div class="flex mt-2 justify-between">
            <label>کل اعتبار قابل تنزیل</label>
            <InputNumber readonly v-model="totalCreditDiscounted" suffix=" میلیارد ریال" />
          </div>
          <div class="flex mt-2 justify-between">
            <label>وجه نقد حاصل از تنزیل</label>
            <InputNumber readonly v-model="cashFromDiscount" suffix=" میلیارد ریال" />
          </div>
          <div class="flex mt-2 justify-between">
            <label>باقیمانده اعتبار</label>
            <InputNumber readonly v-model="creditBalance" suffix=" میلیارد ریال" />
          </div>
        </div>
      </div>
    </div>
    <SepLine />
  </div>

</template>

<style scoped>

</style>