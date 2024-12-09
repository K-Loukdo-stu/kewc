import { gql } from '@apollo/client/core';


export const GET_SEARCH_PROFILE_USERS_QUERY = gql`
 query searchProfileUsers( $currentPage: Float!, $searchText: String! ){
  searchProfileUsers(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      profileUsers{id, name, file}, 
      profileUserCount
     }
 }
 `;

export const CREATE_PROFILE_USER_MUTATION = gql`
  mutation createProfileUser( $name: String!,$file: JSON!) {
    createProfileUser(param: {
     name: $name, 
     file: $file,
     }) {
     name
    }
  }
 `;

export const UPDATE_PROFILE_USER_MUTATION = gql`
  mutation updateProfileUser( $id: String!, $name: String!,$file: JSON!) {
    updateProfileUser(param: {
     id: $id, 
     name: $name, 
     file: $file,
     }) {
     name
    }
  }
 `;

export const DELETE_PROFILE_USER_MUTATION = gql`
  mutation deleteProfileUser( $id: String!) {
    deleteProfileUser(param:{
      id: $id
     }){
     name
    }
  }
 `;
