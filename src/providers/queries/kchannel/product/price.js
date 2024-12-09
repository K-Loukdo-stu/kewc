import { gql } from '@apollo/client/core';

export const CREATE_PRODUCT_PRICE_MUTATION = gql`
mutation createProductPrice(
  $name: String!,
  $price: Float!,$discountPrice: Float!,
  $hasDiscount: Boolean!, $currency: String!,
  $product: String!, $isMain: Boolean){
  createProductPrice(params: {
    name: $name,
    price: $price,
    discountPrice: $discountPrice,
    hasDiscount: $hasDiscount,
    isMain: $isMain,
    currency: $currency,
    product: $product
  }){
    id
    name
    price
    discountPrice
    currency
    product
    isMain
    hasDiscount
  }
}
`;

export const DELETE_PRODUCT_PRICE_MUTATION = gql`
mutation deleteProductPrice($id: String!){
  deleteProductPrice(params: { id: $id }){
    id
    name
    price
    discountPrice
    currency
    product
    isMain
    hasDiscount
  }
}
`;

export const UPDATE_PRODUCT_PRICE_MUTATION = gql`
mutation updateProductPrice(
  $id: String!,
  $name: String!,
  $price: Float!,
  $discountPrice: Float!,
  $hasDiscount: Boolean!,
  $currency: String!,
){
  updateProductPrice(params: { 
    id: $id 
    name: $name,
    price: $price,
    discountPrice: $discountPrice,
    hasDiscount: $hasDiscount,
    currency: $currency,
   }){
    id
    name
    price
    discountPrice
    currency
    product
    isMain
    hasDiscount
  }
}
`;

export const GET_PRODUCT_PRICES_BY_PRODUCT_QUERY = gql`
 query productPricesByProduct( $product: String!){
  productPricesByProduct(params:{ product: $product }){
    id
    name
    price
    discountPrice
    currency
    product
    isMain
    hasDiscount
     }
 }
 `;

