import { gql } from '@apollo/client/core';


export const GET_SEARCH_HOTEL_AVAILABILITY_QUERY = gql`
 query searchHotelAvailibity( $currentPage: Float!, $searchText: String!, $hotel: String! ){
  searchHotelAvailibity(
     param:{
      currentPage: $currentPage,
      searchText: $searchText,
      hotel: $hotel,
     }
     )
     {
      hotelAvailability {id, name, iconFile},
      hotelAvailabilityCount
     }
 }
 `;


export const CREAT_HOTEL_AVAILABILITY_MUTATION = gql`
 mutation createHotelAvailability( $name: String!, $iconFile: JSON! ,$hotel: String!){
  createHotelAvailability(
     param:{
      name: $name,
      iconFile: $iconFile,
      hotel: $hotel,
     }
     )
     {
      id
     }
 }
 `;


export const UPDATE_HOTEL_AVAILABILITY_MUTATION = gql`
 mutation updateHotelAvailability( $id: String!, $name: String!, $iconFile: JSON! ,$hotel: String!){
  updateHotelAvailability(
     param:{
      id: $id,
      name: $name,
      iconFile: $iconFile,
      hotel: $hotel,
     }
     )
     {
      id
     }
 }
 `;


export const DELETE_HOTEL_AVAILABILITY_MUTATION = gql`
  mutation deleteHotelAvailability( $id: String!) {
    deleteHotelAvailability(param: {
      id: $id
     })
     {
        name
     }
  }
 `;
