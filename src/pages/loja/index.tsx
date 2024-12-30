import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../store'
import { useEffect } from 'react'
import { fetchApiProducts } from '@/store/reducers/apiSlice'
import { Card, Categories, Imagem } from './styles'
import { getFirstLetter } from '@/services/utility'

const Loja = () => {
  const dispatch: AppDispatch = useDispatch()
  const { products, loading } = useSelector(
    (state: RootState) => state.products
  )

  // Buscar produtos quando a página é carregada
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchApiProducts())
    }
  }, [dispatch, products])

  if (loading) return <p>Carregando...</p>

  // Obter todas as categorias únicas
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  )

  return (
    <>
      <Head>
        <title>Loja | Vânia Costura Criativa</title>
      </Head>
      <Categories>
        <h1>Bem-vindo à Loja!</h1>
        <p>Escolha uma categoria para explorar:</p>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <Card href={`/loja/${category}`}>
                <Imagem
                  src={
                    typeof products.find((item) => item.category === category)
                      ?.medias?.thumbnail === 'string'
                      ? (products.find((item) => item.category === category)
                          ?.medias?.thumbnail as string)
                      : ''
                  }
                  alt={category}
                  title={getFirstLetter(`${category}`)}
                />
                <h3>{getFirstLetter(category)}</h3>
              </Card>
            </li>
          ))}
        </ul>
      </Categories>
    </>
  )
}

export default Loja
