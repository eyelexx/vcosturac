import { AmountField } from './styles'
import PropTypes from 'prop-types'

interface AmountProps {
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
  onQuantityChange?: (value: number) => void
  isCheckout?: boolean
}

const Amount: React.FC<AmountProps> = ({
  quantity,
  onDecrement,
  onIncrement,
  onQuantityChange,
  isCheckout = false,
}) => {
  return (
    <AmountField isCheckout={isCheckout}>
      <span
        onClick={onDecrement}
        title="Remover um item"
        aria-label="Remover um item"
      >
        -
      </span>
      <input
        type="number"
        value={quantity}
        min={1}
        step={1}
        onChange={(e) => onQuantityChange?.(Number(e.target.value))}
      />
      <span
        onClick={onIncrement}
        title="Adicionar um item"
        aria-label="Adicionar um item"
      >
        +
      </span>
    </AmountField>
  )
}

Amount.propTypes = {
  quantity: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func,
  isCheckout: PropTypes.bool,
}

export default Amount
