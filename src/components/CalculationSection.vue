<script setup>

import CommittedCard from '@/components/CommittedCard.vue'
import ApplicantCard from '@/components/ApplicantCard.vue'
import useCalculateStore from '@/stores/calculate.js'

const calcStore = useCalculateStore()

</script>

<template>
  <div class="flex flex-col justify-end items-center h-full pl-5">
    <pre dir="ltr" v-show="false">
      {{calcStore.calculations}}
    </pre>
    <template v-for="(applicant, idx) in [...calcStore.state.applicants].slice().reverse()" :key="`applicant-${idx}`" >
      <ApplicantCard :applicant="applicant" :show-add="idx === 0" :idx="idx" :counter="applicant.counter" />
    </template>
    <CommittedCard />
  </div>
</template>

<style scoped>

</style>