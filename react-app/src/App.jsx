import './App.css'
import { useState } from 'react';
import { todos as iTodos } from './todosData.js';
import Input from './_components/input.jsx';
import Buttons from './_components/buttons.jsx';

function Lists() {

  const [todos, setTodos] = useState(iTodos);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  
  function addTodo(title) {
    const newTodo = {
      title: title,
      completed: false,
      id : Date.now()
    }
    setTodos([...todos, newTodo]);
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => (todo.id !== id)));
  }

  function startEdit(id, currentTitle) {
    setEditId(id);
    setEditValue(currentTitle);
  }

  function saveEdit(id) {
    editTodo(editValue, id);
    setEditId(null);
  }

  function editTodo(newTitle, id) {
    setTodos(todos.map((todo) => 
      todo.id === id ? { ...todo, title: newTitle } : todo
    ));
  }

  function onToggle(id) {
    setTodos(todos.map((todo) => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo)
    )}
    
  const incompleteTodos = todos.filter((todo) => (todo.completed === false));
  const completeTodos = todos.filter((todo) => (todo.completed === true));

  return (
    <div>

      <Input onAddTodo={addTodo}></Input>
    
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
                (<>{todo.title}</>)
                }
                
                <Buttons 
                 completed={todo.completed}
                 id={todo.id}
                 onDelete={deleteTodo}
                 startEdit={startEdit}
                 title={todo.title}
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
                 title={todo.title}
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
                  (<>{todo.title}</>)
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
