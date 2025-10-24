import './App.css'
import { todos } from './todosData.js'

function Lists() {

  const incompleteTodos = todos.filter((todo) => (todo.completed === true));
  const completeTodos = todos.filter((todo) => (todo.completed === false));
  
  return (
    <div>
      <div className="todo__form">
        <input type="text" id="input"></input>
        <button className="add__btn">submit</button>
      </div>
    
      <div className="list__container">
        <div className="full__list">
          <h1>Pending Tasks</h1>
          <ul className="list__bones">
            {incompleteTodos.map((todo) => 
              <li key={todo.title}>
                {todo.title}
                <div className="btn__div">
                  <button className="edit__btn"></button>
                  <button className="del__btn"></button>
                  <button className="toggle__btn"></button>
                </div>
              </li>
            )}
          </ul>
        </div>

        <div className="full__list">
          <h1>Completed Tasks</h1>
          <ul className="list__bones">
            {completeTodos.map((todo) => 
              <li key={todo.title}>
                <button className="toggle__btn"></button>
                {todo.title}
                <div className="btn__div">
                  <button className="edit__btn">
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button className="del__btn"></button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      
    </div>
  )
}

export default Lists
