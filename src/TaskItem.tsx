import type { Task } from './types'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className={`task-item${task.completed ? ' completed' : ''}`}>
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="task-text">{task.text}</span>
      </label>
      <button
        type="button"
        className="delete-button"
        onClick={() => onDelete(task.id)}
        aria-label={`「${task.text}」を削除`}
      >
        削除
      </button>
    </li>
  )
}

export default TaskItem
