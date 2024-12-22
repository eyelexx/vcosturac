import { colors } from "@/styles/GlobalStyles";
import Link from "next/link";
import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.preto};
  opacity: 0.7;
`

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: 1;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0s 0.3s;

  &.is-open {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s ease-in-out
  };
`

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  height: 100%;
`

export const Sidebar = styled.aside`
  position: fixed;
  right: 0;
  top: 0;
  max-width: 360px;
  width: 100%;
  height: 100%;
  padding: 2.5em 1em 0 1em;
  background-color: ${colors.marrom};
  z-index: 2;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;

  &.is-open {
    transform: translateX(0);
  }
`

export const ProductsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding-top: 6em;
`

export const ProductItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1em;
  border-radius: 0.2em;
  height: 5em;
  position: relative;
  background-color: ${colors.marromClaro};
  color: ${colors.creme};

  img {
    width: 4em;
    height: 4em;
    mix-blend-mode: darken;
  }

  h4 {
    padding-bottom: 0.5em;
  }
`

export const DeleteItem = styled.button`
  width: 1.5em;
  height: 1.5em;
  position: absolute;
  right: 0;
  top: 8px;
  border: none;
  font-size: 1em;
  background-color: ${colors.marromClaro};
  color: ${colors.creme};
  cursor: pointer;
`

export const TotalPrice = styled.div`
  color: ${colors.creme};

  p {
    font-size: 0.8em;
    font-weight: 700;
  }
`

export const Checkout = styled(Link)`
  align-content: center;
  text-align: center;
  height: 3em;
  color: ${colors.creme};
  background-color: ${colors.marromEscuro};
  border: none;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: ${colors.marromEscuroPlus};
  }
`

export const EmptyCart = styled.p`
  text-align: center;
  padding-top: 6em;
  font-size: 0.9em;
  line-height: 22px;
  color: ${colors.creme};
`