import TaskItem from './TaskItem';

const priorityValue = {
    high: 1,
    medium: 2,
    low: 3,
};

const TaskList = ({ tasks, searchTerm, setTasks, setSelectedTask }) => {

    const filteredTasks = tasks.filter(
        (task) =>
            task.title.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    const incompleteTasks = filteredTasks
        .filter((task) => !task.completed)
        .sort((a, b) => priorityValue[a.priority] - priorityValue[b.priority]);

    const completedTasks = filteredTasks.filter((task) => task.completed);

    return (
        <div>
            <ul className="task-list">
                {incompleteTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onEdit={setSelectedTask}
                        onToggleComplete={(id) => {
                            setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
                        }}
                        onDeleteTask={(id) => {
                            setTasks(tasks.filter((t) => t.id !== id));
                        }}
                    />
                ))}
            </ul>

            <ul className="task-list">
                {completedTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onEdit={setSelectedTask}
                        onToggleComplete={(id) => {
                            setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
                        }}
                        onDeleteTask={(id) => {
                            setTasks(tasks.filter((t) => t.id !== id));
                        }}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
