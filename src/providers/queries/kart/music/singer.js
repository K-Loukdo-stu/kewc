import { gql } from '@apollo/client/core';


export const GET_SEARCH_SINGERS_QUERY = gql`
 query searchSingers( $currentPage: Float!, $searchText: String! ){
  searchSingers(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      singers{id, firstName, lastName, gender, production{name}},
      count
     }
 }
 `;

export const CREATE_SINGER_MUTATION = gql`
  mutation createSinger( $firstName: String!,$gender: String!,$lastName:String!,$production:String!) {
    createSinger(param: {
      firstName: $firstName, 
      lastName: $lastName,
      gender: $gender,
      production: $production,
     }) {
      firstName
    }
  }
 `;

export const UPDATE_SINGER_MUTATION = gql`
  mutation updateSinger( $id: String!, $firstName: String!,$gender: String!,$lastName:String!,$production:String!) {
    updateSinger(param: {
     id: $id, 
     firstName: $firstName, 
      lastName: $lastName,
      gender: $gender,
      production: $production,
     }) {
      firstName
    }
  }
 `;
