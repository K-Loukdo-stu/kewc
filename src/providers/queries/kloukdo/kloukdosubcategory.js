import { gql } from '@apollo/client/core';

export const CREATE_KLOUKDO_SUB_CATEGORY_MUTATION = gql`
    mutation createKLoukdoSubCategory( $name: String!, $category: String!, $icon: String ){
        createKLoukdoSubCategory(
            params: {
                name: $name,
                category: $category,
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

export const GET_KLOUKDO_SUB_CATEGORY_BY_PAGE_QUERY = gql`
query getKLoukdoSubCategoriesByPage( $page: Float! ){
    getKLoukdoSubCategoriesByPage (page: $page){
        id
        name
        category { name }
        icon
    }
}
`;

export const GET_KLOUKDO_SUB_CATEGORY_BY_CATEGORY_QUERY = gql`
query getKLoukdoSubCategoriesByCategory( $category: String! ){
    getKLoukdoSubCategoriesByCategory (
        params: {
            category: $category
        }
    ),{
        id
        name
        category { name }
        icon
    }
}
`;

export const GET_KLOUKDO_SUB_CATEGORY_QUERY = gql`
query getKLoukdoSubCategories{
    getKLoukdoSubCategories{
        id
        name
        category { name }
        icon
    }
}
`;

export const UPDATE_KLOUKDO_SUB_CATEGORY_MUTATION = gql`
mutation updateKLoukdoSubCategory ($id: String!, $name: String, $category: String, $icon: String){
    updateKLoukdoSubCategory(
        params: {
            id: $id,
            name: $name,
            category: $category
            icon: $icon
        }
    ),
    {
        name
        category { name }
        icon
    }
}
`;

export const DELETE_KLOUKDO_SUB_CATEGORY_MUTATION = gql`
mutation deleteKLoukdoSubCategory ($id: String!){
    deleteKLoukdoSubCategory(
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