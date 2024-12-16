import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrubs';

import { RootState, AppDispatch } from '../../../store';
import { fetchProducts } from '@/store/reducers/apiSlice';

import { PrintsImages } from '@/types';
import { formattedPrice, getFirstLetter } from '@/services/utility';

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

const ProdutoPage = () => {
  const router = useRouter();
  const { produtoSlug } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const { products, loading } = useSelector((state: RootState) => state.products);
  const produto = products[produtoSlug as string];

  const [amountValue, setAmountValue] = useState(1)
  const [mainImage, setMainImage] = useState<PrintsImages | null>(null);
  const [selectedPrint, setSelectedPrint] = useState<string>(''); // Inicializa com 'floral' ou outra estampa por padrão

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  // Obtém o produto específico com base no produtoId
  const product = products.find((product) => product.slug === produtoSlug);

  useEffect(() => {
    if (product?.medias?.thumbnail) {
      setMainImage({ src: product.medias.thumbnail, alt: product.name });
    }
  }, [product]);

  const printImages = product?.medias?.prints[selectedPrint] || []; // Filtra as imagens da estampa selecionada

  // Obter as estampas disponíveis dinamicamente
  const availablePrints = Object.entries(product?.medias?.prints || {})
    .filter(([_, images]) => images && images.length > 0);

  const incrementValue = () => setAmountValue((prevValue) => prevValue + 1)
  const decrementValue = () => setAmountValue((prevValue) => (prevValue > 1 ? prevValue - 1 : prevValue))

  const handleThumbnailClick = (image: PrintsImages) => {
    setMainImage(image)
  }

  if (loading) return <p>Carregando...</p>;
  if (!product) return <p>Produto não encontrado.</p>;

  return (
    <>
      <ContainerStore>
        <Head>
          <title>
            {`${product.name} | Vânia Costura Criativa`}
          </title>
        </Head>
      <Breadcrumbs />
      <ProductContainer>
        <ProductImages>
          <ZoomContainer>
            {mainImage ? (
              <ZoomedImage src={mainImage.src} alt={mainImage.alt} title={mainImage.alt} />
            ) : (
              <p>Carregando imagem...</p>
            )}
          </ZoomContainer>
          <ThumbnailsContainer>
            {printImages.map((image) => (
              <Thumbnail
                key={image.src}
                src={image.src}
                alt={image.alt}
                title={image.alt}
                onClick={() => handleThumbnailClick(image)}
              />
            ))}
          </ThumbnailsContainer>
        </ProductImages>
        <ProductDetails>
            <ProductName>{product.name}</ProductName>
          <div>
            <Price>{formattedPrice(product.price)}</Price>
            <span>
              ou <b>{product.division}</b> de <b>{formattedPrice(product.installment)}</b> sem juros!
            </span>
          </div>
          <form action="/comprar/">
            <Prints>
              <p>Estampas: </p>
              <div>
                {availablePrints.map(([key, _]) => (
                  <img
                    key={key}
                    onClick={() => setSelectedPrint(key)}
                    title={getFirstLetter(key)} // Capitaliza o nome
                    alt={key}
                    src={`https://raw.githubusercontent.com/eyelexx/vcosturac/refs/heads/main/src/public/images/estampas/${key}.jpg`} // Use URLs dinâmicas ou estáticas conforme necessário
                  />
                ))}
              </div>
            </Prints>
            <ContainerBuy>
              <Amount>
                <span onClick={decrementValue} title='Remover um item'>-</span>
                <input
                  type="number"
                  value={amountValue}
                  readOnly
                  onChange={(e) => setAmountValue(e.target.value)}
                />
                <span onClick={incrementValue} title='Adicionar um item'>+</span>
              </Amount>
              <BuyButton type="submit" title='Adicionar ao carrinho'>ADICIONAR AO CARRINHO</BuyButton>
            </ContainerBuy>
          </form>
          <Description>
            <h4>Descrição:</h4>
            <p>{product.description}</p>
          </Description>
        </ProductDetails>
      </ProductContainer>
    </ContainerStore>
    </>
  );
};

export default ProdutoPage;


// colocar a primeira imagem de cada Print como thumbnail padrão