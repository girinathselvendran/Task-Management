import { useState, useEffect } from "react";

export default function TaskForm({ selectedTask, setSelectedTask, tasks, setTasks }) {
    const [newTask, setNewTask] = useState({
        id: null,
        title: "",
        description: "",
        priority: "low",
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (selectedTask) {
            setNewTask(selectedTask);
        } else {
            setNewTask({ id: null, title: "", description: "", priority: "low" });
        }
    }, [selectedTask]);

    const validateForm = () => {
        const newErrors = {};
        if (!newTask.title.trim()) newErrors.title = "Title is required";
        if (!newTask.description.trim())
            newErrors.description = "Description is required";
        return newErrors;
    };

    const handleAddOrUpdateTask = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        if (newTask.id) {
            // Update existing task
            const updatedTasks = tasks.map((task) =>
                task.id === newTask.id
                    ? { ...task, ...newTask, completed: task.completed }
                    : task
            );
            setTasks(updatedTasks);
        } else {
            // Add new task
            const taskToAdd = {
                ...newTask,
                id: tasks.length + 1,
                completed: false,
            };
            setTasks([...tasks, taskToAdd]);
        }
        setNewTask({ id: null, title: "", description: "", priority: "low" });
        setSelectedTask(null); 
    };

    return (
        <form>
            <label>Task</label>
            <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            {errors.title && <span className="error">{errors.title}</span>}

            <label>Task Description</label>
            <textarea
                placeholder="Task Description"
                value={newTask.description}
                onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                }
            />
            {errors.description && (
                <span className="error">{errors.description}</span>
            )}
            <label>Priority</label>
            <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="button" onClick={handleAddOrUpdateTask} className="add-task">
                {newTask.id ? "Update Task" : "Add Task"}
            </button>
        </form>
    );
}
