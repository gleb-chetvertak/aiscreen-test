import { createRouter, createWebHistory } from 'vue-router'
import authMiddleware from '@/middlewares/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        middleware: [authMiddleware],
      },
    },
    // {
    //   path: `/canvas-templates/:id`,
    //   name: 'canvasTemplateDetails',
    //   component: () => import('../views/CanvasTemplateDetailsView.vue'),
    //   meta: {
    //     middleware: [authMiddleware],
    //   },
    // },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
      meta: {
        middleware: [authMiddleware],
      },
    },
  ],
})

function nextFactory(context, middleware, index) {
  const nextMiddleware = middleware[index]

  if (!nextMiddleware) {
    return context.next
  }
  const subsequentMiddleware = nextFactory(context, middleware, index + 1)
  return nextMiddleware({ ...context, next: subsequentMiddleware })
}

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }

  const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]
  const context = {
    to,
    from,
    next,
    router,
  }

  return middleware[0]({ ...context, next: nextFactory(context, middleware, 1) })
})

export default router
