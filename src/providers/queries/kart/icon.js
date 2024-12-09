import { gql } from '@apollo/client/core';


export const GET_SEARCH_ICONS_QUERY = gql`
 query searchIcons( $currentPage: Float!, $searchText: String! ){
  searchIcons(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      icons{id, name, file,category{name, id}, width, height}, 
      iconsCount
     }
 }
 `;

export const CREATE_ICON_MUTATION = gql`
  mutation createIcon( $name: String!,$file: JSON!,$width:Float!,$height:Float!,$category: String!) {
    createIcon(param: {
     name: $name, 
     file: $file,
     width:  $width,
     height: $height,
     category: $category,
     }) {
     name
    }
  }
 `;

export const UPDATE_ICON_MUTATION = gql`
  mutation updateIcon( $id: String!, $name: String!,$file: JSON!,$width:Float!,$height:Float!,$category: String!) {
    updateIcon(param: {
     id: $id, 
     name: $name, 
     file: $file,
     width:  $width,
     height: $height,
     category: $category,
     }) {
     name
    }
  }
 `;

export const DELETE_ICON_MUTATION = gql`
  mutation deleteIcon( $id: String!) {
    deleteIcon(param:{
      id: $id
     }){
     name
    }
  }
 `;
