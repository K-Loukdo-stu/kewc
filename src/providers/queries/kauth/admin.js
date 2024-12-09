/**
 * Define query nad mutation
 */
import { gql } from '@apollo/client/core';

export const GET_ADMINS_QUERY = gql`
 query admins{
    admins{
    email, 
    firstName, 
    lastName,
    id,
    username
  }
}
`;


export const GET_SEARCH_ADMINS_QUERY = gql`
 query searchAdmins( $currentPage: Float!, $searchText: String! ){
  searchAdmins(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      admins {id, username, firstName, lastName, email, activated, role, sex, dateOfBirth, phone},
      adminsCount
     }
 }
 `;



// export const GET_ADMIN_QUERY = gql`
//  query searchAdmins( $id: String! ){
//   searchAdmins(
//      param:{
//       currentPage: $currentPage,
//       searchText: $searchText
//      }
//      )
//      {
//       admins {id, username, firstName, lastName, email, activated, role, sex, dateOfBirth, phone},
//       adminsCount
//      }
//  }
//  `;


export const GET_ADMIN_QUERY = gql`
 query admin( $uid: String! ){
  admin(
     param:{
      id: $uid,
     }
     )
     {
      id, username, firstName, lastName, email, activated, role, sex, dateOfBirth, phone
     }
 }
 `;



export const CREATE_ADMIN_MUTATION = gql`
  mutation createAdmin( $username: String!,$firstName:String!,$lastName:String!,$email:String!,$activated:Boolean!, $role:Float!, $phone:String!, $password:String!,$sex:String!,$dateOfBirth:String!) {
    createAdmin(param: {
    username: $username, 
    firstName: $firstName,
    lastName:  $lastName,
    email: $email,
    activated: $activated,
    role: $role, 
    phone: $phone,
    password: $password,
    sex: $sex,
    dateOfBirth: $dateOfBirth,
     }) {
     id
    }
  }
 `;


export const UPDATE_ADMIN_MUTATION = gql`
mutation updateAdmin( $id: String!, $username: String!,$firstName:String!,$lastName:String!,$country:String!,$activated:Boolean!, $role:Float!, $phone:String!, $password:String!,$sex:String!,$dateOfBirth:String!) {
  updateAdmin(param: {
  id: $id, 
  username: $username, 
  firstName: $firstName,
  lastName:  $lastName,
  activated: $activated,
  role: $role, 
  phone: $phone,
  password: $password,
  sex: $sex,
  dateOfBirth: $dateOfBirth,
  country: $country
   }) {
   id
  }
}
`;


// export const GET_USERS_QUERY = gql`
//  query users{
//   users {
//       id,
//       email
//       username
//   }
// }
// `;
