import { gql } from '@apollo/client/core';


export const GET_ALL_KLOUKDO_PROMOTION_QUERY = gql`
query getAllKLoukdoPromotions( $page: Float! ){
    getAllKLoukdoPromotions(page: $page){
    id
    product {name category{name} subCategory{name}}
    endDate
  }
}
`;

export const GET_RANDOM_KLOUKDO_PROMOTION_QUERY =gql`
query getKLoukdoPromotionRandom {
    getKLoukdoPromotionRandom
    {
        id
        product {
            id
            name
            category{name}
            subCategory{name}
            price{
                name
                price
            }
            photos
        }
        endDate
    }
}
`;

export const DELETE_KLOUKDO_PROMOTION_MUTATION = gql`
mutation deleteKLoukdoPromotion ($id: String!){
    deleteKLoukdoPromotion(
        params: {
            id: $id
        }
    ),
    {
        product {name}
    }
}
`;

export const CREATE_KLOUKDO_PROMOTION_MUTATION = gql`
mutation createKLoukdoPromotion ($product: String!, $endDate: DateTime!){
    createKLoukdoPromotion(
        params: {
            product: $product
            endDate: $endDate
        }
    ),
    {
        id
        product {id name}
    }
}
`;

export const UPDATE_KLOUKDO_PROMOTION_MUTATION = gql`
mutation updateKLoukdoPromotion ($id: String!, $endDate: DateTime!){
    updateKLoukdoPromotion (
        params: {
            id: $id
            endDate: $endDate
        }
    ),{
        endDate
    }

}
`;