
import { ListTodo } from "lucide-react";
import TaskCard from "./TaskCard";

function KanbanColumn({
  title,
  tasks = [],
  onEdit,
  onDelete,
  onMove,
}) {



  return (
    <section className="flex min-w-0 min-h-[350px] flex-col rounded-xl bg-slate-100 p-4 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800 dark:text-white">
          {title}
        </h2>

        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {tasks.length}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 py-10 text-center dark:border-slate-700">
            <ListTodo className="mb-2 text-slate-400" size={28} />
            <p className="text-sm font-medium text-slate-500">
              No tasks here
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default KanbanColumn;
