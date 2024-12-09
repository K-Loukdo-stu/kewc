import { gql } from '@apollo/client/core';


/**
 *  CHANNEL
 */


export const GET_SEARCH_CHANNEL_QUERY = gql`
 query searchChannels( $currentPage: Float!, $searchText: String! ){
  searchChannels(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      channels {id, name, type, desc, phone, email, website, bio, profile},
      channelsCount
     }
 }
 `;



export const GET_CHANNEL_QUERY = gql`
 query channel( $id: String! ){
    channel(
    id: $id,
     )
     {
        id, name, type, desc, phone, email, website, bio, profile
     }
 }
 `;
