import { useState } from 'react';

export default function Input({ onAddTodo }) {
    const [inputValue, setInputValue] = useState("");

    function handleSubmit() {
        if (inputValue.trim() === "") return;

        onAddTodo(inputValue);
        setInputValue('');
    }

    return (
     <div className="todo__form">
        <input type="text" 
         id="input" 
         value={inputValue}
         onChange={(e) => setInputValue(e.target.value)}>
        </input>
        <button className="add__btn" onClick={handleSubmit}>submit</button>
     </div>
    )
}