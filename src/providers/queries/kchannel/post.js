import { gql } from '@apollo/client/core';


/**
 *  POST
 */

export const GET_RECENT_POSTS_BY_CHANNEL_QUERY = gql`
 query recentPostsByChannel( $channel: String!, $limit: Float!, $pastDays: Float!){
  recentPostsByChannel(params:{
      channel: $channel,
      limit:  $limit,
      pastDays: $pastDays
     })
     {
      id
      type, 
      content,
      createdAt,
      user{id, username},
      channel{id}
     }
 }
 `;

export const GET_POSTS_BY_CHANNEL_QUERY = gql`
 query getPostsbyChannel( $channel: String!, $currentPage: Float! ){
  getPostsbyChannel(
     params:{
      channel: $channel,
      currentPage: $currentPage,
     }
     )
     {
      id
      type, 
      content,
      createdAt,
      user{id, username},
      channel{id, profile, name}
     }
 }
 `;

export const GET_POSTS_QUERY = gql`
 query post( $id: String! ){
  post(
     params:{
      id: $id,
     }
     )
     {
      id
      type, 
      content,
      createdAt,
      channel{id, profile, name},
      user{id, username}
     }
 }
`;


export const GET_POST_DETAIL_QUERY = gql`
 query postDetail( $post: String! ){
  postDetail(
     params:{
      post: $post,
     }
     )
    {
      id, 
      type, 
      content, 
      commentNum, 
      likeNum, 
      createdAt, 
      channel{id, profile, name}, 
      user{id, username}, 
      myLike{id, user, post}
    }
 }
`;


export const GET_POSTS_PAGINATION_QUERY = gql`
 query postPagination( $channel: String!, $limit: Float!, $pageNum: Float! ){
  postPagination(
     params:{
      channel: $channel,
      pageNum: $pageNum,
      limit: $limit,
     }
     )
     {
      posts{
        id, 
        type, 
        content, 
        commentNum, 
        likeNum, 
        createdAt, 
        channel{id, profile, name}, 
        user{id, username}, 
        myLike{id, user, post}
      }, 
      count
     }
 }
 `;


 export const GET_POSTS_PAGINATION_BY_USER_QUERY = gql`
 query postsPaginationByUser( $userId: String!, $limit: Float!, $pageNum: Float! ){
  postsPaginationByUser(
     params:{
      userId: $userId,
      pageNum: $pageNum,
      limit: $limit,
     }
     )
     {
      posts{
        id, 
        type, 
        content, 
        commentNum, 
        likeNum, 
        createdAt, 
        channel{id, profile, name}, 
        user{id, username}, 
        myLike{id, user, post}
      }, 
      count
     }
 }
 `;


export const DELETE_POST_MUTATION = gql`
  mutation deletePost( $id: String!) {
    deletePost(params:{
      id: $id
     }){
      id, 
      type, 
      content, 
      commentNum, 
      likeNum, 
      createdAt, 
      channel{id, profile, name}, 
      user{id, username}, 
      myLike{id, user, post}
    }
  }
 `;

export const DELETE_POST_COMMENT_MUTATION = gql`
  mutation deletePostComment( $id: String!, $post: String!) {
    deletePostComment(params:{
      id: $id,
      post: $post,
     }){
      id, 
      type, 
      content, 
      commentNum, 
      likeNum, 
      createdAt, 
      channel{id, profile, name}, 
      user{id, username}, 
      myLike{id, user, post}
    }
  }
 `;


export const LIKE_POST_MUTATION = gql`
  mutation likePost( $post: String!, $isLike: Boolean!) {
    likePost(params: {
     post: $post, 
     isLike: $isLike,
     }) 
    {
      id, 
      type, 
      content, 
      commentNum, 
      likeNum, 
      createdAt, 
      channel{id, profile, name}, 
      user{id, username}, 
      myLike{id, user, post}
    }
  }
`;



export const COMMENT_POST_MUTATION = gql`
  mutation commentPost( $post: String!, $text: String!,  $isAdmin: Boolean!) {
    commentPost(params: {
     post: $post, 
     text: $text,
     isAdmin: $isAdmin,
     }) 
    {
      post{
        id, 
        type, 
        content, 
        commentNum, 
        likeNum, 
        createdAt, 
        channel{id, profile, name}, 
        user{id, username}, 
        myLike{id, user, post}
      },
      comment{
        id
        text, 
        createdAt,
        isAdmin,
        user{id, username}
      }
    }
  }
`;


export const REPLY_COMMENT_POST_MUTATION = gql`
  mutation commentPost( $post: String!, $text: String!, $parent: String!) {
    commentPost(params: {
     post: $post, 
     text: $text,
     parent: $parent,
     }) 
    {
      post{
        id, 
        type, 
        content, 
        commentNum, 
        likeNum, 
        createdAt, 
        channel{id, profile, name}, 
        user{id, username}, 
        myLike{id, user, post}
      },
      comment{
        id
        text, 
        createdAt,
        user{id, username}
      }
    }
  }
`;


export const CREATE_POST_MUTATION = gql`
  mutation createPost( $channel: String!, $content: JSON!, $type: String!) {
    createPost(params: {
      channel: $channel, 
      content: $content, 
      type: $type,
     }) 
     {
      id, 
      type, 
      content, 
      commentNum, 
      likeNum, 
      createdAt, 
      channel{id, profile, name}, 
      user{id, username}, 
      myLike{id, user, post}
    }
  }
`;


export const GET_LINK_QUERY = gql`
 query linkMetaData( $text: String!){
  linkMetaData(
     params:{
      text: $text,
     }
     )
     {
      text, 
      data
     }
 }
 `;