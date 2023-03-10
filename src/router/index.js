import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: '/',
        name: "home",
        component: () => import('../pages/home.vue')
    },
    {
        path: '/lesson',
        name: "lesson",
        component: () => import('../pages/Lesson.vue')
    },
    {
        path: '/healthy',
        name: "healthy",
        component: () => import('../pages/healthy.vue')
    },
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router