import { gql } from '@apollo/client/core';



export const GET_ICON_CATEGORIES_QUERY = gql`
query iconCategories{
  iconCategories{
       name, id
 }
}
`;

export const GET_SEARCH_ICON_CATEGORY_QUERY = gql`
 query searchIconCategories( $currentPage: Float!, $searchText: String! ){
  searchIconCategories(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      categoryIcons{id, name, file, width, height}, 
      categoryIconsCount
     }
 }
 `;

export const CREATE_ICON_CATEGORY_MUTATION = gql`
  mutation createIconCategory( $name: String!,$file: JSON!,$width:Float!,$height:Float!) {
    createIconCategory(param: {
     name: $name, 
     file: $file,
     width:  $width,
     height: $height,
     }) {
     name
    }
  }
 `;

export const UPDATE_ICON_CATEGORY_MUTATION = gql`
  mutation updateIconCategory( $id: String!, $name: String!,$file: JSON!,$width:Float!,$height:Float!) {
    updateIconCategory(param: {
     id: $id, 
     name: $name, 
     file: $file,
     width:  $width,
     height: $height,
     }) {
     name
    }
  }
 `;

export const DELETE_ICON_CATEGORY_MUTATION = gql`
  mutation deleteIconCategory( $id: String!) {
    deleteIconCategory(param:{
      id: $id
     }){
     name
    }
  }
 `;
