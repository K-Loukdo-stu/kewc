import { gql } from '@apollo/client/core';

/**
 *  ORDER LINE
 */
export const GET_ORDER_LINE_TOTAL_QUERY = gql`
	query orderLineTotal($channel: String!) {
    orderLineTotal(param:{
      channel: $channel
    })
  }
`;

export const UPDATE_ORDER_LINE_QUANTITY_MUTATION = gql`
	mutation updateOrderLineQuantity($id: String!, $quantity: Float!) {
    updateOrderLineQuantity(params: {
      id: $id,
      quantity: $quantity
    }){
      id
      price
      qty
      shortDesc
      order { id }
      product
      clonedProduct
      clonedBasePrice
      clonedOptions
    }
  }
`;

export const CREATE_ORDER_LINE_BY_CHANNEL_MUTATION = gql`
	mutation createOrderLineByChannel(
    $channel: String!, 
    $product: String!, 
    $qty: Float!, 
    $price: Float!, 
    $currency: String!,
    $clonedProduct: JSON!,
    $clonedBasePrice: JSON!,
    $clonedOptions: [JSON!],
    ) {
    createOrderLineByChannel(params: {
      channel: $channel,
      orderLine: {
          product: $product,
          qty: $qty,
          price: $price,
          currency: $currency,
          clonedProduct: $clonedProduct,
          clonedBasePrice: $clonedBasePrice,
          clonedOptions:$clonedOptions,
      }
    }){
      id
      price
      qty
      order {
          id
      }
      shortDesc
      product
      clonedProduct
      clonedBasePrice
      clonedOptions
    }
  }
`;


export const DELETE_ORDER_LINE_MUTATION = gql`
	mutation deleteOrderLine($id: String!) {
    deleteOrderLine(params: {
    id: $id,
    }){
      id
      price
      qty
      order {
          id
      }
      product
      clonedProduct
      clonedBasePrice
      clonedOptions
    }
  }
`;

export const UNAVAILABLE_ORDER_LINES_BY_ORDER_QUERY = gql`
	query unavailableOrderLineByOrder($orderId: String!) {
    unavailableOrderLineByOrder(params:{
      orderId: $orderId
    }){
      id
      price
      qty
      order { id }
      product
      clonedProduct
      clonedBasePrice
      clonedOptions
    }
  }
`;