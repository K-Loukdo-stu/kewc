import { gql } from '@apollo/client/core';

export const GET_KLOUKDO_PRODUCT_QUERY = gql`
query getAllKLoukdoProducts($page: Float!){
    getAllKLoukdoProducts(page: $page){
        id
        name
        price { price }
        category{ name }
        subCategory{ name }
        user {email username}
        photos
    }
}
`;

export const CREATE_KLOUKDO_PRODUCT_MUTATION = gql`
mutation createKLoukdoProduct ($name: String!, $category: String!, $subCategory: String!, $price: Float!, $discountPrice: Float!, $currency: String!, $hasDiscount: Boolean!, $photos: [JSON!]){
    createKLoukdoProduct(params: {
    category: $category
    subCategory: $subCategory
    name: $name
    price: $price,
    discountPrice: $discountPrice,
    currency: $currency,
    hasDiscount: $hasDiscount,
    photos: $photos
  }){
    id
    name
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
    photos

  }
}
`;

export const DELETE_KLOUKDO_PRODUCT_MUTATION = gql`
mutation deleteKLoukdoProduct ($id: String!){
    deleteKLoukdoProduct(
        params: {
            id: $id
        }
    ),
    {
        name
    }
}
`;