import { gql } from '@apollo/client/core';


/**
 *  OPTION
 */



export const GET_PRODUCT_OPTION_BY_PRODUCT_QUERY = gql`
 query productOptionsByProduct( $product: String! ){
  productOptionsByProduct(
     params:{
      product: $product,
     }
     )
     {
      id
      name
      type
      product
      subOptions{
            id
            name
            price
            currency
        }
     }
 }
 `;


export const CREATE_PRODUCT_OPTION_MUTATION = gql`
  mutation createProductOption( $name: String!, $type: String!, $product: String!) {
    createProductOption(params: {
     name: $name, 
     type: $type, 
     product: $product,
     }) {
      id
      name
      type
      product
    }
  }
 `;


export const UPDATE_PRODUCT_OPTION_MUTATION = gql`
  mutation updateProductOption( $id: String!, $type: String!, $name: String!) {
    updateProductOption(params: {
     id: $id, 
     name: $name, 
     type: $type, 
     }) {
      id
      name
      type
      product
    }
  }
 `;

export const DELETE_PRODUCT_OPTION_MUTATION = gql`
  mutation deleteProductOption( $id: String!) {
    deleteProductOption(params:{
      id: $id
     }){
      id
      name
      type
      product
    }
  }
 `;
