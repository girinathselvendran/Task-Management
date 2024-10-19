"use client";
import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";
import "../globals.css";

const initialTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    priority: "high",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    priority: "medium",
    completed: true,
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description 3",
    priority: "low",
    completed: false,
  },
];

export default function TaskManagement() {
  const [tasks, setTasks] = useState(initialTasks || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length) localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        tasks={tasks}
        setTasks={setTasks}
      />{" "}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="task-header">
        <h2>Tasks Lists</h2>
        <div className="color-legend">
          <div className="square-div">
            <span class="low-color"></span>
            <span>Low</span>
          </div>

          <div className="square-div">
            <span class="medium-color"></span>
            <span>Medium</span>
          </div>

          <div className="square-div">
            <span class="high-color"></span>
            <span>High</span>
          </div>
        </div>
      </div>
      <br />
      {tasks.length === 0 ? <p> No Records Found</p> : null}
      <TaskList
        tasks={tasks}
        onToggleComplete={handleToggleComplete}
        onDeleteTask={handleDeleteTask}
        searchTerm={searchTerm}
        setTasks={setTasks}
        setSelectedTask={setSelectedTask}
      />
    </div>
  );
}
