import { useEffect, useState } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
 
const [todos,setTodos]=useState([]);
const [todoValue,setTodoValue]=useState("");

function handleAddTodo(newTodo)
{
  const newTodoList=[...todos,newTodo];
  parseData(newTodoList);
  setTodos(newTodoList);
}
function handleDeleteTodo(index)
{
  const newTodoList =todos.filter((todo,todoIndex)=>{
    return todoIndex!==index;
  })
  parseData(newTodoList);
  setTodos(newTodoList);
}
function handleEditTodo(index)
{
  const valueEdited=todos[index];
  setTodoValue(valueEdited);
  handleDeleteTodo(index);
}
useEffect(()=>{
  //check locolStorage exist
  if(!localStorage)
    return 
  let localTodos=localStorage.getItem('todos');
  if(!localTodos)
    return 
  
  localTodos=JSON.parse(localTodos).todos;
  setTodos(localTodos)
},[])
function parseData(newList)
{
  localStorage.setItem('todos',JSON.stringify({todos:newList}))
}
  return (
    <>
     <TodoInput  handleAddTodo={handleAddTodo} todoValue={todoValue} setTodoValue={setTodoValue}/>
     <TodoList todos={todos} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo}/>
      </>
  )
}

export default App
