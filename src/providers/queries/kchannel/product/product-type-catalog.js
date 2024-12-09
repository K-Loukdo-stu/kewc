import { gql } from '@apollo/client/core';


export const GET_PRODUCT_TYPE_CATALOGS_QUERY = gql`
query productTypeCatalogs{
    productTypeCatalogs{
       name, id, icon
 }
}
`;

export const GET_SEARCH_PRODUCT_TYPE_CATALOG_QUERY = gql`
 query searchProductTypeCatalogs( $currentPage: Float!, $searchText: String! ){
  searchProductTypeCatalogs(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
        productTypeCatalogs{id, name, icon}, 
        productTypeCatalogsCount
     }
 }
 `;



export const CREATE_PRODUCT_TYPE_CATELOG_MUTATION = gql`
  mutation createProductTypeCatalog( $name: String!,$icon: JSON!) {
    createProductTypeCatalog(params: {
     name: $name, 
     icon: $icon,
     }) {
     name
    }
  }
 `;

export const UPDATE_PRODUCT_TYPE_CATELOG_MUTATION = gql`
  mutation updateProductTypeCatalog( $id: String!, $name: String!,$icon: JSON!) {
    updateProductTypeCatalog(params: {
     id: $id, 
     name: $name, 
     icon: $icon,
     }) {
     name
    }
  }
 `;

export const DELETE_PRODUCT_TYPE_CATELOG_MUTATION = gql`
  mutation deleteProductTypeCatalog( $id: String!) {
    deleteProductTypeCatalog(params:{
      id: $id
     }){
     name
    }
  }
 `;
