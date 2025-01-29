<script setup lang='ts'>
const { disabled = false } = defineProps<{ disabled?: boolean }>()
</script>

<template>
  <button
    class="default-button"
    :class="{ disabled }"
  >
    <slot>Button</slot>
  </button>
</template>

<style scoped>
.default-button {
  padding: .3rem .7rem;
  background-color: var(--accent);
  border: 1px solid var(--accent);
  color: var(--text-light);
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
}

.default-button:not(.disabled):hover {
  background-color: var(--accent-darker-0);
  border-color: var(--accent-darker-0);
}

.default-button:not(.disabled):active {
  background-color: var(--accent-darker-1);
  border-color: var(--accent-darker-1);
}

.default-button.disabled {
  background-color: var(--bg-darker-0);
  border-color: var(--border);
  color: var(--text);
  cursor: not-allowed;
}
</style>