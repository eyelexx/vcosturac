import { colors } from "@/styles/GlobalStyles";
import styled from "styled-components";

export const HeaderContainer = styled.section`
  display: flex;
  justify-content: center;
  padding: 1em;
  width: 100%;
  position: fixed;
  z-index: 2;
  box-shadow: 0px 3px 10px 0px rgba(88, 88, 88, 0.28);

  background-color: ${colors.mostarda};
  `

export const Content = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
width: 100%;
max-width: 1440px;
`

export const Menu = styled.nav`
  display: flex;
  flex-direction: row;

  height: auto ;
  padding: 1em;

  ul {
    display: flex;
    flex-direction: row;
    gap: 2em;
    width: fit-content;
  }

  li {
    padding: 0.5em;
    color: ${colors.preto};
  }
`

export const LogoContainer = styled.div`
  height: 4em;
  width: 4em;

  background-image: url("https://placehold.co/64x64") ;
`

export const Carrinho = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
  gap: 1em;
  border-radius: 2em;
  cursor: pointer;
  background-color: ${colors.salmao};
  color: ${colors.creme};
  position: relative;

  span {
    display: inline-block;
    vertical-align: middle;
    font-size: 9px;
    font-weight: 400;
    color: #fff;
    border-radius: 100%;
    width: 17px;
    text-align: center;
    height: 17px;
    line-height: 17px;
    position: absolute;
    right: 9px;
    top: 8px;
    padding: 0 1px;
    background: #914c36;
  }

  &:hover {
    box-shadow: 0px 0px 10px 10px rgb(249 249 249 / 25%);
        transition: 0.3s ease;
        transform: scale(1.05);

  }
`