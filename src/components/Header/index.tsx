'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCart } from '../../store/reducers/cartSlice'
import { RootState } from '@/store'
import { calculateTotalQuantity } from '@/utils/cartUtils'

import {
  Carrinho,
  CartLength,
  Content,
  HeaderContainer,
  LogoLink,
  Logotipo,
  Menu,
} from './styles'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { cartItems } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  const totalQuantity = calculateTotalQuantity(cartItems)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <HeaderContainer pageIsScrolled={isScrolled}>
      <Content>
        <LogoLink href="/">
          <Logotipo
            headerIsShort={isScrolled}
            width={100}
            height={100}
            alt="Logotipo"
            src={
              'https://scontent.fsdu38-1.fna.fbcdn.net/v/t1.6435-9/193505118_1427263510942311_2923371183308691794_n.png?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=TKIXs6nFDzkQ7kNvgHwk0Sh&_nc_zt=23&_nc_ht=scontent.fsdu38-1.fna&_nc_gid=AKxcccDnjCPsyrSqiBGC4fT&oh=00_AYCj7qhYvapH23t8W6iTJiLLtXWXutxwzqBuTfWPGaaG8Q&oe=67844DD5'
            }
          />
        </LogoLink>
        <Menu>
          <ul>
            <li>
              <Link href="/loja">Loja</Link>
            </li>
            <li>
              <Link href="/galeria">Galeria</Link>
            </li>
            <li>
              <Link href="/contato">Contato</Link>
            </li>
          </ul>
        </Menu>
        <Carrinho onClick={() => dispatch(toggleCart())}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M8 16H15.2632C19.7508 16 20.4333 13.1808 21.261 9.06908C21.4998 7.88311 21.6192 7.29013 21.3321 6.89507C21.045 6.5 20.4947 6.5 19.3941 6.5H6"
              stroke="#f7f9ec"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
            <path
              d="M8 16L5.37873 3.51493C5.15615 2.62459 4.35618 2 3.43845 2H2.5"
              stroke="#f7f9ec"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
            <path
              d="M8.88 16H8.46857C7.10522 16 6 17.1513 6 18.5714C6 18.8081 6.1842 19 6.41143 19H17.5"
              stroke="#f7f9ec"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M10.5 22C11.3284 22 12 21.3284 12 20.5C12 19.6716 11.3284 19 10.5 19C9.67157 19 9 19.6716 9 20.5C9 21.3284 9.67157 22 10.5 22Z"
              stroke="#f7f9ec"
              strokeWidth="1.5"
            ></path>
            <path
              d="M17.5 22C18.3284 22 19 21.3284 19 20.5C19 19.6716 18.3284 19 17.5 19C16.6716 19 16 19.6716 16 20.5C16 21.3284 16.6716 22 17.5 22Z"
              stroke="#f7f9ec"
              strokeWidth="1.5"
            ></path>
          </svg>
          <CartLength>{totalQuantity}</CartLength>
        </Carrinho>
      </Content>
    </HeaderContainer>
  )
}

export default Header
