import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore('App', () => {
  const entities = ref<API.Record[]>([])

  return {
    entities
  }
})