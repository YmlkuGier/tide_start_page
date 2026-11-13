<script setup lang="ts">
import {onUnmounted, ref, watch} from "vue";
import type {PropType} from "vue";
import {TabRepository} from "@/database/tab.ts";

const props = defineProps({
  id: Number,
  icon: Blob,
  name: String,
  url: String,
  tabHotkey: String,
  mode: {
    type: String as PropType<'add' | 'update'>,
    default: 'update',
  },
})

const iconUrl = ref('')

const icon = ref<Blob | undefined>(props.icon)
const name = ref(props.name ?? '')
const url = ref(props.url ?? '')
const tabHotKey = ref(props.tabHotkey ?? '')

const addTab = async () => {
  let iconBlob: Blob | null = null
  try {
    const response = await fetch(`/ico/get.php?url=${url.value}`)
    if (response.ok) {
      const fetchedIcon = await response.blob()
      if (fetchedIcon.type.startsWith('image/') && fetchedIcon.size > 0) {
        iconBlob = fetchedIcon
      }
    }
  } catch {
    iconBlob = null
  }

  await TabRepository.add(name.value, url.value, tabHotKey.value, iconBlob)

  window.location.reload()
}

const updateTab = async () => {
  if (props.id === undefined) return

  await TabRepository.updateTabById(
      props.id,
      name.value,
      url.value,
      tabHotKey.value,
      icon.value ?? null,
  )

  console.log(url.value)
}

watch(
    [() => props.icon, () => props.url, () => props.tabHotkey, () => props.name],
    ([iconVal, urlVal, hotkeyVal, nameVal]) => {
      icon.value = iconVal
      url.value = urlVal ?? ''
      tabHotKey.value = hotkeyVal ?? ''
      name.value = nameVal ?? ''
    }
)

watch(icon, (value) => {
  if (iconUrl.value) {
    URL.revokeObjectURL(iconUrl.value)
  }
  iconUrl.value = value ? URL.createObjectURL(value) : ''
}, {immediate: true})

onUnmounted(() => {
  if (iconUrl.value) {
    URL.revokeObjectURL(iconUrl.value)
  }
})
</script>

<template>
  <div class="tab-form-wrap">
    <div class="tab-details">
      <div class="tab-icon" aria-hidden="true">
        <img :src="iconUrl" alt="" v-show="iconUrl" style="width: 30px; height: 30px;" />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-show="!iconUrl">
          <circle cx="12" cy="12" r="9"/>
          <ellipse cx="12" cy="12" rx="4" ry="9"/>
          <path d="M3 12h18"/>
        </svg>
      </div>
      <label class="tab-url">
        <span class="field-label">书签名</span>
        <input v-model="name" type="text" name="name" placeholder="请输入书签名" required />
      </label>
    </div>

    <label class="tab-url tab-name">
      <span class="field-label">网站地址</span>
      <input v-model="url" type="url" placeholder="https://example.com" autocomplete="url" required />
    </label>

    <div class="tab-footer">
      <label class="tab-hotkey">
        <span>快捷键</span>
        <input v-model="tabHotKey" class="key-combination" type="text" name="hotkey" autocomplete="off"/>
      </label>
      <div class="tab-actions">
        <button v-if="props.mode === 'update'" class="button button-delete" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7m4-7v7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          删除
        </button>
        <button class="button button-update" @click="props.mode === 'add' ? addTab() : updateTab()">
          {{ props.mode === 'add' ? '添加书签' : '更新书签' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab-form-wrap {
  box-sizing: border-box;
  width: 100%;
  padding: 24px;
  border: 1px solid var(--color-settings-border);
  border-radius: 18px;
  background: var(--color-settings-form-bg);
  color: var(--color-settings-form-title);
}

.tab-details {
  display: flex;
  align-items: center;
  gap: 16px;
}

.tab-icon {
  display: grid;
  place-items: center;
  flex: 0 0 52px;
  height: 52px;
  border: 1px solid #b9e8dd1a;
  border-radius: 14px;
  background: #b9e8dd0d;
  color: var(--color-settings-accent);
}

.tab-icon svg {
  width: 26px;
  height: 26px;
}

.tab-url {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 8px;
}

.tab-name {
  margin-top: 16px;
}

.field-label {
  color: var(--color-settings-form-content);
  font-size: 12px;
}

.tab-url input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  padding: 11px 13px;
  border: 1px solid var(--color-settings-border);
  border-radius: 9px;
  outline: none;
  background: var(--color-settings-bg);
  color: var(--color-settings-form-title);
  font: inherit;
  font-size: 14px;
  transition: border-color .2s, box-shadow .2s;
}

.tab-url input::placeholder {
  color: var(--color-settings-muted);
}

.tab-url input:focus {
  border-color: var(--color-settings-accent);
  box-shadow: 0 0 0 3px #b9e8dd12;
}

.tab-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--color-settings-border);
}

.tab-hotkey,
.tab-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tab-hotkey {
  color: var(--color-settings-muted);
  font-size: 12px;
}

.key-combination {
  width: 100px;
  min-width: 0;
  padding: 4px 6px;
  box-sizing: border-box;
  border: 1px solid #ffffff12;
  border-bottom-width: 2px;
  border-radius: 5px;
  outline: none;
  background: var(--color-settings-menu-elevated);
  color: var(--color-settings-form-content);
  font: 11px / 1.2 ui-monospace, monospace;
  text-align: center;
}

.key-combination:focus {
  border-color: var(--color-settings-accent);
  box-shadow: 0 0 0 3px #b9e8dd12;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 36px;
  padding: 8px 14px;
  border: 1px solid transparent;
  border-radius: 8px;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  transition: background .2s, border-color .2s;
}

.button svg {
  width: 15px;
  height: 15px;
}

.button-delete {
  background: transparent;
  color: var(--color-settings-form-content);
}

.button-delete:hover {
  border-color: #f0a5a326;
  background: #f0a5a30d;
  color: #f0a5a3;
}

.button-update {
  background: var(--color-settings-accent);
  color: var(--color-settings-bg);
  font-weight: 600;
}

.button-update:hover {
  background: #d5f2e9;
}

.button:focus-visible {
  outline: 2px solid var(--color-settings-accent);
  outline-offset: 3px;
}

@media (max-width: 440px) {
  .tab-form-wrap {
    padding: 20px;
  }

  .tab-details {
    gap: 12px;
  }

  .tab-icon {
    flex-basis: 44px;
    height: 44px;
    border-radius: 12px;
  }

  .tab-footer {
    align-items: stretch;
    flex-direction: column;
    gap: 16px;
  }

  .tab-actions .button {
    flex: 1;
  }
}
</style>
