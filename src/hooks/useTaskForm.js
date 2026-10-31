
import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
  status: "todo",
};

function useTaskForm({ isOpen, task, onSubmit, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setForm(
      task
        ? {
            title: task.title || "",
            description: task.description || "",
            priority: task.priority || "medium",
            dueDate: task.dueDate || "",
            status: task.status || "todo",
          }
        : { ...initialForm }
    );

    setError("");
  }, [isOpen, task]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = form.title.trim();

    if (!title) {
      setError("Task title is required.");
      return;
    }

    if (title.length > 100) {
      setError("Title cannot exceed 100 characters.");
      return;
    }

    if (form.description.length > 500) {
      setError("Description cannot exceed 500 characters.");
      return;
    }

    onSubmit({
      ...form,
      title,
      description: form.description.trim(),
    });

    onClose();
  };

  return {
    form,
    error,
    handleChange,
    handleSubmit,
  };
}

export default useTaskForm;
