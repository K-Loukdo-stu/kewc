import { gql } from '@apollo/client/core';


/**
 *  POST
 */





export const DELETE_LIKE_MUTATION = gql`
  mutation deleteLike( $id: String!) {
    deleteLike(params: {
      id: $id, 
     }) {
     id
    }
  }
`;