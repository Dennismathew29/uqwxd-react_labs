//React Todolist Application Code

import React from "react";
import "./App.css";
const App = () => {

  const [todos, setTodos] = React.useState([]);   //todos is the state,  setTodos is the function that updates the state value.
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");


  // Add the handlesubmit code here

  function handleSubmit(e) {

    e.preventDefault();     //This prevents the form from submitting and refreshing the page.
    const newTodo = {       //This creates a new todo item object that will be added to the todos array.
      id: new Date().getTime(),
      text: todo.trim(),      //This sets the text property of the new todo item to the current value of the todo variable, with any leading or trailing whitespace removed.
      completed: false,        //This sets the completed property of the new todo item to false.
    };
    if (newTodo.text.length > 0) {         ////This checks if the text property of the new todo item is not empty.
      setTodos([...todos].concat(newTodo));     //If the text property of the new todo item is not empty, this updates the todos variable to a new array that includes all the existing todo items plus the new todo item.
      setTodo("");          //This sets the todo variable back to an empty string, clearing the input field.

    } else {

      alert("Enter Valid Task");
      setTodo("");
    }
  }



  // Add the deleteToDo code here
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id)
    setTodos(updatedTodos);
  }

  // Add the toggleComplete code here
  //add a checkbox to mark task completion

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }




  // Add the submitEdits code here
  function submitEdits(id) {
    const updatedTools = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTools);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input                ////inside the form, there is an input element that has a type of "text". It also has an onChange event handler that is set to a function that updates the todo variable with the current value of the input field.
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}

            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
