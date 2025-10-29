const baseURL = 'https://dummyjson.com/todos';

export async function getTodos() {
    const response = await fetch(baseURL);
    if (!response.ok) throw new Error('Failed to fetch todos.');

    const data = await response.json()
    return data.todos;
}

export async function addTodo(newTodo) {
    const response = await fetch(baseURL + '/add', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            todo: newTodo.todo,
            completed: newTodo.completed,
            userId: 1
        })
    });

    if (!response.ok) throw new Error('Failed to add todo.');
    return response.json();
}

export async function deleteTodo(id) {
    const response = await fetch(`${baseURL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) throw new Error('Failed to delete todo.');
    return response.json();
}

export async function updateTodo(id, updatedTodo) {
    const response = await fetch(`${baseURL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
    });

    if (!response.ok) throw new Error('Failed to update todo.');
    return response.json();
}