import { createRouter, createWebHistory } from 'vue-router';
import Homepage from "../view/homepage.vue";

const routes = [
    {
        path: '/',
        name: 'Homepage',
        component: Homepage
    }
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// 导出
export default router