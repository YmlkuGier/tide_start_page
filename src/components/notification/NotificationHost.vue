<script setup lang="ts">
import type { NotificationItem } from './index'
import errorIcon from '@/assets/svg/notification/error.svg?url'
import successIcon from '@/assets/svg/notification/success.svg?url'
import warningIcon from '@/assets/svg/notification/warning.svg?url'

defineProps<{ items: NotificationItem[] }>()

const emit = defineEmits<{ close: [id: number] }>()

const icons = {
  success: successIcon,
  warning: warningIcon,
  error: errorIcon,
}
</script>

<template>
  <div class="notification-layer">
    <TransitionGroup name="notification" tag="div" class="notification-stack">
      <section
        v-for="item in items"
        :key="item.id"
        class="notification-card"
        :class="`notification-card--${item.type}`"
        :role="item.type === 'success' ? 'status' : 'alert'"
      >
        <img class="notification-icon" :src="icons[item.type]" alt="" aria-hidden="true" />
        <div class="notification-content">
          <h3 class="notification-title">{{ item.title }}</h3>
          <p class="notification-message">{{ item.message }}</p>
        </div>
        <button
          class="notification-close"
          type="button"
          aria-label="关闭通知"
          @click="emit('close', item.id)"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </section>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notification-layer {
  position: fixed;
  z-index: 2000;
  top: 20px;
  right: 20px;
  width: min(360px, calc(100vw - 32px));
  pointer-events: none;
}

.notification-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.notification-card {
  --notification-accent: var(--color-notification-success);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  box-sizing: border-box;
  width: 100%;
  padding: 15px 14px;
  border: 1px solid var(--color-notification-border);
  border-left: 3px solid var(--notification-accent);
  border-radius: 12px;
  background: var(--color-notification-bg);
  box-shadow: 0 10px 30px var(--color-notification-shadow);
  pointer-events: auto;
}

.notification-card--warning {
  --notification-accent: var(--color-notification-warning);
}

.notification-card--error {
  --notification-accent: var(--color-notification-error);
}

.notification-icon {
  flex: 0 0 22px;
  width: 22px;
  height: 22px;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  margin: 0;
  color: var(--color-notification-title);
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
}

.notification-message {
  margin: 4px 0 0;
  color: var(--color-notification-text);
  font-size: 13px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.notification-close {
  display: grid;
  flex: 0 0 24px;
  place-items: center;
  width: 24px;
  height: 24px;
  margin: -2px -4px 0 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-notification-close);
  cursor: pointer;
}

.notification-close:hover,
.notification-close:focus-visible {
  color: var(--color-notification-title);
}

.notification-close svg {
  width: 16px;
  height: 16px;
}

.notification-enter-active,
.notification-leave-active,
.notification-move {
  transition: opacity 220ms ease, transform 220ms ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(24px);
}

.notification-leave-active {
  position: absolute;
}

@media (max-width: 480px) {
  .notification-layer {
    top: 12px;
    right: 12px;
    width: calc(100vw - 24px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .notification-enter-active,
  .notification-leave-active,
  .notification-move {
    transition: none;
  }
}
</style>
