import { gql } from '@apollo/client/core';


export const GET_SEARCH_LANGUAGES_QUERY = gql`
 query searchLanguages( $currentPage: Float!, $searchText: String! ){
  searchLanguages(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      languages{id, name}, 
      count
     }
 }
 `;

export const CREATE_LANGUAGE_MUTATION = gql`
  mutation createLanguage( $name: String!) {
    createLanguage(param: {
     name: $name, 
     }) {
     name
    }
  }
 `;

export const UPDATE_LANGUAGE_MUTATION = gql`
  mutation updateLanguage( $id: String!, $name: String!) {
    updateLanguage(param: {
     id: $id, 
     name: $name,
     }) {
     name
    }
  }
 `;

