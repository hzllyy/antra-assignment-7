import './App.css'
import { todos } from './todosData.js';
import Input from './_components/input.jsx';
import Buttons from './_components/buttons.jsx';

function Lists() {

  const incompleteTodos = todos.filter((todo) => (todo.completed === true));
  const completeTodos = todos.filter((todo) => (todo.completed === false));
  
  return (
    <div>

      <Input></Input>
    
      <div className="list__container">
        <div className="full__list">
          <h1>Pending Tasks</h1>
          <ul className="list__bones">
            {incompleteTodos.map((todo) => 
              <li key={todo.id}>
                {todo.title}
                <Buttons status="pending"/>
              </li>
            )}
          </ul>
        </div>

        <div className="full__list">
          <h1>Completed Tasks</h1>
          <ul className="list__bones">
            {completeTodos.map((todo) => 
              <li key={todo.id}>
                <Buttons status="completed">
                  {todo.title}
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
