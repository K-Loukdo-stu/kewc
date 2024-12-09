import { gql } from '@apollo/client/core';


export const GET_SEARCH_HOTEL_EXTRA_FEATURE_QUERY = gql`
query searchHotelExtraFeature( $currentPage: Float!, $searchText: String!, $hotel: String! ){
  searchHotelExtraFeature(
    param:{
     currentPage: $currentPage,
     searchText: $searchText,
     hotel: $hotel,
    }
    )
    {
      hotelExtraFeatures {id, additionalItem, mediaFile, price},
      hotelExtraFeatureCount
    }
}
`;


export const CREAT_HOTEL_EXTRA_FEATURE_MUTATION = gql`
 mutation createHotelExtraFeature( $additionalItem: String!, $price: Float!,$mediaFile: JSON! ,$hotel: String!){
   createHotelExtraFeature(
     param:{
      additionalItem: $additionalItem,
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


export const UPDATE_HOTEL_EXTRA_FEATURE_MUTATION = gql`
 mutation updateHotelExtraFeature( $id: String!, $additionalItem: String!, $price: Float!, $mediaFile: JSON! ,$hotel: String!){
   updateHotelExtraFeature(
     param:{
      id: $id,
      additionalItem: $additionalItem,
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


export const DELETE_HOTEL_EXTRA_FEATURE_MUTATION = gql`
  mutation deleteHotelExtraFeature( $id: String!) {
   deleteHotelExtraFeature(param: {
      id: $id
     })
     {
      additionalItem
     }
  }
 `;
