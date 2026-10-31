
import {
  CalendarDays,
  Flag,
  Pencil,
  Trash2,
  ArrowRight,
} from "lucide-react";

const priorityStyles = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
};

const nextStatus = {
  todo: "in-progress",
  "in-progress": "completed",
  completed: "todo",
};

const statusLabels = {
  todo: "Move to In Progress",
  "in-progress": "Move to Completed",
  completed: "Move to Todo",
};

function TaskCard({ task, onEdit, onDelete, onMove }) {

  const formattedDate = task.dueDate
    ? new Date(`${task.dueDate}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })
    : "No due date";

  const isOverdue =
    task.dueDate &&
    task.status !== "completed" &&
    new Date(`${task.dueDate}T00:00:00`) <
      new Date(new Date().toDateString());

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between gap-3">
        <h3 className="break-words text-sm font-semibold text-slate-800 dark:text-white">
          {task.title}
        </h3>

        <div className="flex shrink-0 gap-1">
          <button
            onClick={() => onEdit(task)}
            aria-label="Edit task"
            className="rounded-md p-1.5 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Pencil size={15} />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
            className="rounded-md p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <p className="mt-2 whitespace-pre-wrap break-words text-sm text-slate-500 dark:text-slate-400">
        {task.description || "No description provided."}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium capitalize ${
            priorityStyles[task.priority] || priorityStyles.low
          }`}
        >
          <Flag size={12} />
          {task.priority}
        </span>

        <span
          className={`inline-flex items-center gap-1 text-xs ${
            isOverdue ? "font-semibold text-red-600" : "text-slate-500"
          }`}
        >
          <CalendarDays size={13} />
          {formattedDate}
          {isOverdue && " · Overdue"}
        </span>
      </div>

      <button
        onClick={() => onMove(task.id, nextStatus[task.status])}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-xs font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
      >
        <ArrowRight size={14} />
        {statusLabels[task.status]}
      </button>
    </article>
  );
}

export default TaskCard;
