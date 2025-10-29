import './App.css'
import { useState, useEffect } from 'react';
import { getTodos, addTodo as addTodoAPI, deleteTodo as deleteTodoAPI, updateTodo as updateTodoAPI } from "./apis.jsx";
import Input from './_components/input.jsx';
import Buttons from './_components/buttons.jsx';

function Lists() {

  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  
  useEffect(() => {
    async function fetchTodos() {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        console.error("Failed to fetch todos:", err)
      }
    }
    fetchTodos();
  }, []);

  async function handleAddTodo(title) {
    try {
      const newTodo = {
        todo: title,
        completed: false,
        id : Date.now()
      }
      const savedTodo = await addTodoAPI(newTodo);
      setTodos([...todos, savedTodo]);
    } catch (err) {
      console.error("Failed to add todo:", err)
    }
  }

  async function deleteTodo(id) {
    try {
      await deleteTodoAPI(id);
      setTodos(todos.filter((todo) => (todo.id !== id)));
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  }

  function startEdit(id, currentTitle) {
    setEditId(id);
    setEditValue(currentTitle);
  }

  async function saveEdit(id) {
    try {
      const updatedTodo = await updateTodoAPI(id, { todo: editValue });
      setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? updatedTodo : todo));
      setEditId(null);
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  }

  async function onToggle(id, currentStatus) {
    try {
      const updatedTodo = await updateTodoAPI(id, { completed: !currentStatus });
      setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? updatedTodo : todo))
    } catch (err) {
      console.error("Failed to toggle todo:", err);
    }
  }

  const incompleteTodos = todos.filter((todo) => (todo.completed === false));
  const completeTodos = todos.filter((todo) => (todo.completed === true));

  return (
    <div>

      <Input onAddTodo={handleAddTodo}></Input>
    
      <div className="list__container">
        <div className="full__list">
          <h1>Pending Tasks</h1>
          <ul className="list__bones">
            {incompleteTodos.map((todo) => 
              <li key={todo.id}>
                <div className="spacer"></div>

                {editId === todo.id ? (
                  <input 
                   value={editValue}
                   onChange={(e) => setEditValue(e.target.value)}
                  ></input>
                ):
                (<div className="list__text">{todo.todo}</div>)
                }
                
                <Buttons 
                 completed={todo.completed}
                 id={todo.id}
                 onDelete={deleteTodo}
                 startEdit={startEdit}
                 title={todo.todo}
                 editId={editId}
                 editValue={editValue}
                 saveEdit={saveEdit}
                 onToggle={onToggle}/>
              </li>
            )}
          </ul>
        </div>

        <div className="full__list">
          <h1>Completed Tasks</h1>
          <ul className="list__bones">
            {completeTodos.map((todo) => 
              <li key={todo.id}>
                <Buttons 
                 completed={todo.completed}
                 id={todo.id}
                 onDelete={deleteTodo}
                 startEdit={startEdit}
                 title={todo.todo}
                 editId={editId}
                 editValue={editValue}
                 saveEdit={saveEdit}
                 onToggle={onToggle}
                 >
                  {editId === todo.id ? (
                    <input 
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    ></input>
                  ):
                  (<div className="list__text">{todo.todo}</div>)
                  }
                 </Buttons>
              </li>
            )}
          </ul>
        </div>
      </div>  
    </div>
  )
}

export default Lists
