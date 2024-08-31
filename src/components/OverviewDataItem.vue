<script setup>
defineProps(['title', 'value', 'suffix'])
</script>

<template>
  <div class="bg-white shadow-xl rounded-xl p-4 flex flex-col">
    <h3 class="text-slate-500 font">{{ title }}</h3>
    <span class="text-gray-700">{{ value }} <span class="text-gray-900">{{ suffix }}</span></span>
  </div>
</template>

<style scoped>

</style>