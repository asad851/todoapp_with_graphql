import React from 'react'
import{ useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TODOS } from './graphql';
import { CREATE_TODO,UPDATE_TODO,DELETE_TODO} from './graphql';
function App() {
  const [title, setTitle] = useState('apollo');
  const [description, setDescription] = useState('apollo is a great server');
  
  const { loading, error, data } = useQuery(GET_TODOS);
  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const handleAddTodo = () => {
    createTodo({
      variables: { input: { title, description } },
    })
      .then(() => {
        setTitle('');
        setDescription('');
      })
      .catch(err => {
        console.error(err);
      });
  };
  const handleUpdateTodo = () => {
    updateTodo({
      variables: { id:'4', input: { title: "hello", description:"this is graphql" } },
    })
      .then(() => {
        console.log('Todo updated successfully');
      })
      .catch(err => {
        console.error(err);
      });
  };
  const handleDeleteTodo = () => {
    deleteTodo({
      variables: { id:4},
    })
      .then(() => {
        console.log('Todo deleted successfully');
      })
      .catch(err => {
        console.error(err);
      });
  };
  console.log(data)
  return (
    <div>App
      <button onClick={()=>handleAddTodo()}>button</button>
      <button onClick={()=>handleUpdateTodo()}>update</button>
      <button onClick={()=>handleDeleteTodo()}>delete</button>

    </div>
  )
}

export default App