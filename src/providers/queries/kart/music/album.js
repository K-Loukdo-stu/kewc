import { gql } from '@apollo/client/core';



// export const GET_ICON_CATEGORIES_QUERY = gql`
// query iconCategories{
//   iconCategories{
//        name, id
//  }
// }
// `;

export const GET_SEARCH_ALBUMS_QUERY = gql`
 query searchAlbums( $currentPage: Float!, $searchText: String! ){
  searchAlbums(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      albums{id, name, desc, imageUrl, releasedDate}, 
      albumsCount
     }
 }
 `;

export const CREATE_ALBUM_MUTATION = gql`
  mutation createAlbum( $name: String!,$imageUrl: JSON!,$releasedDate:Float!,$desc:String!) {
    createAlbum(param: {
     name: $name, 
     imageUrl: $imageUrl,
     releasedDate:  $releasedDate,
     desc: $desc,
     }) {
     name
    }
  }
 `;

export const UPDATE_ALBUM_MUTATION = gql`
  mutation updateAlbum( $id: String!, $name: String!,$imageUrl: JSON!,$releasedDate:Float!,$desc:String!) {
    updateAlbum(param: {
     id: $id, 
     name: $name, 
     imageUrl: $imageUrl,
     releasedDate:  $releasedDate,
     desc: $desc,
     }) {
     name
    }
  }
 `;

// export const DELETE_ICON_CATEGORY_MUTATION = gql`
//   mutation deleteIconCategory( $id: String!) {
//     deleteIconCategory(param:{
//       id: $id
//      }){
//      name
//     }
//   }
//  `;
