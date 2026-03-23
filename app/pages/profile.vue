<script setup lang="ts">
const router = useRouter()
const supabase = useSupabaseClient()
const { user, isAuthenticated, userProfile } = useAuth()

const isSaving = ref(false)
const saveMessage = ref('')
const errorMessage = ref('')
const isEditing = ref(false)

const form = reactive({
  full_name: '',
  email: '',
})

onMounted(async () => {
  // Redirect to login if not authenticated
  if (!isAuthenticated.value) {
    await navigateTo('/login')
    return
  }

  // Load profile data
  if (userProfile.value) {
    form.full_name = userProfile.value.full_name || ''
  }
  if (user.value) {
    form.email = user.value.email || ''
  }
})

const handleSave = async () => {
  if (!user.value) return

  if (!form.full_name.trim()) {
    errorMessage.value = 'Name is required'
    return
  }

  isSaving.value = true
  errorMessage.value = ''
  saveMessage.value = ''

  try {
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: form.full_name })
      .eq('id', user.value.id)

    if (error) throw error

    saveMessage.value = 'Profile saved successfully!'
    isEditing.value = false
    setTimeout(() => (saveMessage.value = ''), 3000)
  } catch (err) {
    console.error('[Profile] Error saving:', err)
    errorMessage.value = err instanceof Error ? err.message : 'Failed to save profile'
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-240px)] bg-gradient-to-b from-slate-50 to-white">
    <div class="mx-auto w-[min(1200px,calc(100%-2rem))] py-12">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-black text-slate-950">Profile Settings</h1>
        <p class="mt-2 text-slate-600">Manage your account information</p>
      </div>

      <!-- Main Content -->
      <div class="flex gap-8">
        <!-- Sidebar -->
        <div class="hidden w-64 flex-shrink-0 md:block">
          <nav class="space-y-2">
            <div class="rounded-lg bg-orange-100 px-4 py-3 text-sm font-semibold text-slate-950">
              Account Settings
            </div>
            <NuxtLink
              to="/logout"
              class="block rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Logout
            </NuxtLink>
          </nav>
        </div>

        <!-- Main Panel -->
        <div class="flex-1">
          <!-- Profile Card -->
          <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <!-- Header -->
            <div class="mb-8 flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-black text-slate-950">Account Details</h2>
                <p class="text-sm text-slate-600">
                  {{ isEditing ? 'Make changes to your profile' : 'Your account information' }}
                </p>
              </div>
              <button
                v-if="!isEditing"
                class="btn-secondary"
                @click="isEditing = true"
              >
                Edit Profile
              </button>
            </div>

            <!-- Messages -->
            <Transition name="fade">
              <div v-if="saveMessage" class="mb-6 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                ✓ {{ saveMessage }}
              </div>
            </Transition>

            <Transition name="fade">
              <div v-if="errorMessage" class="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {{ errorMessage }}
              </div>
            </Transition>

            <!-- Profile Form -->
            <div class="space-y-6">
              <!-- Name Field -->
              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
                <input
                  v-model="form.full_name"
                  :disabled="!isEditing"
                  type="text"
                  class="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 transition disabled:bg-slate-50 disabled:text-slate-600"
                  :class="{ 'border-orange-200 focus:ring-2 focus:ring-orange-100': isEditing }"
                />
              </div>

              <!-- Email Field (Read-only) -->
              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">Email Address</label>
                <input
                  :value="form.email"
                  disabled
                  type="email"
                  class="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-600"
                />
                <p class="mt-2 text-xs text-slate-500">
                  Your email cannot be changed. Contact support if you need assistance.
                </p>
              </div>

              <!-- Action Buttons -->
              <div v-if="isEditing" class="flex gap-3 pt-6">
                <button
                  class="btn-primary flex-1"
                  :disabled="isSaving"
                  @click="handleSave"
                >
                  {{ isSaving ? 'Saving...' : 'Save Changes' }}
                </button>
                <button
                  class="btn-secondary flex-1"
                  :disabled="isSaving"
                  @click="isEditing = false"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <!-- Account Info Card -->
          <div class="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h3 class="mb-4 text-lg font-black text-slate-950">Account Information</h3>
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Joined</p>
                <p class="mt-1 text-sm font-semibold text-slate-900">
                  {{ userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString() : '—' }}
                </p>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Last Updated</p>
                <p class="mt-1 text-sm font-semibold text-slate-900">
                  {{ userProfile?.updated_at ? new Date(userProfile.updated_at).toLocaleDateString() : '—' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
