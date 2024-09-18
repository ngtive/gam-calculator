<script setup>
  import SepLine from '@/components/SepLine.vue'
  import AddIcon from '@/components/AddIcon.vue'
  import useCalculateStore from '@/stores/calculate.js'
  import { computed } from 'vue'
  import DeleteIcon from '@/components/DeleteIcon.vue'

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

  function deleteHandler() {
    if (props.counter === 1) {
      calcStore.state.applicants = calcStore.state.applicants.map(i => {
        if (i.counter === props.counter)
          return {
            name: '',
            counter: props.counter,
            due: 0,
            rate: 0,
            government: 0,
            transfer: 0,
            hold: 0,
            totalCredit: 0
          }
        return i;
      })
    }
    else {
      calcStore.state.applicants = calcStore.state.applicants.filter(i => i.counter !== props.counter)
      calcStore.state.applicants = calcStore.state.applicants.map((value, index) => {
        if (index > 0) {
          value.counter = calcStore.state.applicants[index - 1].counter + 1
        }
        return value;
      })
    }
  }
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <AddIcon @click="calcStore.addRawApplicant()" v-if="showAdd" />
    <SepLine />
    <div class="bg-white p-[16px] rounded-[16px] w-full">
      <div class="flex justify-between w-full items-center mb-[20px]">
        <h3>متقضی {{ counter }}</h3>
        <button type="button" @click="deleteHandler">
          <DeleteIcon />
        </button>
      </div>
      <div class="flex gap-2">
        <div class="w-12/12 xl:w-8/12 flex flex-col gap-[24px]">
          <div class="flex items-center w-full gap-[24px]">
            <div class="w-1/3 flex flex-col">
              <label>نام</label>
              <InputText placeholder="نام متقاضی" class="w-full" v-model="applicant.name" />
            </div>
            <div class="w-1/3 flex flex-col">
              <label>زمان باقیمانده تا سررسید</label>
              <InputNumber max="12" placeholder=" ماه" suffix=" ماه" v-model="applicant.due"  />
            </div>
            <div class="w-1/3 flex flex-col">
              <label>میزان مجاز تنزیل براساس جایگاه</label>
              <InputNumber max="100" placeholder="%" suffix="%" v-model="applicant.rate" />
            </div>
          </div>
          <div class="flex items-center w-full gap-[24px]">
            <div class="w-1/3 flex flex-col">
              <label>ارزش تسویه دیون دولتی</label>
              <InputNumber placeholder="میلیارد ریال" suffix=" میلیارد ریال" v-model="applicant.government"  />
            </div>
            <div class="w-1/3 flex flex-col">
              <label>میزان انتقال در معاملات</label>
              <InputNumber placeholder="%" suffix="%" v-model="applicant.transfer" max="100" />
            </div>
            <div class="w-1/3 flex flex-col">
              <label>میزان نگهداری تا سررسید</label>
              <InputNumber placeholder="%" suffix="%" v-model="applicant.hold" max="100" />
            </div>
          </div>
        </div>
        <div class="w-12/12 xl:w-4/12 pr-2 flex flex-col space-y-[8px] justify-center">
          <div class="flex justify-between p-[8px] rounded-[8px] bg-[#EDEDED]">
            <h3 class="text-[12px] text-[#282828]">ارزش اعتبار انتقال یافته</h3>
            <div class="flex items-center gap-1">
              <span class="text-[12px] font-bold">{{ applicant.totalCredit }}</span>
              <span class="text-[9px] text-[#888]">میلیارد ریال</span>
            </div>
          </div>
          <div class="flex justify-between p-[8px] rounded-[8px] bg-[#EDEDED]">
            <h3 class="text-[12px] text-[#282828]">کل اعتبار قابل تنزیل</h3>
            <div class="flex items-center gap-1">
              <span class="text-[12px] font-bold">{{ totalCreditDiscounted }}</span>
              <span class="text-[9px] text-[#888]">میلیارد ریال</span>
            </div>
          </div>
          <div class="flex justify-between p-[8px] rounded-[8px] bg-[#EDEDED]">
            <h3 class="text-[12px] text-[#282828]">وجه نقد حاصل از تنزیل</h3>
            <div class="flex items-center gap-1">
              <span class="text-[12px] font-bold">{{ cashFromDiscount }}</span>
              <span class="text-[9px] text-[#888]">میلیارد ریال</span>
            </div>
          </div>
          <div class="flex justify-between p-[8px] rounded-[8px] bg-[#EDEDED]">
            <h3 class="text-[12px] text-[#282828]">باقیمانده اعتبار</h3>
            <div class="flex items-center gap-1">
              <span class="text-[12px] font-bold">{{ creditBalance }}</span>
              <span class="text-[9px] text-[#888]">میلیارد ریال</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SepLine />
  </div>

</template>

<style scoped>

</style>