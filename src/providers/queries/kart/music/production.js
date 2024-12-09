import { gql } from '@apollo/client/core';

export const GET_PRODUCTIONS_QUERY = gql`
query production{
  production{
       name, id
 }
}
`;

export const GET_SEARCH_PRODUCTIONS_QUERY = gql`
 query searchProductions( $currentPage: Float!, $searchText: String! ){
  searchProductions(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      productions{id, name, location, imageUrl}, 
      count
     }
 }
 `;

export const CREATE_PRODUCTION_MUTATION = gql`
  mutation createProducion( $name: String!,$imageUrl: JSON!,$location:String!) {
    createProducion(param: {
     name: $name, 
     imageUrl: $imageUrl,
     location: $location,
     }) {
     name
    }
  }
 `;

export const UPDATE_PRODUCTION_MUTATION = gql`
  mutation updateProduction( $id: String!, $name: String!,$imageUrl: JSON!,$location:String!) {
    updateProduction(param: {
     id: $id, 
     name: $name, 
     imageUrl: $imageUrl,
     location: $location,
     }) {
     name
    }
  }
 `;
