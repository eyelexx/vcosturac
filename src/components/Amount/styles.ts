import { styled } from 'styled-components'
import { colors } from '@/styles/GlobalStyles'

export const AmountField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    padding: 0 0.5em;
    font-size: 1em;
    cursor: pointer;
    user-select: none;
    border-radius: 0.25em;

    &:hover {
      background-color: ${colors.marromEscuro};
    }

    &:active {
      transform: scale(1.1);
    }
  }

  &:focus-visible {
    outline: none;
  }

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    width: 2em;
    font-size: 1em;
    font-weight: bold;
    text-align: center;
    border: none;
    outline: none;
    appearance: textfield;
    background-color: ${colors.marromClaro};
    color: ${colors.creme};
  }
`
