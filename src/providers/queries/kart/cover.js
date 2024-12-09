import { gql } from '@apollo/client/core';

/**
 * STICKER
 */
export const GET_COVERS_QUERY = gql`
  query{
  covers{ name, file,id,width, height}
}
 `;

export const CREATE_COVER_MUTATION = gql`
  mutation createCover( $name: String!,$file: JSON!,$width:Float!,$height:Float!) {
    createCover(param: {
     name: $name, 
     file: $file,
     width:  $width,
     height: $height,
     }) {
     name, file,width, height
    }
  }
 `;


export const GET_COVERS_BY_PAGE_QUERY = gql`
 query coversByPage($currentPage: Float!){
    coversByPage(
     param:{
       currentPage: $currentPage
     }
     )
     {
        countCovers,
        covers{id, file, name, width, height}
     }
 }
 `;


export const DELETE_COVER_MUTATION = gql`
  mutation deleteCover( $id: String!) {
    deleteCover(param: {
     id: $id,
     })
     {
        name
     }
  }
 `;
  