import React from 'react'
import{ useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TODOS } from './graphql';
import { useRef } from 'react';
// import '../node_modules/tailwindcss/src/css'
import { CREATE_TODO,UPDATE_TODO,DELETE_TODO} from './graphql';
function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editMode,setEditMode] = useState(false)
  const inputRef =useRef(null)
  const [editId,setEditId] = useState('')
  const { loading, error, data } = useQuery(GET_TODOS);
  const [createTodo, { creatEloading, create_error }] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const handleAddTodo = () => {
    if(title&&description){
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
    }
  };
  
  const handleUpdateTodo = (id) => {
    inputRef.current.focus
   if(title||description){
    updateTodo({
      variables: { id:id, input: { title: title, description:description } },
    })
      .then(() => {
        setTitle('');
        setDescription('');
        alert('Todo updated successfully');
      })
      .catch(err => {
        console.error(err);
      });
   }
      setEditMode(false)
  };
  const handleDeleteTodo = async(id) => {
    // deleteTodo({
    //   variables: { id:id},
    // })
    //   .then(() => {
    //     alert('Todo deleted successfully');
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  try{ await deleteTodo({
    variables: { id:id},
  })
  alert('Todo deleted successfully')
}catch(err){
    console.log(err)
   
  }
  };
  // console.log(data.todos[0].title)
  return (
    <div className='w-full h-full mt-14 flex justify-center items-center flex-col gap-5'>
      <div className='rounded-lg bg-white shadow-md px-14 py-5 w-[70%] flex flex-col items-center gap-5' >
      <h1 className='text-xl font-semibold'>Create your Todo list</h1>
        <input ref={inputRef} className='w-full py-3 px-3 bg-gray-100 focus:outline-0 rounded-lg' value={title} type="text" placeholder='Title goes in here' onChange={(e)=>setTitle(e.target.value)}/>
        <textarea className='bg-gray-200 w-full focus:outline-0 p-3 rounded-lg'value={description} cols="30" rows="4" placeholder='Enter Description' onChange={(e)=>setDescription(e.target.value)}></textarea>
        {editMode?(<button className='w-full basis-1/4 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-500 py-3 rounded-lg' onClick={()=>handleUpdateTodo(editId)}>Update Todo</button>):(<button className='w-full basis-1/4 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-500 py-3 rounded-lg' onClick={handleAddTodo}>Submit</button>)}
          
      </div>
        {data?.todos?.length!=0&&
      <div className='rounded-lg bg-white shadow-md px-14 py-5 w-[70%] flex flex-col items-center gap-5 h-full '  >
        {data?.todos?.map((data)=><div key={data?.id} className='w-full bg-gray-50 shadow-lg p-3 flex gap-2 flex-col'>
          <p>Title : {data?.title}</p>
          <p>Description : {data?.description}</p>
          <div className='flex gap-2'>
            <button className='px-5 py-2 rounded-md drop-shadow-md bg-green-200 ' onClick={()=>{setEditMode(true);setEditId(data?.id)}}>Edit</button>
            <button className='px-5 py-2 rounded-md drop-shadow-md bg-red-200  ' onClick={()=>handleDeleteTodo(data?.id)}>Delete</button>
            
          </div>
        </div>)}

      </div>
        }
    </div>
  )
}

export default App