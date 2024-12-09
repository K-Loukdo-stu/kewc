/**
 * Define query nad mutation
 */
import { gql } from '@apollo/client/core';



export const GET_SERVICES_QUERY = gql`
    query services{
        services{
            id,
            name,
            url
        }
    }
`;

export const GET_SEARCH_SERVICE_QUERY = gql`
    query searchServices( $currentPage: Float!, $searchText: String! ){
        searchServices(
            param:{
                currentPage: $currentPage,
                searchText: $searchText
            }
        )
        {
            services {id, name, url, role},
            serviceCount
        }
    }
`;


export const GET_CHECKED_SERVICE_QUERY = gql`
 query checkedServices( $admin: String!) {
    checkedServices(param: {
    admin: $admin, 
    }) {
    id, name, checked, url
   }
 }
`;


export const CREATE_SERVICE_MUTATION = gql`
  mutation createService( $name: String!, $url: String!, $role: Float!) {
    createService(param: {
     name: $name, 
     url: $url, 
     role: $role, 
     }) {
     name, id, url
    }
  }
 `;


export const UPDATE_SERVICE_MUTATION = gql`
  mutation updateService( $id: String!, $name: String!,$url: String!,$role: Float!) {
    updateService(param: {
     id: $id,
     name: $name, 
     url: $url, 
     role: $role, 
     }) {
     name, id
    }
  }
 `;


export const DELETE_SERVICE_MUTATION = gql`
  mutation deleteService( $id: String!) {
    deleteService(param: {
     id: $id,
     })
     {
        name
     }
  }
 `;
