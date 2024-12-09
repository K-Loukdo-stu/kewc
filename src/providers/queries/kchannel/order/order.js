import { gql } from '@apollo/client/core';

/**
 *  ORDER 
 */
export const LOAD_ORDER_CART_QUERY = gql`
	query loadOrderCart(
    $channel: String!
    ) {
    loadOrderCart(params: {
      channel: $channel
    }){
      id
      inProcessStatus
      subTotal
      discount
      delivery
      total
      acceptingCurrency
      usdExchangeRateInRiel
      user {
          id
      }
      channel {
          id
      }
      orderLines {
        id
        price
        qty
        shortDesc
        product
        clonedProduct
        clonedBasePrice
        clonedOptions
      }
    }
  }
`;

export const CHECKOUT_A_CART_MUTATION = gql`
	mutation checkoutCart( 
    $orderId: String!, 
    $subTotal: Float!, 
    $discount: Float!, 
    $delivery: Float!, 
    $total: Float!,
    $acceptingCurrency: String!,
    $usdExchangeRateInRiel: Float!,
    $hasCurrencyConversion: Boolean!
  ) {
    checkoutCart(params: { 
      orderId: $orderId,
      subTotal: $subTotal,
      discount: $discount,
      delivery: $delivery,
      total: $total,
      acceptingCurrency: $acceptingCurrency,
      usdExchangeRateInRiel: $usdExchangeRateInRiel,
      hasCurrencyConversion: $hasCurrencyConversion
    }){
      id
      inProcessStatus
      subTotal
      discount
      delivery
      total
      user { id }
      channel { id }
    }
  }
`;

export const LOAD_ORDER_SUMMARY_QUERY = gql`
	query orderSummary(
    $orderId: String!
    ) {
      orderSummary(param:{
        orderId: $orderId
      }){
        id
        inProcessStatus
        subTotal
        discount
        delivery
        total
        acceptingCurrency
        usdExchangeRateInRiel
        hasCurrencyConversion
        user {
            id
        }
        channel {
            id
        }
        orderLines{
            id
            price
            qty
            order
            shortDesc
            product
            choiceKey
            currency
            clonedBasePrice
            clonedProduct
        }
      }
  }
`;


export const LOARD_ORDERING_SUMARRY_QUERY = gql`
	query listOrderingSummary(
    $channel: String!
    $inProcessStatus: String!
    ) {
      listOrderingSummary(param:{
        channel: $channel
        inProcessStatus: $inProcessStatus
      }){
        id
        inProcessStatus
        lastModifyAt
        subTotal
        discount
        delivery
        acceptingCurrency
        usdExchangeRateInRiel
        total
        user {
            id,
            firstName,
            lastName,
            photo
        }
        channel {
            id
        }
        orderLines{
            id
            price
            qty
            shortDesc
            product
            clonedProduct
            clonedBasePrice
            clonedOptions
        }
      }
  }
`;

export const UPDATE_STATUS_ORDER_MUTATION = gql`
	mutation updateStatusOrder( 
    $id: String!, 
    $status: String!
  ) {
    updateStatusOrder(params: { 
      id: $id,
      status: $status,
    }){
      id
      inProcessStatus
      subTotal
      discount
      delivery
      acceptingCurrency
      usdExchangeRateInRiel
      total
    }
  }
`;