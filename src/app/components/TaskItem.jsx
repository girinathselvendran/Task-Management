export default function TaskItem({ task, onToggleComplete, onDeleteTask, onEdit }) {
    return (
        <li className={`task-item ${task.priority} ${task.completed ? 'completed' : ''}`}>
            <div className="task-info">
                <span className="title">{task.title}</span>
                <p className="description">{task.description}</p>
            </div>
            <div className="task-actions">
                <button
                    type="button"
                    onClick={() => onToggleComplete(task.id)}
                    className="complete-task"
                >
                    {task.completed ? "Undo" : "Complete"}
                </button>
                {!task.completed ?
                    <button
                        type="button"
                        onClick={() => onEdit(task)} 
                        className="edit-task"
                    >
                        Edit
                    </button> : null}
                <button
                    type="button"
                    onClick={() => onDeleteTask(task.id)}
                    className="delete-task"
                >
                    Delete
                </button>
            </div>
        </li>
    );
}
