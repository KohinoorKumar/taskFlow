
import { useEffect, useState } from "react";
import { initialTasks } from "../data/initialTasks";

const STORAGE_KEY = "taskflow_tasks";

function getInitialTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (savedTasks !== null) {
      const parsed = JSON.parse(savedTasks);

      if (Array.isArray(parsed)) return parsed;
    }
  } catch (error) {
    console.error("Failed to load tasks:", error);
  }

  return initialTasks;
}

function useTasks() {
  const [tasks, setTasks] = useState(getInitialTasks);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: crypto.randomUUID(),
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id, updatedData) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updatedData,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const moveTask = (id, status) => {
    updateTask(id, { status });
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
  };
}

export default useTasks;
