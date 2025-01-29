<script setup lang='ts'>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import CheckMarkIcon from '../icons/CheckMarkIcon.vue';
import DropdownArrowIcon from '../icons/DropdownArrowIcon.vue';

const { options } = defineProps<{ options: string[] | readonly string[] }>()
const model = defineModel({ type: String, required: true })

const open = ref(false)
const dropdown = ref<HTMLDivElement>()
const select = ref<HTMLSelectElement>()

function closeDropdown(event: MouseEvent) {
  if ((event.target as HTMLElement) !== select.value) {
    open.value = false
  }
}

onMounted(() => {
  addEventListener('click', closeDropdown)
})

onBeforeUnmount(() => {
  removeEventListener('click', closeDropdown)
})
</script>

<template>
  <div
    ref="select"
    class="input-select"
    @click="open = true"
  >
    <span>{{ model }}</span>
    <div class="dropdown-arrow-icon">
      <DropdownArrowIcon></DropdownArrowIcon>
    </div>
    <div
      v-if="open"
      ref="dropdown"
      class="dropdown-options"
    >
      <div
        v-for="[key, option] in options.entries()"
        :key="key"
        :class="{ active: option === model }"
        class="option"
        @click="model = option"
      >
        <div class="check-mark-icon">
          <CheckMarkIcon v-if="option === model"></CheckMarkIcon>
        </div>
        <span>{{ option }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-select {
  position: relative;
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: .3rem .4rem;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: var(--text);

  span,
  .dropdown-arrow-icon {
    pointer-events: none;
  }
}

.input-select:hover:not(:has(.dropdown-options)) {
  background-color: var(--bg-darker-0);
}

.dropdown-options {
  box-sizing: border-box;
  position: absolute;
  top: calc(100% + 2px);
  left: -1px;
  width: calc(100% + 2px);
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 3px;
}

.option {
  padding: .4rem .4rem;
  display: flex;
  flex-flow: row;
  gap: .4rem;
}

.option:hover,
.option.active {
  background-color: var(--bg-darker-0);
  cursor: pointer;
}

.check-mark-icon,
.dropdown-arrow-icon {
  width: .8rem;
  height: .8rem;
  display: grid;
}
</style>