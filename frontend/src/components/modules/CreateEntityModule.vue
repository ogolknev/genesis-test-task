<script setup lang='ts'>
import { useStore } from '@/stores/app';
import CreateEntityForm from '../components/CreateEntityForm.vue';
import RecordCard from '../elements/RecordCard.vue';
import { computed, ref } from 'vue';
import api from '@/api';

const store = useStore()

const sortedEntities = computed(() => [...store.entities].reverse())
const entityTypes = ['Не выбрано', 'Сделка', 'Контакт', 'Компания'] as const
const entityType = ref<typeof entityTypes[number]>('Не выбрано')
const loading = ref(false)

async function sendForm() {
  if (entityType.value !== 'Не выбрано') {
    loading.value = true
    let response: API.createEntityResponse | undefined
    switch (entityType.value) {
      case 'Компания':
        response = await api.createCompany()
        if (!response) break;
        if (!response.id) {
          console.warn(JSON.stringify(response))
        } else {
          store.entities.push({
            id: response.id,
            type: 'company'
          })
        }
        break;
      case 'Контакт':
        response = await api.createContact()
        if (!response) break;
        if (!response.id) {
          console.warn(JSON.stringify(response))
        } else {
          store.entities.push({
            id: response.id,
            type: 'contact'
          })
        }
        break;
      case 'Сделка':
        response = await api.createLead()
        if (!response) break;
        if (!response.id) {
          console.warn(JSON.stringify(response))
        } else {
          store.entities.push({
            id: response.id,
            type: 'lead'
          })
        }
        break;
      default:
        throw new Error('Invalid entity type.')
    }
    loading.value = false
  }
}
</script>

<template>
  <div class="create-entity-module">
    <div class="result-view">
      <RecordCard
        v-for="[key, record] in sortedEntities.entries()"
        :key="key"
        :id="record.id"
        :type="record.type"
      ></RecordCard>
    </div>
    <CreateEntityForm
      v-model="entityType"
      :entity-types="entityTypes"
      :loading="loading"
      @click-create="sendForm"
    ></CreateEntityForm>
  </div>
</template>

<style scoped>
.create-entity-module {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
}

.result-view {
  position: absolute;
  left: 50%;
  top: 2rem;
  height: 12rem;
  width: 15rem;
  transform: translateX(-50%);
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
  overflow-y: auto;
}
</style>