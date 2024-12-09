/**
 * Define query nad mutation
 */
 import { gql } from '@apollo/client/core';

 export const GET_USER_QUERY = gql`
 query user( $id: String! ){
  user(id: $id){
    email, username, id, profile
  }
}
`;
export const GET_USERS_QUERY = gql`
 query users{
  users {
      id,
      email
      username
      profile
      createdAt
  }
}
`;


export const GET_SEARCH_USERS_QUERY = gql`
 query searchUsers( $currentPage: Float!, $searchText: String! ){
  searchUsers(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      users {id, username, firstName, lastName, email},
      usersCount
     }
 }
 `;