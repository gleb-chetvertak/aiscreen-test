<script setup>
import { onMounted } from 'vue'
import { getCanvasTemplate } from '@/services/canvasTemplate'
import { useCanvasTemplateStore } from '@/stores/canvasTemplate'
import BaseLoader from '@/components/base/BaseLoader.vue'
import BaseNoResult from '@/components/base/BaseNoResult.vue'
import TheCanvasTemplatesList from '@/components/the/CanvasTemplatesList.vue'

// REGION: store
const canvasTemplateStore = useCanvasTemplateStore()
// ENDREGION

// REGION: methods
const loadCanvasTemplates = async () => {
  canvasTemplateStore.setIsListLoading(true)

  try {
    const response = await getCanvasTemplate()
    canvasTemplateStore.setList(response.data)
  } catch (error) {
    console.error('Error loading canvas templates:', error)
  } finally {
    canvasTemplateStore.setIsListLoading(false)
  }
}

const handleShowMore = async () => {
  canvasTemplateStore.setIsListLoading(true)

  try {
    const page = canvasTemplateStore.page + 1
    const response = await getCanvasTemplate({ page })
    canvasTemplateStore.setList([...canvasTemplateStore.list, ...response.data])
    canvasTemplateStore.setPage(page)
  } catch (error) {
    console.error('Error loading canvas templates:', error)
  } finally {
    canvasTemplateStore.setIsListLoading(false)
  }
}

const handleDelete = async (id) => {
  // canvasTemplateStore.setIsListLoading(true)
  // try {
  //   await canvasTemplateStore.deleteCanvasTemplate(id)
  //   canvasTemplateStore.setList(canvasTemplateStore.list.filter(item => item.id !== id))
  // } catch (error) {
  //   console.error('Error deleting canvas template:', error)
  // } finally {
  //   canvasTemplateStore.setIsListLoading(false)
  // }
}
// ENDREGION

// REGION: mounted
onMounted(() => {
  loadCanvasTemplates()
})
// ENDREGION
</script>

<template>
  <main class="bg-gray-50 dark:bg-gray-900 pt-10 min-h-screen flex flex-col">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0 text-center">
      <h1 class="text-white text-xl font-medium">Canvas Templates</h1>
    </div>

    <TheCanvasTemplatesList
      v-if="canvasTemplateStore.list.length"
      :list="canvasTemplateStore.list"
      @show-more="handleShowMore"
    />

    <BaseLoader v-else-if="canvasTemplateStore.isListLoading" text-classes="text-white" />

    <BaseNoResult v-else text-classes="text-white">No templates found.</BaseNoResult>
  </main>
</template>
