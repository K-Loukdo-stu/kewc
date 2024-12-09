import { gql } from '@apollo/client/core';


/**
 * SUB OPTION
 */



export const GET_SUB_OPTIONS_BY_OPTION_QUERY = gql`
 query subOptionsByOption( $option: String! ){
  subOptionsByOption(
     params:{
      option: $option,
     }
     )
     {
      id
      name
      price
      currency
      option
     }
 }
 `;


export const CREATE_SUB_PRODUCT_MUTATION = gql`
  mutation createSubOption( $name: String!, $option: String!, $price: Float!, $currency: String!, $product: String!) {
    createSubOption(params: {
     name: $name, 
     price: $price, 
     option: $option,
     currency: $currency,
     product: $product,
     }) {
      id
      name
      price
      currency
      option
    }
  }
 `;

export const UPDATE_SUB_OPTION_MUTATION = gql`
  mutation updateSubOption( $id: String!, $name: String!,$price: Float!, $currency: String!) {
    updateSubOption(params: {
     id: $id, 
     name: $name, 
     price: $price, 
     currency: $currency,
     }) {
      id
      name
      price
      currency
      option
    }
  }
 `;

export const DELETE_SUB_OPTION_MUTATION = gql`
  mutation deleteSubOption( $id: String!) {
    deleteSubOption(params:{
      id: $id
     }){
      id
      name
      price
      currency
      option
    }
  }
 `;