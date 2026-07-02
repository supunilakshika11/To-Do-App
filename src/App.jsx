import React, { useState } from 'react';
import './App.css';

// 1. Header Component
function Header() {
  return (
    <header className="app-header">
      <h2>My Task Tracker 📋</h2>
    </header>
  );
}

// 2. AddTask Component (Form එක සහ Input එක)
function AddTask({ onAddTask }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert('කරුණාකර හිස්ව තබන්න එපා! (Validation Error)');
      return;
    }
    onAddTask(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        placeholder="අලුත් වැඩක් ඇතුළත් කරන්න..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

// 3. TaskItem Component (තනි Task එකක් පෙන්වන කොටස)
function TaskItem({ task, onDelete, onToggle }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span onClick={() => onToggle(task.id)} style={{ cursor: 'pointer' }}>
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)} className="delete-btn">
        ❌
      </button>
    </div>
  );
}

// 4. Main App Component (ප්‍රධාන කොටස)
export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'React ඉගෙන ගන්න', completed: false },
    { id: 2, text: 'Node.js install කරන්න', completed: true },
  ]);

  // අලුත් Task එකක් එකතු කරන Function එක
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  // Task එකක් Delete කරන Function එක
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Task එකක් Completed/Incomplete ලෙස මාරු කරන Function එක
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <div className="app-container">
      <Header />
      <AddTask onAddTask={addTask} />
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>සියලුම වැඩ අවසන්! 🎉</p>
        )}
      </div>
    </div>
  );
}
