export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  if (!config.stripeSecretKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Stripe secret key is not configured.',
    })
  }

  try {
    const body = await readBody<{ amount?: number }>(event)
    const amount = body?.amount

    if (!Number.isInteger(amount) || amount <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Amount must be a positive integer in cents.',
      })
    }

    const { default: Stripe } = await import('stripe')
    const stripe = new Stripe(config.stripeSecretKey)
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    })

    if (!paymentIntent.client_secret) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Stripe did not return a client secret.',
      })
    }

    return {
      clientSecret: paymentIntent.client_secret,
    }
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage:
        error instanceof Error ? error.message : 'Unable to create payment intent.',
    })
  }
})
