import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { CANVAS_TEMPLATES_PER_PAGE } from '@/constants'

export const useCanvasTemplateStore = defineStore('canvasTemplate', () => {
  const list = ref([])
  const page = ref(1)
  const isListLoading = ref(false)

  const isLastPage = computed(() => {
    return list.value.length < page.value * CANVAS_TEMPLATES_PER_PAGE
  })

  function setList(canvasTemplateList) {
    list.value = canvasTemplateList
  }

  function setPage() {
    page.value += 1
  }

  function setIsListLoading(isLoading) {
    isListLoading.value = isLoading
  }

  return { list, page, isListLoading, isLastPage, setList, setPage, setIsListLoading }
})
