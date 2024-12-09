/**
 * Define query nad mutation
 */
import { gql } from '@apollo/client/core/core.cjs';

export const ME_QUERY = gql`
  query me{
    me{email, username, firstName, lastName, role, id, serviceRoles}
  }
`;

export const SIGN_IN_MUTATION = gql`
 mutation signIn( $email: String!, $password: String!) {
  signIn(param: { email: $email, password: $password }) {
    email, username, firstName, lastName, role
   }
 }
`;

export const SIGN_OUT_MUTATION = gql`
 mutation signOut{
  signOut
 }
`;


export const SIGN_UP_MUTATION = gql`
 mutation adminSignUp( $username: String!,$email: String!,$lastName:String!,$firstName:String!) {
  # let email = new String($username)
  # console.log(email)
  adminSignUp(param: {
    username: $username, 
    password: "pwd",
    email:  $email,
    firstName: $firstName,
    lastName: $lastName}) {
    username,email
   }
 }
`;