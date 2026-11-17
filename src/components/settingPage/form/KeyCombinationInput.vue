<script setup lang="ts">
defineOptions({inheritAttrs: false})

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const modifierKeys = new Set(['Control', 'Alt', 'Shift', 'Meta'])

const keyLabels: Record<string, string> = {
  ' ': 'Space',
  Escape: 'Esc',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  ArrowUp: 'ArrowUp',
  Backquote: 'Backquote',
  Backspace: 'Backspace',
  Delete: 'Delete',
  Enter: 'Enter',
  Insert: 'Insert',
  PageDown: 'PageDown',
  PageUp: 'PageUp',
  Tab: 'Tab',
  '+': 'Plus',
  '-': 'Minus',
  '=': 'Equal',
  ',': 'Comma',
  '.': 'Period',
  '/': 'Slash',
  '\\': 'Backslash',
  ';': 'Semicolon',
  "'": 'Quote',
  '[': 'BracketLeft',
  ']': 'BracketRight',
}

const formatKey = (key: string) => {
  if (keyLabels[key]) return keyLabels[key]
  if (key.length === 1) return key.toUpperCase()
  return key
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.isComposing || event.repeat) return

  event.preventDefault()

  if (event.key === 'Escape' || event.key === 'Backspace' || event.key === 'Delete') {
    emit('update:modelValue', '')
    return
  }

  if (modifierKeys.has(event.key)) return

  const modifiers: string[] = []
  if (event.ctrlKey) modifiers.push('Ctrl')
  if (event.altKey) modifiers.push('Alt')
  if (event.shiftKey) modifiers.push('Shift')
  if (event.metaKey) modifiers.push('Meta')

  const key = formatKey(event.key)
  if (!key) return

  emit('update:modelValue', [...modifiers, key].join('+'))
}
</script>

<template>
  <input
      v-bind="$attrs"
      :value="props.modelValue"
      type="text"
      readonly
      role="textbox"
      @keydown="handleKeydown"
  />
</template>
