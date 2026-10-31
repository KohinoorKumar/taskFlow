
import { CheckSquare, LayoutDashboard } from "lucide-react";
import KanbanBoard from "./components/board/KanbanBoard";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-indigo-600 p-2 text-white">
              <CheckSquare size={21} />
            </div>

            <div>
              <h1 className="font-bold text-slate-900 dark:text-white">
                TaskFlow
              </h1>
              <p className="text-xs text-slate-500">
                Personal workspace
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
            <LayoutDashboard size={17} />
            Kanban Board
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        <KanbanBoard />
      </main>

      <footer className="border-t border-slate-200 py-5 text-center text-xs text-slate-400 dark:border-slate-800">
        TaskFlow · Stay organized. Get things done.
      </footer>
    </div>
  );
}

export default App;
