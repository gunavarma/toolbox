"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle2, Circle, AlertCircle, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

interface Todo {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  category: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [category, setCategory] = useState("Work");
  const [search, setSearch] = useState("");

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("toolbox-todos-list");
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.warn("Failed to load todos from localStorage:", e);
      }
    }
  }, []);

  // Save to local storage
  const saveTodos = (updated: Todo[]) => {
    setTodos(updated);
    localStorage.setItem("toolbox-todos-list", JSON.stringify(updated));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
      priority,
      category,
      completed: false,
    };

    saveTodos([newTodo, ...todos]);
    setTitle("");
  };

  const handleToggle = (id: string) => {
    const updated = todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    saveTodos(updated);
  };

  const handleDelete = (id: string) => {
    const updated = todos.filter((t) => t.id !== id);
    saveTodos(updated);
  };

  const handleClearCompleted = () => {
    const updated = todos.filter((t) => !t.completed);
    saveTodos(updated);
  };

  const filteredTodos = todos.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
  );

  const completedCount = todos.filter((t) => t.completed).length;
  const progressPercent = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  const priorityColors = {
    low: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    high: "text-red-400 bg-red-500/10 border-red-500/20",
  };

  return (
    <div className="space-y-6">
      {/* Search and Input Form Grid */}
      <form onSubmit={handleAdd} className="space-y-4 p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 glass">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <Input
              label="Add Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Write SEO metadata descriptions..."
            />
          </div>
          <div>
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: "Work", label: "Work" },
                { value: "Personal", label: "Personal" },
                { value: "Study", label: "Study" },
                { value: "Shopping", label: "Shopping" },
              ]}
            />
          </div>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-4 pt-1">
          <div className="flex gap-4 items-center">
            <span className="text-sm font-medium text-zinc-300 select-none">Priority:</span>
            <div className="flex bg-zinc-950/70 p-0.5 rounded-lg border border-zinc-850">
              {(["low", "medium", "high"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all duration-200 capitalize cursor-pointer ${
                    priority === p
                      ? "bg-zinc-850 text-zinc-50 border border-zinc-700/50 shadow"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
            Add Task
          </Button>
        </div>
      </form>

      {/* Progress completion bar */}
      {todos.length > 0 && (
        <div className="glass rounded-xl border border-zinc-800/80 p-4 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-500 font-semibold uppercase tracking-wider">Workspace Completion</span>
            <span className="font-mono text-violet-400 font-bold">{progressPercent}% ({completedCount}/{todos.length} done)</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/60">
            <div
              className="h-full bg-violet-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Todo items list list */}
      <div className="space-y-3.5">
        {todos.length > 0 && (
          <div className="flex items-center bg-zinc-900/40 border border-zinc-800 rounded-lg px-3.5 h-10 max-w-sm glass">
            <Search className="h-4 w-4 text-zinc-500 mr-2 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items..."
              className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none border-none focus:ring-0 focus:outline-none"
            />
          </div>
        )}

        <div className="space-y-2">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                  todo.completed
                    ? "bg-zinc-950/20 border-zinc-900 opacity-60"
                    : "glass border-zinc-800/80 hover:border-zinc-700/60"
                }`}
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => handleToggle(todo.id)}
                    className="text-zinc-500 hover:text-violet-400 transition-colors shrink-0 cursor-pointer"
                  >
                    {todo.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>
                  <div className="min-w-0">
                    <span
                      className={`text-sm font-medium text-zinc-200 block truncate ${
                        todo.completed ? "line-through text-zinc-500" : ""
                      }`}
                    >
                      {todo.title}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                      {todo.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className={`px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wide select-none ${priorityColors[todo.priority]}`}>
                    {todo.priority}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(todo.id)}
                    className="p-1 hover:bg-zinc-800 rounded text-zinc-600 hover:text-red-400 transition-all duration-200 cursor-pointer"
                    title="Delete item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full py-12 text-center border border-zinc-800 border-dashed rounded-xl bg-zinc-900/10 flex flex-col items-center justify-center text-zinc-600 gap-1.5 select-none">
              <FileText className="h-10 w-10 opacity-30" />
              <span className="text-xs">
                {todos.length > 0 ? "No items matching query search" : "Your tasks checklist workspace is empty"}
              </span>
            </div>
          )}
        </div>

        {todos.length > 0 && completedCount > 0 && (
          <div className="flex justify-end pt-1">
            <button
              onClick={handleClearCompleted}
              className="text-xs text-zinc-500 hover:text-red-400 font-medium flex items-center gap-1.5 transition-colors duration-200 select-none cursor-pointer"
            >
              <AlertCircle className="h-3.5 w-3.5" /> Clear Completed Tasks
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
