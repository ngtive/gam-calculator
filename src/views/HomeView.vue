<script setup>
import CalculationSection from '@/components/CalculationSection.vue'
import OverviewSection from '@/components/OverviewSection.vue'
</script>

<template>
  <main>
    <div class="flex flex-row flex-wrap min-h-screen font-yekan bg-[--neutral-background] p-[32px]">
      <div class="w-9/12">
        <CalculationSection />
      </div>
      <div class="w-3/12">
        <OverviewSection />
      </div>
    </div>
  </main>
</template>
