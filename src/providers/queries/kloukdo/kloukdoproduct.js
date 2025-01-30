import { gql } from '@apollo/client/core';

export const GET_KLOUKDO_PRODUCT_QUERY = gql`
query getAllKLoukdoProducts($page: Float!, $limit: Float){
    getAllKLoukdoProducts(
        params: {
            page: $page,
            limit: $limit
        }
    ){
        id
        name
        price { price }
        category{ name }
        subCategory{ name }
        user {email username}
        photos
        createdAt
    }
}
`;

export const SEARCH_KLOUKDO_PRODUCT = gql`
query searchKLoukdoProductByName ($name: String!) {
  searchKLoukdoProductByName
  (
    name: $name
  )
  {
      id, 
      name, 
      price {id, price, currency, discountPrice, hasDiscount,isMain},
      photos
      category{id, name}
      subCategory{id, name}
      user {username}
      createdAt
    }
}
`;

export const GET_KLOUKDO_PRODUCT_BY_CATEGORY_QUERY = gql`
query findKLoukdoProductByCategory ( $category: String!, $limit: Float ){
  findKLoukdoProductByCategory(
    params: {
        category: $category,
        limit: $limit
    }
  )
  {
      id, 
      name, 
      price {id, price, currency, discountPrice, hasDiscount,isMain},
      photos
      category{id, name}
      subCategory{id, name}
      user {username}
      createdAt
    }
}
`;

export const GET_KLOUKDO_PRODUCT_BY_SUB_CATEGORY_QUERY = gql`
query findKLoukdoProductBySubCategory ( $subCategory: String!, $limit: Float ){
    findKLoukdoProductBySubCategory (params: {
            subCategory: $subCategory,
            limit: $limit
        }
    )
    {
        id, 
        name, 
        price {id, price, currency, discountPrice, hasDiscount,isMain},
        photos
        category{id, name}
        subCategory{id, name}
        user {username}
        createdAt
    }
}
`;

export const GET_KLOUKDO_PRODUCT_BY_ID_QUERY =gql`
query getKLoukdoProduct ($id: String!){
    getKLoukdoProduct (
        params:{
            id: $id
        }
    )
    {
        id, 
        name, 
        price {id, price, currency, discountPrice, hasDiscount,isMain},
        photos
        category{id, name}
        subCategory{id, name}
        user {username firstName lastName phone}
        createdAt
        updatedAt
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