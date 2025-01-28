import Stripe from 'stripe'

// Configuração do Stripe usando a chave secreta do ambiente
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia', // Use a versão que você tem configurada
})

export default stripe
