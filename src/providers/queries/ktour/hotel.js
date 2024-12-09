import { gql } from '@apollo/client/core';


/**
 * HOTEL CATEOGRY
 */

export const GET_HOTEL_CATEGORIES_QUERY = gql`
  query hotelCategories{
    hotelCategories{
         name, id, mediaUrl
   }
 }
 `;



export const GET_SEARCH_HOTEL_CATEGORIES_QUERY = gql`
 query searchHotelCategories( $currentPage: Float!, $searchText: String! ){
  searchHotelCategories(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      hotelCategories {id, name, mediaUrl,description, hotelsCount},
      hotelCategoriesCount
     }
 }
 `;

export const CREATE_HOTEL_CATEGORY_MUTATION = gql`
  mutation createHotelCategory( $name: String!, $description: String!,$mediaUrl: JSON!) {
    createHotelCategory(param: {
      name: $name, 
      mediaUrl: $mediaUrl,
      description:$description,
     }) {
     name
    }
  }
 `;


export const UPDATE_HOTEL_CATEGORY_MUTATION = gql`
  mutation updateHotelCategory( $id: String!, $name: String!, $description: String!,$mediaUrl: JSON!) {
    updateHotelCategory(param: {
      id: $id,
      name: $name, 
      mediaUrl: $mediaUrl,
      description:$description,
     }) {
     name, id
    }
  }
 `;


export const DELETE_HOTEL_CATEGORY_MUTATION = gql`
  mutation deleteHotelCategory( $id: String!) {
    deleteHotelCategory(param: {
      id: $id
     })
     {
        name
     }
  }
 `;



/**
 * Hotel
 */

export const GET_HOTELS_QUERY = gql`
 query hotels{
  hotels{
        name, id
  }
}
`;

export const GET_HOTEL_QUERY = gql`
 query hotel( $id: String! ){
  hotel(
     param:{
      id: $id,
     }
     )
     {
      id, 
      name,
      mediaUrl,
      description,
      phone,
      email,
      website,
      price,
      mediaUrl,
      province {id, name},
      category {id, name},
      latitude,
      longtitude,
      checkInTime,
	    checkOutTime,
      channel,
      bio,
      type,
      profile
     }
 }
 `;

export const GET_SEARCH_HOTELS_QUERY = gql`
 query searchHotels( $currentPage: Float!, $searchText: String! ){
  searchHotels(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      hotels {
        id, 
        name,
        mediaUrl,
        description,
        category{id,name},
        province{id,name}
        },hotelsCount
        
     }
 }
 `;


export const CREATE_HOTEL_MUTATION = gql`
 mutation createHotel(
   $name: String!,
   $mediaUrl: JSON!,
   $description:String!,
   $latitude:Float!,
   $longtitude:Float!,
   $category:String!,
   $province:String!,
   $phone: String!,
   $email: String!,
   $website: String!,
   $price: Float!,
   $checkInTime: String!,
   $checkOutTime: String!,
   $channel: String!,
   ) {
    createHotel(param: {
    name: $name, 
    mediaUrl:$mediaUrl,
    description:$description,
    latitude:$latitude,
    longtitude:$longtitude,
    category:$category,
    province:$province,
    phone:$phone,
    email:$email,
    website:$website,
    price:$price,
    checkInTime:$checkInTime,
    checkOutTime:$checkOutTime,
    channel:$channel,
    }) {
    name
   }
 }
`;


export const UPDATE_HOTEL_MUTATION = gql`
 mutation updateHotel( 
   $id: String!, 
   $name: String!,
   $mediaUrl: JSON,
   $description:String,
   $latitude:Float,
   $longtitude:Float,
   $category:String,
   $province:String,
   $phone: String,
   $email: String,
   $website: String,
   $price: Float,
   $checkInTime: String,
   $checkOutTime: String,
   $channel: String,
   $bio: String,
   $type: String,
   $profile: JSON,
  ) {
    updateHotel(param: {
    id: $id, 
    name: $name, 
    mediaUrl:$mediaUrl,
    description:$description,
    latitude:$latitude,
    longtitude:$longtitude,
    category:$category,
    province:$province,
    phone:$phone,
    email:$email,
    website:$website,
    price:$price,
    checkInTime:$checkInTime,
    checkOutTime:$checkOutTime,
    channel:$channel,
    bio:$bio,
    type:$type,
    profile:$profile,
    
    }) {
    name
   }
 }
`;

export const DELETE_HOTEL_MUTATION = gql`
 mutation deleteHotel( $id: String!) {
  deleteHotel(param:{
     id: $id
    }){
    name
   }
 }
`;



/**
 * FEATURE
 */


/**
 * EXTRA FEATURE
 */



/**
 * BOOKING
 */

export const GET_SEARCH_HOTEL_BOOKING_QUERY = gql`
 query searchHotelBooking( $currentPage: Float!, $searchText: String!, $hotel: String! ){
  searchHotelBooking(
     param:{
      currentPage: $currentPage,
      searchText: $searchText,
      hotel: $hotel,
     }
     )
     {
      hotelBooking {id, 
      checkInDate, 
      checkOutDate,
      number,
      price,
      hotelExtraFeature{id},
      hotelFeature{id},
      hotel{id}  },
      hotelBookingCount
     }
 }
 `;
