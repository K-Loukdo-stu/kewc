import { gql } from '@apollo/client/core';

export const GET_PRODUCT_TYPES_QUERY = gql`
query productTypes{
  productTypes{
     id
     name
     icon,
 }
}
`;

export const GET_PRODUCT_TYPES_BY_CHANNEL_QUERY = gql`
query productTypesByChannel($channel: String!){
  productTypesByChannel(params:{
      channel: $channel
      }){
    id
    name
    channel
  }
}
`;



export const GET_SEARCH_PRODUCT_TYPE_QUERY = gql`
 query searchProductTypes( $currentPage: Float!, $searchText: String! ){
   searchProductTypes(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
        productTypes{id, name, icon, catalog{id, name}}, 
        productTypesCount
     }
 }
 `;


export const CREATE_PRODUCT_TYPE_MUTATION = gql`
  mutation createProductType( $name: String!,$icon: JSON!, $channel: String!) {
   createProductType(params: {
     name: $name, 
     icon: $icon,
     channel: $channel,
     }) {
      id
      name
      icon
    }
  }
 `;

export const UPDATE_PRODUCT_TYPE_MUTATION = gql`
  mutation updateProductType( $id: String!, $name: String!,$icon: JSON!) {
   updateProductType(params: {
     id: $id, 
     name: $name, 
     icon: $icon,
     }) {
    id
     name
     icon
    }
  }
 `;

export const DELETE_PRODUCT_TYPE_MUTATION = gql`
  mutation deleteProductType( $id: String!) {
   deleteProductType(params:{
      id: $id
     }){
      id
      name
      icon
    }
  }
 `;

