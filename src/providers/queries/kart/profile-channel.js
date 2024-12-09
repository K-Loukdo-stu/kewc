import { gql } from '@apollo/client/core';


export const GET_SEARCH_PROFILE_CHANNELS_QUERY = gql`
 query searchProfileChannels( $currentPage: Float!, $searchText: String! ){
  searchProfileChannels(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      profileChannels{id, name, file}, 
      profileChannelCount
     }
 }
 `;

export const CREATE_PROFILE_CHANNEL_MUTATION = gql`
  mutation createProfileChannel( $name: String!,$file: JSON!) {
    createProfileChannel(param: {
     name: $name, 
     file: $file,
     }) {
     name
    }
  }
 `;

export const UPDATE_PROFILE_CHANNEL_MUTATION = gql`
  mutation updateProfileChannel( $id: String!, $name: String!,$file: JSON!) {
    updateProfileChannel(param: {
     id: $id, 
     name: $name, 
     file: $file,
     }) {
     name
    }
  }
 `;

export const DELETE_PROFILE_CHANNEL_MUTATION = gql`
  mutation deleteProfileChannel( $id: String!) {
    deleteProfileChannel(param:{
      id: $id
     }){
     name
    }
  }
 `;
