<script setup lang='ts'>
import DefaultButton from '../elements/DefaultButton.vue';
import DefaultPreloader from '../elements/DefaultPreloader.vue';
import InputSelect from '../elements/InputSelect.vue';

const { entityTypes, loading = false } = defineProps<{
  entityTypes: string[] | readonly string[],
  loading?: boolean
}>()
const model = defineModel({ type: String, required: true })
const emit = defineEmits<{(ev: 'click-create'): void}>()

function onClickCreate() {
  emit('click-create')
}

</script>

<template>
  <form
    @submit.prevent
    class="create-entity-form"
  >
    <InputSelect
      v-model="model"
      :options="entityTypes"
    ></InputSelect>
    <div class="buttons-container">
      <div
        v-if="loading"
        class="preloader"
      >
        <DefaultPreloader></DefaultPreloader>
      </div>
      <DefaultButton
        v-else
        @click="onClickCreate"
        :disabled="model === entityTypes[0]"
      >Создать</DefaultButton>
    </div>
  </form>
</template>

<style scoped>
.create-entity-form {
  width: fit-content;
  padding: 1rem;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 2rem;
}

.input-select {
  width: 20rem;
}

.buttons-container {
  display: flex;
  flex-flow: row;
  justify-content: end;
}

.preloader {
  height: 100%;
  width: 33px;
  background-color: var(--accent);
  border-radius: 3px;
  display: grid;
  place-content: center;

  .default-preloader {
    border-top-color: var(--text-light);
    border-right-color: var(--text-light);
  }
}
</style>