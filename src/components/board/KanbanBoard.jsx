
import { ListFilter, } from "lucide-react";

import KanbanColumn from "./KanbanColumn";
import TaskModal from "../tasks/TaskModel";
import Header from "../utils/Header";
import StatCard from "../utils/StatCard";
import Searchbar from "../utils/Searchbar";
import useKanbanBoard from "../../hooks/useKanbanBoard";

const columns = [
  { id: "todo", title: "Todo" },
  { id: "in-progress", title: "In Progress" },
  { id: "completed", title: "Completed" },
];

function KanbanBoard() {


    

    const {tasks, filteredTasks, openAddModal, stats, isModalOpen, selectedTask, handleSubmit, closeModal, clearFilters, search, setSearch, priorityFilter, setPriorityFilter, statusFilter, setStatusFilter, hasActiveFilters, openEditModal, handleDelete, moveTask } = useKanbanBoard();
  

  return (
    <div className="space-y-6">

      {/* Header */}
      <Header handleAdd={openAddModal}/>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard label="Total Tasks" value={stats.total} />
        <StatCard label="In Progress" value={stats.inProgress} />
        <StatCard label="Completed" value={stats.completed} />
      </div>

      {/* Search and Filters */}
      <Searchbar
        search={search}
        setSearch={setSearch}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        hasActiveFilters={hasActiveFilters}
        clearFilters={clearFilters}
      />

      {/* Board */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {columns.map((column) => {
                const columnTasks = filteredTasks.filter(
                (task) => task.status === column.id
                );

                return (
                <div
                    key={column.id}
                    className="min-w-0 w-full"
                >
                    <KanbanColumn
                        title={column.title}
                        tasks={columnTasks}
                        onEdit={openEditModal}
                        onDelete={handleDelete}
                        onMove={moveTask}
                    />
                </div>
                );
            })}
       </div>

      {/* No Results */}
      {filteredTasks.length === 0 && tasks.length > 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
          <ListFilter className="mx-auto mb-3 text-slate-400" size={30} />
          <h3 className="font-semibold text-slate-800 dark:text-white">
            No matching tasks found
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 text-sm font-semibold text-indigo-600"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Empty Board */}
      {tasks.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
          <h3 className="font-semibold text-slate-800 dark:text-white">
            Your board is empty
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Create your first task to get started.
          </p>
          <button
            onClick={openAddModal}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Create your first task
          </button>
        </div>
      )}

      {/* Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        task={selectedTask}
      />
    </div>
  );
}



export default KanbanBoard;
