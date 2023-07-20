const express = require('express');
const { buildSchema, graphql } = require('graphql');
const { graphqlHTTP  } = require('express-graphql');
const cors =require('cors')

// In-memory array to store todos
let todos = [];

// Define the GraphQL schema
const schema = buildSchema(`
  type Todo {
    id: ID!
    title: String!
    description: String!
  }

  input TodoInput {
    title: String!
    description: String!
  }

  type Query {
    todos: [Todo]
    todoById(id: ID!): Todo
    todoByTitle(title:String!):Todo
  }

  type Mutation {
    createTodo(input: TodoInput!): Todo
    updateTodo(id: ID!, input: TodoInput!): Todo
    deleteTodo(id: ID!): String
  }
`);

// Define the GraphQL resolver
const root = {
  todos: () => todos,
  todoById: ({ id }) => todos.find(todo => todo.id === id),
  todoByTitle: ({ title }) => todos.find(todo => todo.title === title),
  createTodo: ({ input }) => {
    const todo = {
      id: String(todos.length + 1),
      title: input.title,
      description: input.description,
    };
    todos.push(todo);
    return todo;
  },
  updateTodo: ({ id, input }) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      const todo = {
        id,
        title: input.title,
        description: input.description,
      };
      todos[todoIndex] = todo;
      return todo;
    }
    return null;
  },
  deleteTodo: ({ id }) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      return 'Todo deleted successfully';
    }
    return 'Todo not found';
  },
};

// Create an Express app
const app = express();
app.use(express.json());
app.use(cors())
// Set up the GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP ({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL GUI for testing purposes
  })
);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
