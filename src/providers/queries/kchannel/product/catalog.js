import { gql } from '@apollo/client/core';


/**
 *  CHANNEL
 */


export const GET_SEARCH_CHANNEL_CATALOG_QUERY = gql`
 query searchChannelCatalogs( $currentPage: Float!, $searchText: String! ){
   searchChannelCatalogs(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      channelCatalogs{id, name}, 
      channelCatalogsCount
     }
 }
 `;



export const CREATE_CHANNEL_CATALOG_MUTATION = gql`
  mutation createChannelCatalog( $name: String!) {
   createChannelCatalog(params: {
     name: $name, 
     }) {
     name
    }
  }
 `;