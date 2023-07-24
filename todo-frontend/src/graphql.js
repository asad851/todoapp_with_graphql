
import {gql} from '@apollo/client';

// GraphQL queries and mutations
export const GET_TODOS = gql`
  query {
    todos {
      id
      title
      description
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($input: TodoInput!) {
    createTodo(input: $input) {
      id
      title
      description
      completed
    }
  }
`;
export const UPDATE_TODO = gql`
  mutation UpdateTodo($id:ID!, $input: TodoInput!) {
    updateTodo(id: $id, input: $input) {
      id
      title
      description
    }
  }
`
// export const UPDATE_COMPLETION=gql`
//    mutation UpdateCompletion($id:ID!,$input:TodoInput!){
//     updateCompletion(id: $id, input: $input){
//       id
//       title
//       description
//       completed
//     }
//    }
// `



export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`
