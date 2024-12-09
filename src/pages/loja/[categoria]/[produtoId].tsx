import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';

import { RootState, AppDispatch } from '../../../store';
import { fetchProducts } from '@/store/reducers/apiSlice';

import {
  Amount,
  BuyButton,
  ContainerBuy,
  ContainerStore,
  Description,
  Price,
  Prints,
  ProductContainer,
  ProductDetails,
  ProductImages,
  ProductName,
  Thumbnail,
  ThumbnailsContainer,
  ZoomContainer,
  ZoomedImage } from './styles';

const images: PrintsImages[] = [
  {
    src: 'https://images.tcdn.com.br/img/img_prod/886231/mochila_masculina_18_schock_preta_5907_1_9f65b96a1a223c80fe5bd40562cad95c.jpg',
    alt: 'Imagem 1',
    title: 'Image1'
  },
  {
    src: 'https://cdn.dooca.store/1780/products/mochila-feminina-rebecca-bonbon-clio-rb24042-rosa-3_1600x1600+fill_ffffff.jpeg',
    alt: 'Imagem 2',
    title: 'Image2'
  },
  {
    src: 'https://images.tcdn.com.br/img/img_prod/886231/mochila_masculina_18_matelasse_azul_5891_1_5338f7fda7f60f12a50fd28032a85736.jpg',
    alt: 'Imagem 3',
    title: 'Image3'
  },
  // ... mais imagens
]

const ProdutoPage = () => {
  const router = useRouter();
  const { produtoId } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const { products, loading } = useSelector((state: RootState) => state.products);
  const [amountValue, setAmountValue] = useState(1)
  const [mainImage, setMainImage] = useState(images[0])

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  const product = products.find((product) => product.id === produtoId);

  const formattedPrice = product?.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  if (loading) return <p>Carregando...</p>;
  if (!product) return <p>Produto não encontrado.</p>;

  const incrementValue = () => setAmountValue((prevValue) => prevValue + 1)
  const decrementValue = () => setAmountValue((prevValue) => (prevValue > 1 ? prevValue - 1 : prevValue))

  const handleThumbnailClick = (image: PrintsImages) => {
    setMainImage(image)
  }

  return (
    <>
      <ContainerStore>
        <Head>
          <title>{`${product.name} | Vânia Costura Criativa`}</title>
        </Head>
      <ProductContainer>
        <ProductImages>
          <ZoomContainer>
            <ZoomedImage src={mainImage.src} alt={mainImage.alt} />
          </ZoomContainer>
          <ThumbnailsContainer>
            {images.map((image) => (
              <Thumbnail
                key={image.src}
                src={image.src}
                alt={image.alt}
                onClick={() => handleThumbnailClick(image)}
              />
            ))}
          </ThumbnailsContainer>
        </ProductImages>
        <ProductDetails>
            <ProductName>{product.name}</ProductName>
          <div>
            <Price>R${formattedPrice}</Price>
            <span>ou <b>2x</b> de <b>R$ 199,95</b> sem juros!</span>
          </div>
          <form action="/comprar/">
            <Prints>
              <p>Estampas: </p>
              <div>
                <img title="Floral" alt="Floral" src={product.medias?.floral?.thumbnail} />
                <img title="Listrado" alt="Listrado" src={product.medias?.listrado?.thumbnail} />
                <img title="Geométrico" alt="Geométrico" src={product.medias?.geometrico?.thumbnail} />
                <img title="Cor sem estampa" alt="Cor sem estampa" src={product.medias?.semEstampa?.thumbnail}  />
              </div>
            </Prints>
            <ContainerBuy>
              <Amount>
                <span onClick={decrementValue}>-</span>
                <input
                  type="number"
                  value={amountValue}
                  readOnly
                  onChange={(e) => setAmountValue(e.target.value)}
                />
                <span onClick={incrementValue}>+</span>
              </Amount>
              <BuyButton type="submit">ADICIONAR AO CARRINHO</BuyButton>{' '}
              {/*Na verdade será adicionado ao carrinho, então vai abrir uma modal com opções de continuar comprando ou finalizar a compra*/}
            </ContainerBuy>
          </form>
          <Description>
          {product.description}
          </Description>
        </ProductDetails>
      </ProductContainer>
    </ContainerStore>
    </>
  );
};

export default ProdutoPage;


// 1 - Usar o map para listar as estampas
// 2 - Usar o map para listar a tag Thumbnail
// 2 - Criar uma propriedade chamada Descount na API
