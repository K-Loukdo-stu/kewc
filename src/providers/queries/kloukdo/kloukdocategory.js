import { gql } from '@apollo/client/core';

export const CREATE_KLOUKDO_CATEGORY_MUTATION = gql`
    mutation createKLoukdoCategory( $name: String!, $icon: String ){
        createKLoukdoCategory(
            params: {
                name: $name,
                icon: $icon
            }
        ),
        {
            id
            name
            icon
        }
    }
    `;

export const GET_KLOUKDO_CATEGORY_QUERY = gql`
query getKLoukdoCategories{
    getKLoukdoCategories{
        id
        name
        icon
    }
}
    
`;

export const UPDATE_KLOUKDO_CATEGORY_MUTATION = gql`
mutation updateKLoukdoCategory ($id: String!, $name: String, $icon: String){
    updateKLoukdoCategory(
        params: {
            id: $id,
            name: $name,
            icon: $icon
        }
    ),
    {
        name
        icon
    }
}
`;

export const DELETE_KLOUKDO_CATEGORY_MUTATION = gql`
mutation deleteKLoukdoCategory ($id: String!){
    deleteKLoukdoCategory(
        params: {
            id: $id
        }
    ),
    {
        name
        icon
    }
}
`;