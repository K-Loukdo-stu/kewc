import { gql } from '@apollo/client/core';


/**
 * PROVINCE
 */

 export const GET_PROVINCES_QUERY = gql`
 query provinces{
  provinces{
        name, id
  }
}
`;


export const GET_SEARCH_PROVINCES_QUERY = gql`
 query searchProvinces( $currentPage: Float!, $searchText: String! ){
  searchProvinces(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      provinces {id, name},
      provincesCount
     }
 }
 `;

export const CREATE_PROVINCE_MUTATION = gql`
  mutation createProvince( $name: String!) {
    createProvince(param: {
      name: $name, 
     }) {
     name
    }
  }
 `;


export const UPDATE_PROVINCE_MUTATION = gql`
  mutation updateProvince( $id: String!, $name: String!) {
    updateProvince(param: {
      id: $id,
      name: $name, 
     }) {
     name, id
    }
  }
 `;


export const DELETE_PROVINCE_MUTATION = gql`
  mutation deleteProvince( $id: String!) {
    deleteProvince(param: {
      id: $id
     })
     {
        name
     }
  }
 `;


