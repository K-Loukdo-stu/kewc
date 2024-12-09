import { gql } from '@apollo/client/core';


/**
 * PLACE CATEOGRY
 */

export const GET_PLACE_CATEGORIES_QUERY = gql`
  query placeCategories{
    placeCategories{
         name, id, mediaFile
   }
 }
 `;



export const GET_SEARCH_PLACE_CATEGORIES_QUERY = gql`
 query SearchCategories( $currentPage: Float!, $searchText: String! ){
  SearchCategories(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      placeCategories {id, name, mediaFile,description, placesCount},
      placeCategoriesCount
     }
 }
 `;

export const CREATE_PLACE_CATEGORY_MUTATION = gql`
  mutation createPlaceCategory( $name: String!, $description: String!,$mediaFile: JSON!) {
    createPlaceCategory(param: {
      name: $name, 
      mediaFile: $mediaFile,
      description:$description,
     }) {
     name
    }
  }
 `;


export const UPDATE_PLACE_CATEGORY_MUTATION = gql`
  mutation updatePlaceCategory( $id: String!, $name: String!, $description: String!,$mediaFile: JSON!) {
    updatePlaceCategory(param: {
      id: $id,
      name: $name, 
      mediaFile: $mediaFile,
      description:$description,
     }) {
     name, id
    }
  }
 `;


export const DELETE_PLACE_CATEGORY_MUTATION = gql`
  mutation deletePlaceCategory( $id: String!) {
    deletePlaceCategory(param: {
      id: $id
     })
     {
        name
     }
  }
 `;



/**
 * Place
 */

export const GET_PLACES_QUERY = gql`
 query places{
  places{
        name, id
  }
}
`;

export const GET_PLACE_QUERY = gql`
 query place( $id: String! ){
  place(
     param:{
      id: $id,
     }
     )
     {
      id, 
      name,
      mediaFile,
      description,
     }
 }
 `;

export const GET_SEARCH_PLACES_QUERY = gql`
 query searchPlaces( $currentPage: Float!, $searchText: String! ){
  searchPlaces(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      places {
        id, 
        name,
        mediaFile,
        description,
        },placesCount
        
     }
 }
 `;

export const GET_PLACES_BY_CATEGORY_QUERY = gql`
query findPlaceCategory($category: String!){
  findStickerPackage(
    param:{category: $category}
    )
    {
      name, mediaFile
    }
}
`;

export const CREATE_PLACE_MUTATION = gql`
 mutation createPlace(
   $name: String!,
   $mediaFile: JSON!,
   $description:String!,
   $latitude:Float!,
   $longtitude:Float!,
   $category:String!,
   $province:String!,
   $iconUrl: String!,
   $iconX: Float!,
   $iconY: Float!,
   $pointX:Float!,
   $pointY: Float!,
   $hiddenAtMinScale: Float!,
   $showIcon: Boolean!,
   $phone: String!,
   $email: String!,
   $website: String!,
   $price: Float!,
   ) {
    createPlace(param: {
    name: $name, 
    mediaFile:$mediaFile,
    description:$description,
    latitude:$latitude,
    longtitude:$longtitude,
    category:$category,
    province:$province,
    iconUrl:$iconUrl,
    iconX:$iconX,
    iconY:$iconY,
    pointX:$pointX,
    pointY:$pointY,
    hiddenAtMinScale:$hiddenAtMinScale,
    showIcon:$showIcon,
    phone:$phone,
    email:$email,
    website:$website,
    price:$price,
    }) {
    name
   }
 }
`;





export const UPDATE_PLACE_MUTATION = gql`
 mutation updatePlace( 
   $id: String!, 
   $name: String!,
   $mediaFile: JSON!,
   $description:String!,
   $latitude:Float!,
   $longtitude:Float!,
   $category:String!,
   $province:String!,
   $iconUrl: String!,
   $iconX: Float!,
   $iconY: Float!,
   $pointX:Float!,
   $pointY: Float!,
   $hiddenAtMinScale: Float!,
   $showIcon: Boolean!,
   $phone: String!,
   $email: String!,
   $website: String!,
   $price: Float!,
  ) {
  updatePlace(param: {
    id: $id, 
    name: $name, 
    mediaFile:$mediaFile,
    description:$description,
    latitude:$latitude,
    longtitude:$longtitude,
    category:$category,
    province:$province,
    iconUrl:$iconUrl,
    iconX:$iconX,
    iconY:$iconY,
    pointX:$pointX,
    pointY:$pointY,
    hiddenAtMinScale:$hiddenAtMinScale,
    showIcon:$showIcon,
    phone:$phone,
    email:$email,
    website:$website,
    price:$price,
    }) {
    name
   }
 }
`;

export const DELETE_PLACE_MUTATION = gql`
 mutation deletePlace( $id: String!) {
  deletePlace(param:{
     id: $id
    }){
    name
   }
 }
`;