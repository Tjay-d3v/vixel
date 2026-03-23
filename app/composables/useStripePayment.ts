import { loadStripe, type Stripe, type StripeCardElement, type StripeElements } from '@stripe/stripe-js'

interface BillingDetails {
  email: string
  name: string
}

interface PayOptions {
  amount: number
  billingDetails: BillingDetails
}

export function useStripePayment() {
  const config = useRuntimeConfig()
  const stripe = shallowRef<Stripe | null>(null)
  const elements = shallowRef<StripeElements | null>(null)
  const cardElement = shallowRef<StripeCardElement | null>(null)

  const isInitializing = ref(false)
  const isProcessing = ref(false)
  const errorMessage = ref('')
  const successMessage = ref('')

  const isReady = computed(() => Boolean(stripe.value && cardElement.value))

  const initialize = async () => {
    if (!import.meta.client || isReady.value || isInitializing.value) {
      return
    }

    errorMessage.value = ''
    successMessage.value = ''

    if (!config.public.stripePublishableKey) {
      errorMessage.value = 'Stripe publishable key is not configured.'
      return
    }

    isInitializing.value = true

    try {
      const stripeInstance = await loadStripe(config.public.stripePublishableKey)

      if (!stripeInstance) {
        throw new Error('Unable to initialize Stripe.')
      }

      if (!document.querySelector('#card-element')) {
        throw new Error('Card element container was not found.')
      }

      stripe.value = stripeInstance
      elements.value = stripeInstance.elements()
      cardElement.value = elements.value.create('card', {
        hidePostalCode: true,
        style: {
          base: {
            color: '#111827',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSize: '16px',
            '::placeholder': {
              color: '#9ca3af',
            },
          },
          invalid: {
            color: '#dc2626',
          },
        },
      })

      cardElement.value.on('change', ({ error }) => {
        errorMessage.value = error?.message || ''
      })

      cardElement.value.mount('#card-element')
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Unable to load Stripe.'
    } finally {
      isInitializing.value = false
    }
  }

  const destroy = () => {
    cardElement.value?.destroy()
    cardElement.value = null
    elements.value = null
    stripe.value = null
  }

  const pay = async ({ amount, billingDetails }: PayOptions) => {
    errorMessage.value = ''
    successMessage.value = ''

    if (!isReady.value || !stripe.value || !cardElement.value) {
      errorMessage.value = 'Payment form is still loading.'
      return false
    }

    if (!Number.isInteger(amount) || amount <= 0) {
      errorMessage.value = 'Payment amount must be greater than zero.'
      return false
    }

    isProcessing.value = true

    try {
      const response = await $fetch<{ clientSecret: string }>('/api/create-payment-intent', {
        method: 'POST',
        body: { amount },
      })

      const { error, paymentIntent } = await stripe.value.confirmCardPayment(
        response.clientSecret,
        {
          payment_method: {
            card: cardElement.value,
            billing_details: {
              email: billingDetails.email,
              name: billingDetails.name,
            },
          },
        },
      )

      if (error) {
        throw new Error(error.message || 'Payment failed.')
      }

      if (paymentIntent?.status !== 'succeeded') {
        throw new Error('Payment could not be completed.')
      }

      successMessage.value = 'Payment successful. Test order created.'
      return true
    } catch (error: any) {
      errorMessage.value =
        error?.data?.statusMessage ||
        error?.message ||
        'Unable to process payment.'

      return false
    } finally {
      isProcessing.value = false
    }
  }

  return {
    destroy,
    errorMessage,
    initialize,
    isInitializing,
    isProcessing,
    isReady,
    pay,
    successMessage,
  }
}
