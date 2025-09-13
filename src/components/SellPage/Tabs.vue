<template>
    <div class="">
      <!-- Lista de Tabs -->
      <div
        class="flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full"
      >
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="[
            'inline-flex w-1/4 items-center justify-center whitespace-nowrap rounded-sm px-5 py-2.5 text-sm font-medium transition-all',
            activeTab === tab.value
              ? 'bg-white text-foreground shadow-sm'
              : 'bg-background text-muted-foreground',
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Conteúdo -->
      <div class="mt-2">
        <slot :name="activeTab"></slot>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue"

const props = defineProps<{
  tabs: { label: string; value: string }[]
  defaultValue?: string
}>()

const activeTab = ref(props.defaultValue || props.tabs[0].value)
</script>

<style scoped>
.bg-background{
  background-color: #f3f4f6;
}
</style>
