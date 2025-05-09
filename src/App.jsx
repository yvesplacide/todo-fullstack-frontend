import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const API_URL = "http://localhost:3016/api/todos";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setTodos)
      .catch(console.error);
  }, []);
 
  const handleAdd = async () => {
    if (!text.trim()) return;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setText("");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>To-do App</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nouvelle tâche"
      />
      <button onClick={handleAdd}>Ajouter</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
