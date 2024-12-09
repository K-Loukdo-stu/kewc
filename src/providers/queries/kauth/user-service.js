/**
 * Define query nad mutation
 */
import { gql } from '@apollo/client/core';


export const CREATE_MANY_USER_SERVICE_MUTATION = gql`
 mutation createManyUserService( $admin: String!,$services:[String!]!) {
    createManyUserService(param: {
        admin: $admin, 
        services: $services,
    }) {
    id
   }
 }
`;



export const CREATE_USER_SERVICE_MUTATION = gql`
 mutation createUserService( $admin: String!,$service:String!) {
  createUserService(param: {
        admin: $admin, 
        service: $service,
    }) {
    id
   }
 }
`;


export const DELETE_USER_SERVICE_MUTATION = gql`
 mutation deleteUserService( $id: String!) {
  deleteUserService(param: {
        id: $id, 
    }) {
    id
   }
 }
`;


export const DELETE_USER_SERVICE_BY_SERVICE_MUTATION = gql`
 mutation deleteUserServiceByService( $admin: String!, $service:String!) {
  deleteUserServiceByService(param: {
        admin: $admin, 
        service: $service,
    }) {
    id
   }
 }
`;


export const GET_USER_SERVICE_BY_ADMIN_QUERY = gql`
 query findByAdmin( $admin: String!) {
  findByAdmin(param: {
    admin: $admin, 
    }) {
    id, service{id,name, url, role}, admin{id}
   }
 }
`;

