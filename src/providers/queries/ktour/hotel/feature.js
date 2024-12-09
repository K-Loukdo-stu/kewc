import { gql } from '@apollo/client/core';


export const GET_SEARCH_HOTEL_FEATURE_QUERY = gql`
 query searchHotelFeature( $currentPage: Float!, $searchText: String!, $hotel: String! ){
  searchHotelFeature(
     param:{
      currentPage: $currentPage,
      searchText: $searchText,
      hotel: $hotel,
     }
     )
     {
      hotelFeatures {id, typeName, mediaFile, price},
      hotelFeatureCount
     }
 }
 `;



export const CREAT_HOTEL_FEATURE_MUTATION = gql`
 mutation createHotelFeature( $typeName: String!, $price: Float!,$mediaFile: JSON! ,$hotel: String!){
  createHotelFeature(
     param:{
      typeName: $typeName,
      price: $price,
      mediaFile: $mediaFile,
      hotel: $hotel,
     }
     )
     {
      id
     }
 }
 `;


export const UPDATE_HOTEL_FEATURE_MUTATION = gql`
 mutation updateHotelFeature( $id: String!, $typeName: String!, $price: Float!, $mediaFile: JSON! ,$hotel: String!){
  updateHotelFeature(
     param:{
      id: $id,
      typeName: $typeName,
      price: $price,
      mediaFile: $mediaFile,
      hotel: $hotel,
     }
     )
     {
      id
     }
 }
 `;


export const DELETE_HOTEL_FEATURE_MUTATION = gql`
  mutation deleteHotelFeature( $id: String!) {
    deleteHotelFeature(param: {
      id: $id
     })
     {
      id
     }
  }
 `;
