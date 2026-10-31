import { Plus } from 'lucide-react'

const Header = ({handleAdd}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Workspace
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            My Tasks
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Organize your work and track your progress.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>
  )
}

export default Header
