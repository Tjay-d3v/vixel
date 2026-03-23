import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to) => {
  const { fetchUser, isAuthenticated } = useAuth()

  await fetchUser()

  if (isAuthenticated.value) {
    return
  }

  return navigateTo({
    path: '/login',
    query: { redirect: to.fullPath },
  })
})
