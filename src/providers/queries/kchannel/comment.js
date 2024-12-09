import { gql } from '@apollo/client/core';


/**
 *  POST
 */


export const GET_COMMENTS_BY_POST_QUERY = gql`
 query getCommentsbyPost( $post: String!, $currentPage: Float! ){
  getCommentsbyPost(
     params:{
      post: $post,
      currentPage: $currentPage,
     }
     )
     {
      id
      text, 
      createdAt,
      isAdmin,
      user{id, username}
     }
 }
 `;


export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment( $post: String!, $text: String!, $user: String!) {
    createComment(params: {
     post: $post, 
     text: $text,
     user: $user,
     }) {
     text, user{id}
    }
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment( $id: String!) {
    deleteComment(params:{
      id: $id
     }){
      id
    }
  }
 `;