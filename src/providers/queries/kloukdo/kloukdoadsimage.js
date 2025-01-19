import { gql } from '@apollo/client/core';

// export const GET_KLOUKDO_ADS_IMAGE_QUERY = gql`
// query getKLoukdoAdvertisementImage {
//     getKLoukdoAdvertisementImage
//     {
//         id
//         name
//         endDate
// }}
// `;

export const GET_ALL_KLOUKDO_ADS_IMAGE_QUERY = gql`
query getAllKLoukdoAdvertisementImage ( $page: Float! ) {
    getAllKLoukdoAdvertisementImage (
        page: $page
    )
    {
        id
        name
        image
        endDate
    }
}
`;

export const UPDATE_KLOUKDO_ADS_IMAGE_MUTATION = gql`
mutation updateKLoukdoAdvertisementImage ( $id: String!, $name: String!, $endDate: DateTime) {
    updateKLoukdoAdvertisementImage (
        params: {
            id: $id,
            name: $name,
            endDate: $endDate
        }
    ),
    {
        name
    }
}
`;

export const DELETE_KLOUKDO_ADS_IMGAE_MUTATION = gql`
mutation deleteKLoukdoAdvertisementImage ($id: String!){
    deleteKLoukdoAdvertisementImage(
        params: {
            id: $id
        }
    ),
    {
        name
    }
}
`;

export const CREATE_KLOUKDO_ADS_IMAGE_MUTATION = gql`
mutation createKLoukdoAdvertisementImage ($name: String!, $endDate: DateTime!, $image: JSON!){
    createKLoukdoAdvertisementImage(
        params: {
            name: $name,
            image: $image,
            endDate: $endDate
        }
    ),
    {
        name
    }
}
`;