import { gql } from '@apollo/client/core';

export const GET_CHANNEL_EXTENSIONS_QUERY = gql`
 query channelExtensions($channel: String!){
    channelExtensions(params: {
    channel: $channel,
  }){
    id
    name
    desc
    keyname
  }
 }
 `;