import { AppDispatch } from '@/store' // Tipo do dispatch
import { updateQuantity, removeItemFromCart } from '@/store/reducers/cartSlice'

export const handleQuantityChange = (
  dispatch: AppDispatch,
  cartItems: CartItem[],
  id: string,
  selectedPrint: string,
  increment: boolean
) => {
  if (!dispatch) {
    throw new Error('Dispatch is undefined')
  }

  if (!cartItems) {
    throw new Error('Cart items are undefined or null')
  }

  const produto = cartItems.find(
    (item) => item.id === id && item.selectedPrint === selectedPrint
  )
  if (produto) {
    const newQuantity = increment
      ? produto.quantity + 1
      : Math.max(1, produto.quantity - 1)
    dispatch(updateQuantity({ id, selectedPrint, quantity: newQuantity }))
  }
}

export const removeItem = (
  dispatch: AppDispatch,
  id: string,
  selectedPrint: string
) => {
  if (!dispatch) {
    throw new Error('Dispatch is undefined')
  }

  dispatch(removeItemFromCart({ id, selectedPrint }))
}

export const calculateTotalPrice = (
  cartItems: Array<{ price?: number; quantity: number }>
) => {
  if (!cartItems) {
    throw new Error('Cart items are undefined or null')
  }

  return cartItems.reduce((acc, product) => {
    const price = product.price ?? 0
    const quantity = product.quantity
    if (typeof price !== 'number' || typeof quantity !== 'number') {
      throw new Error('Invalid price or quantity')
    }
    return acc + price * quantity
  }, 0)
}
