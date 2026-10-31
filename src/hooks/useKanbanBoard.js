
import { useMemo, useState } from "react";
import useTasks from "./useTasks";

const columns = [
  { id: "todo", title: "Todo" },
  { id: "in-progress", title: "In Progress" },
  { id: "completed", title: "Completed" },
];

function useKanbanBoard() {
  const { tasks, addTask, updateTask, deleteTask, moveTask, } = useTasks();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Search and filter state
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesPriority =
        priorityFilter === "all" ||
        task.priority === priorityFilter;

      const matchesStatus =
        statusFilter === "all" ||
        task.status === statusFilter;

      return (
        matchesSearch &&
        matchesPriority &&
        matchesStatus
      );
    });
  }, [tasks, search, priorityFilter, statusFilter]);

  // Statistics
  const stats = useMemo(() => ({
    total: tasks.length,
    inProgress: tasks.filter(
      (task) => task.status === "in-progress"
    ).length,
    completed: tasks.filter(
      (task) => task.status === "completed"
    ).length,
  }), [tasks]);

  // Modal handlers
  const openAddModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  // Create / Update
  const handleSubmit = (formData) => {
    if (selectedTask) {
        updateTask(selectedTask.id, formData);
    } else {
        addTask(formData);
    }
  };
  // Delete
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      deleteTask(id);
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setPriorityFilter("all");
    setStatusFilter("all");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    priorityFilter !== "all" ||
    statusFilter !== "all";

  // Group filtered tasks by column
  const boardColumns = useMemo(() => {
    return columns.map((column) => ({
      ...column,
      tasks: filteredTasks.filter(
        (task) => task.status === column.id
      ),
    }));
  }, [filteredTasks]);

  return {
    // Data
    tasks,
    filteredTasks,
    boardColumns,
    stats,

    // Modal
    isModalOpen,
    selectedTask,
    openAddModal,
    openEditModal,
    closeModal,
    handleSubmit,

    // Task operations
    handleDelete,
    moveTask,

    // Search and filters
    search,
    setSearch,
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter,
    hasActiveFilters,
    clearFilters,
  };
}

export default useKanbanBoard;
