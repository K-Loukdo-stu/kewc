import { gql } from '@apollo/client/core';


/**
 *  CATEOGRY
 */

export const GET_RESTAURANT_CATEGORIES_QUERY = gql`
  query restaurantCategories{
    restaurantCategories{
         name, id, mediaUrl
   }
 }
 `;



export const GET_SEARCH_RESTAURANT_CATEGORIES_QUERY = gql`
 query searchRestaurantCategories( $currentPage: Float!, $searchText: String! ){
  searchRestaurantCategories(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      restaurantCategories {id, name, mediaUrl,description},
      restaurantCategoriesCount
     }
 }
 `;

export const CREATE_RESTAURANT_CATEGORY_MUTATION = gql`
  mutation createRestaurantCategory( $name: String!, $description: String!,$mediaUrl: JSON!) {
    createRestaurantCategory(param: {
      name: $name, 
      mediaUrl: $mediaUrl,
      description:$description,
     }) {
     name
    }
  }
 `;


export const UPDATE_RESTAURANT_CATEGORY_MUTATION = gql`
  mutation updateRestaurantCategory( $id: String!, $name: String!, $description: String!,$mediaUrl: JSON!) {
    updateRestaurantCategory(param: {
      id: $id,
      name: $name, 
      mediaUrl: $mediaUrl,
      description:$description,
     }) {
     name, id
    }
  }
 `;


export const DELETE_RESTAURANT_CATEGORY_MUTATION = gql`
  mutation deleteRestaurantCategory( $id: String!) {
    deleteRestaurantCategory(param: {
      id: $id
     })
     {
        name
     }
  }
 `;



/**
 * RESTAURANT
 */

export const GET_RESTAURANTS_QUERY = gql`
 query restaurants{
  restaurants{
        name, id
  }
}
`;

export const GET_RESTAURANT_QUERY = gql`
 query restaurant( $id: String! ){
  restaurant(
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
      channel,
      category{id, name},
      province{id, name}, 
      latitude,
      longtitude
      
     }
 }
 `;

export const GET_SEARCH_RESTAURANTS_QUERY = gql`
 query searchRestaurants( $currentPage: Float!, $searchText: String! ){
  searchRestaurants(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      restaurants {
        id, 
        name,
        mediaUrl,
        description,
        category{id, name}, province{id, name}
        },restaurantsCount
        
     }
 }
 `;


export const CREATE_RESTAURANT_MUTATION = gql`
 mutation createRestaurant(
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
   $channel: String!,
   ) {
    createRestaurant(param: {
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
    channel:$channel,
    }) {
    name
   }
 }
`;


export const UPDATE_RESTAURANT_MUTATION = gql`
 mutation updateRestaurant( 
   $id: String!, 
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
   $channel: String!,
  ) {
    updateRestaurant(param: {
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
    channel:$channel,
    }) {
    name
   }
 }
`;

export const DELETE_RESTAURANT_MUTATION = gql`
 mutation deleteRestaurant( $id: String!) {
  deleteRestaurant(param:{
     id: $id
    }){
    name
   }
 }
`;



