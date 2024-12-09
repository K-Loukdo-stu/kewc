import { gql } from '@apollo/client/core';



export const GET_SEARCH_GENRES_QUERY = gql`
 query searchGenres( $currentPage: Float!, $searchText: String! ){
  searchGenres(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      genres{id, name}, 
      count
     }
 }
 `;

export const CREATE_GENRE_MUTATION = gql`
  mutation createGenre( $name: String!) {
    createGenre(param: {
     name: $name, 
     }) {
     name
    }
  }
 `;

export const UPDATE_GENRE_MUTATION = gql`
  mutation updateGenre( $id: String!, $name: String!) {
    updateGenre(param: {
     id: $id, 
     name: $name,
     }) {
     name
    }
  }
 `;

