import { gql } from '@apollo/client/core';

/**
 * STICKER
 */
 export const GET_WIDE_SCREEN_STICKER_BY_PAGE_QUERY = gql`
 query wideScreenStickerByPage($currentPage: Float!){
  wideScreenStickerByPage(
     param:{
       currentPage: $currentPage
     }
     )
     {
      countWideScreenStickers,
      wideScreenStickers{id, file, name, width, height}
     }
 }
 `;


export const CREATE_WIDE_SCREEN_STICKER_MUTATION = gql`
  mutation createWideScreenSticker( $name: String!,$file: JSON!,$width:Float!,$height:Float!,$animated:Boolean!) {
    createWideScreenSticker(param: {
     name: $name, 
     file: $file,
     width:  $width,
     height: $height,
     animated: $animated,
     }) {
     name
    }
  }
 `;

export const UPDATE_WIDE_SCREEN_STICKER_MUTATION = gql`
  mutation updateWideScreenSticker( $id: String!, $name: String!,$file: JSON!,$width:Float!,$height:Float!,$animated:Boolean!) {
    updateWideScreenSticker(param: {
     id: $id, 
     name: $name, 
     file: $file,
     width:  $width,
     height: $height,
     animated: $animated,
     }) {
     name
    }
  }
 `;

export const DELETE_WIDE_SCREEN_STICKER_MUTATION = gql`
  mutation deleteWideScreenSticker( $id: String!) {
    deleteWideScreenSticker(param:{
      id: $id
     }){
     name
    }
  }
 `;

