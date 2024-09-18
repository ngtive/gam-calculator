<script setup>
defineProps(['title', 'value', 'suffix'])
</script>

<template>
  <div class="bg-[#EDEDED] rounded-xl p-[12px] flex flex-row items-center justify-between w-full">
    <h3 class="text-[12px] text-[#282828]">{{ title }}</h3>
    <div class="flex items-center gap-1">
      <span class="text-[12px] font-bold text-[#282828]">{{ value }} </span>
      <span class="text-[8px] font-normal text-[#888]">{{ suffix }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>