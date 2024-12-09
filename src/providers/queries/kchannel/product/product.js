import { gql } from '@apollo/client/core';


/**
 *  PRODUCT
 */

export const GET_SHOW_ON_MENU_PRODUCTS_QUERY = gql`
 query showOnMenuBoardProducts( $channel: String!, $limit: Float! ){
    showOnMenuBoardProducts(param: {
      channel: $channel,
      limit: $limit
    }){
      id
      name
      showOnMenuBoard
      price {
        id, price, currency, discountPrice, hasDiscount,isMain
      }
      productType{
          id
      }
      photo
    }
 }
 `;

export const GET_PRODUCT_QUERY = gql`
 query product( $id: String! ){
  product(
     params:{
      id: $id,
     }
     )
     {
      id
      name, 
      price {id, price, currency, discountPrice, hasDiscount,isMain},
      photo, 
      channel{id}
      productType{id, name}
     }
 }
 `;

export const GET_PRODUCTS_BY_PRODUCT_TYPE_QUERY = gql`
query productsByChannelAndProductType( $channel: String!, $productType: String!, $limit: Float!, $pageNumber: Float! ){
  productsByChannelAndProductType(
    params:{
     channel: $channel,
     productType: $productType,
     limit: $limit,
     pageNumber: $pageNumber,
    }
    )
    {
     id
     name, 
     showOnMenuBoard
     price {id, price, currency, discountPrice, hasDiscount,isMain},
     photo, 
     productType{id, name}
    }
}
`;

export const GET_PRODUCTS_BY_CHANNEL_QUERY = gql`
 query allProductsByChannel( $channel: String! ){
  allProductsByChannel(
     params:{
      channel: $channel,
     }
     )
     {
      id
      name,
      showOnMenuBoard
      price{price},
      photo,
     }
 }
 `;

export const GET_SEARCH_PRODUCTS_QUERY = gql`
 query searchProducts( $currentPage: Float!, $searchText: String! ){
    searchProducts(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
        products{
          id, 
          name, 
          showOnMenuBoard, 
          channel{id, name}, 
          productType{id, name}
        }, 
        productsCount
     }
 }
 `;


export const GET_SEARCH_PRODUCTS_CHANNEL_QUERY = gql`
query searchChannelProducts( $currentPage: Float!, $searchText: String!, $channel: String! ){
  searchChannelProducts(
    param:{
     currentPage: $currentPage,
     searchText: $searchText
     channel: $channel
    }
    )
    {
       products{
        id,
        name, 
        showOnMenuBoard 
        channel{id, name},
        productType{id, name}
       }, 
       productTotal
       pageTotal
    }
}
`;


export const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct( 
    $name: String!,
    $price: Float!,
    $discountPrice: Float!,
    $currency: String!,
    $hasDiscount: Boolean!,
    $photo: JSON!,
    $channel: String!,
    $productType: String!
  ) {
   createProduct(params: {
     name: $name, 
     photo: $photo,
     channel: $channel,
     productType: $productType,
     price: $price,
     discountPrice: $discountPrice,
     currency: $currency,
     hasDiscount: $hasDiscount,
     }) {
      id
      name
      photo
      price {
        id
        name
        price
        discountPrice
        hasDiscount
        isMain
        currency
        product
      }
      productType{id, name},
    }
  }
 `;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation updateProduct( $id: String!, $name: String!, $photo: JSON!, $productType: String!) {
   updateProduct(params: {
     id: $id, 
     name: $name, 
     photo: $photo,
     productType: $productType,
     }) {
      id
      name
      price {
        id
        name
        price
        discountPrice
        currency
        isMain
        hasDiscount
      }
      photo
      productType{id, name},
    }
  }
 `;

export const DELETE_PRODUCT_MUTATION = gql`
  mutation deleteProduct( $id: String!) {
   deleteProduct(params:{
      id: $id
     }){
      id
      name
      photo
    }
  }
 `;

export const UPDATE_PRODUCT_SHOW_ON_BOARD_MUTATION = gql`
  mutation updateProductShowOnMenuBoard( $product: String!, $showOnMenuBoard: Boolean!) {
    updateProductShowOnMenuBoard(param:{
      product: $product,
      showOnMenuBoard: $showOnMenuBoard
     }){
      id
      name
      showOnMenuBoard
      price {
          id
          price
      }
      productType{
          id
      }
      photo
    }
  }
 `;

