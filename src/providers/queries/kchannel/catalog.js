import { gql } from '@apollo/client/core';


/**
 *  CHANNEL CATALOG
 */


export const GET_CHANNEL_CATALOGS_QUERY = gql`
 query channelCatalogs{
   channelCatalogs{
      id
      name
  }
 }
 `;
