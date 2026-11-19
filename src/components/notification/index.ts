import { createApp, reactive } from 'vue'
import NotificationHost from './NotificationHost.vue'

export type NotificationType = 'success' | 'warning' | 'error'

export interface NotificationOptions {
  type: NotificationType
  message: string
  title?: string
  duration?: number
}

export interface NotificationItem {
  id: number
  type: NotificationType
  title: string
  message: string
}

const defaultTitles: Record<NotificationType, string> = {
  success: '成功',
  warning: '警告',
  error: '错误',
}

const items = reactive<NotificationItem[]>([])
const timers = new Map<number, ReturnType<typeof setTimeout>>()
let nextId = 0
let host: HTMLElement | null = null

function closeNotification(id: number) {
  const timer = timers.get(id)
  if (timer) {
    clearTimeout(timer)
    timers.delete(id)
  }

  const index = items.findIndex(item => item.id === id)
  if (index !== -1) items.splice(index, 1)
}

function ensureHost() {
  if (host) return

  host = document.createElement('div')
  document.body.appendChild(host)
  createApp(NotificationHost, { items, onClose: closeNotification }).mount(host)
}

export function notify({ type, title, message, duration = 4500 }: NotificationOptions) {
  ensureHost()

  const id = ++nextId
  items.push({ id, type, title: title ?? defaultTitles[type], message })

  if (duration > 0) {
    timers.set(id, setTimeout(() => closeNotification(id), duration))
  }

  return { close: () => closeNotification(id) }
}
