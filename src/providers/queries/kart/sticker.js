import { gql } from '@apollo/client/core';

/**
 * STICKER
 */
export const GET_STICKERs_QUERY = gql`
  query stickers{
     stickers{
         name, file, id
   }
 }
 `;

export const GET_STICKERS_BY_PACKAGE_ID_QUERY = gql`
 query findStickerPackage($packages: String!){
   findStickerPackage(
     packages: $packages
     )
     {
       name, file, id, packages{id},frameNum, fps, width, height, animated, type{id, name, url}
     }
 }
 `;

export const CREATE_STICKER_MUTATION = gql`
  mutation createSticker( $name: String!,$file: JSON!,$width:Float!,$height:Float!,$animated:Boolean!,$packages:String!, $type:String!, $frameNum:Float!, $fps:Float!) {
   createSticker(param: {
     name: $name, 
     file: $file,
     width:  $width,
     height: $height,
     animated: $animated,
     packages: $packages, 
     type: $type,
     frameNum: $frameNum,
     fps: $fps
     }) {
     name
    }
  }
 `;

export const UPDATE_STICKER_MUTATION = gql`
  mutation updateSticker( $id: String!, $name: String!,$file: JSON!,$width:Float!,$height:Float!,$animated:Boolean!,$packages:String!, $type:String!, $frameNum:Float!, $fps:Float!) {
   updateSticker(param: {
     id: $id, 
     name: $name, 
     file: $file,
     width:  $width,
     height: $height,
     animated: $animated,
     packages: $packages, 
     type: $type,
     frameNum: $frameNum,,
     fps: $fps,
     }) {
     name
    }
  }
 `;

export const DELETE_STICKER_MUTATION = gql`
  mutation deleteSticker( $id: String!) {
   deleteSticker(param:{
      id: $id
     }){
     name
    }
  }
 `;

// STICKER TYPE

export const GET_STICKER_TYPES_QUERY = gql`
  query stickerTypes{
    stickerTypes{
         name, id, url
   }
 }
 `;


export const GET_SEARCH_STICKER_TYPES_QUERY = gql`
 query searchTypes( $currentPage: Float!, $searchText: String! ){
  searchTypes(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      stickerTypes {id, name, url},
      countStickerTypes
     }
 }
 `;

export const CREATE_STICKER_TYPE_MUTATION = gql`
  mutation createStickerType( $name: String!, $url: String!) {
   createStickerType(param: {
     name: $name, 
     url: $url, 
     }) {
     name, id, url
    }
  }
 `;


export const UPDATE_STICKER_TYPE_MUTATION = gql`
  mutation updateStickerType( $id: String!, $name: String!, $url: String!) {
   updateStickerType(param: {
     id: $id,
     name: $name, 
     url: $url,  
     }) {
     name, id, url
    }
  }
 `;


export const DELETE_STICKER_TYPE_MUTATION = gql`
  mutation deleteStickerType( $id: String!) {
   deleteStickerType(param: {
     id: $id,
     })
     {
        name
     }
  }
 `;


/**
 * STICKER CATEOGRY
 */

export const GET_STICKER_CATEGORY_QUERY = gql`
  query stickerCategories{
   stickerCategories{
         name, id
   }
 }
 `;


/**
 * STICKER PACKAGE
 */

export const GET_STICKER_PACKAGES_QUERY = gql`
 query stickerPackages($currentPage: Float!){
   stickerPackages(
     param:{
       currentPage: $currentPage
     }
     )
     {
       packages {id, name, price, amount, currency},
       countPackage
     }
 }
 `;

export const GET_SEARCH_STICKER_PACKAGES_QUERY = gql`
 query searchStickerPackages( $currentPage: Float!, $searchText: String! ){
  searchStickerPackages(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      stickerPackages {id, name, price, amount, currency, file, stickerCount},
      countStickerPackages
     }
 }
 `;

export const CREATE_STICKER_PACKAGE_MUTATION = gql`
  mutation createStickerPackage( $name: String!, $amount: Float!, $price: Float!, $currency: String!,$file: JSON!) {
   createStickerPackage(param: {
     name: $name, 
     price: $price, 
     amount: $amount, 
     currency: $currency, 
     file: $file, 
     }) {
     name, id, price, amount, currency
    }
  }
 `;


export const UPDATE_STICKER_PACKAGE_MUTATION = gql`
  mutation updateStickerPackage( $id: String!, $name: String!, $price: Float!, $amount: Float!, $currency: String!,$file: JSON!) {
   updateStickerPackage(param: {
     id: $id,
     name: $name, 
     price: $price, 
     amount: $amount, 
     currency: $currency, 
     file: $file, 
     }) {
     name, id, price, amount, currency
    }
  }
 `;


export const DELETE_STICKER_CATEGORY_MUTATION = gql`
  mutation deleteStickerCategory( $id: String!) {
   deleteStickerCategory(id: $category)
     {
        name
     }
  }
 `;
