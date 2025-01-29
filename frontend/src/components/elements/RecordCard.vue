<script setup lang='ts'>
const { id, type } = defineProps<{id: number, type: "lead" | "contact" | "company"}>()
const ru_names = {
  'lead': "Сделка",
  'contact': "Контакт",
  'company': "Компания",
}
</script>

<template>
  <div class="record-card">
    <span>ID: {{ id }}</span>
    <span>Тип: {{ ru_names[type] }}</span>
  </div>
</template>

<style scoped>
.record-card {
  background-color: var(--accent);
  color: var(--text-light);
  padding: 1rem;
  border-radius: 3px;
  display: grid;
  grid-template-rows: 1fr 1fr;
}
</style>