import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  function saveToLS() {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  function handleEdit(e, id) {
    let t = todos.filter(i => i.id===id)
    setTodo(t[0].todo)
    handleDelete(e, id)
    saveToLS()
  }

  function handleDelete(e, id) {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);
    saveToLS()
  }

  function handleAdd() {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS()
  }

  function handleChange(e) {
    setTodo(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleAdd();
    }
  }

  function handleCheckbox(e) {
    let id = e.target.name;

    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo;
      }),
    );
    saveToLS()
  }

  function toggleFinished(e) {
    setShowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />
      <main className="app-shell">
        <div className="container mx-auto min-h-[70vh] max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <section className="glass-panel overflow-hidden rounded-[2rem] border border-white/10 p-5 shadow-[0_20px_80px_rgba(2,6,23,0.55)] sm:p-7 lg:p-10">
            <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="section-kicker">Task Management</p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
                  TaskFlow - Manage your Todos at one place
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                  Organize priorities, track progress, and keep everything in one calm, focused workspace.
                </p>
              </div>

              <label className="toggle-pill flex items-center gap-3 self-start rounded-full border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm font-medium text-slate-200 shadow-lg shadow-black/10 backdrop-blur-sm">
                <input onChange={toggleFinished} type="checkbox" name="" id="" checked={showFinished} className="toggle-input" />
                <span>Show Finished</span>
              </label>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 shadow-[0_12px_40px_rgba(2,6,23,0.35)] backdrop-blur-md sm:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Add a todo</h2>
              <div className="addTodo mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  value={todo}
                  type="text"
                  placeholder="Type a task and press Enter"
                  className="todo-input w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 shadow-sm outline-none transition duration-200 placeholder:text-slate-500 focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/20 sm:flex-1"
                />
                <button
                  onClick={handleAdd}
                  disabled={todo.length <= 3}
                  className="save-button inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none"
                >
                  Save
                </button>
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">Your Todos</h2>
              </div>

              {todos.length === 0 && (
                <div className="empty-state rounded-2xl border border-dashed border-slate-700 bg-slate-900/65 px-5 py-8 text-center text-sm text-slate-400 shadow-sm">
                  No todos to display
                </div>
              )}

              <div className="mt-3 space-y-3 sm:space-y-4">
                {todos.map((item, index) => {
                  return (showFinished || !item.isCompleted) && (
                    <div
                      key={item.id}
                      className="todo-card"
                      style={{ "--delay": `${index * 80}ms` }}
                    >
                      <div className="todo-row flex flex-col gap-4 rounded-[1.35rem] border border-slate-800 bg-slate-900/75 p-4 shadow-[0_12px_32px_rgba(2,6,23,0.4)] backdrop-blur-md transition duration-200 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                        <div className="flex min-w-0 items-start gap-4">
                          <input
                            onChange={handleCheckbox}
                            type="checkbox"
                            checked={item.isCompleted}
                            name={item.id}
                            id=""
                            className="todo-checkbox mt-1 h-5 w-5 shrink-0 rounded-full border-slate-600 text-violet-500 transition duration-200 focus:ring-4 focus:ring-violet-500/20"
                          />
                          <div className="min-w-0">
                            <div className={`todo-text break-words text-sm font-medium leading-6 text-slate-100 sm:text-base ${item.isCompleted ? "line-through" : ""}`}>
                              {item.todo}
                            </div>
                            <div className="mt-2 flex items-center gap-2 text-xs font-medium text-slate-400">
                              <span className={`status-dot ${item.isCompleted ? "status-dot--done" : ""}`} />
                              <span>{item.isCompleted ? "Completed" : "In progress"}</span>
                            </div>
                          </div>
                        </div>

                        <div className="buttons flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={(e) => {
                              handleEdit(e, item.id)
                            }}
                            aria-label="Edit todo"
                            className="icon-button inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-200 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-violet-500/20 hover:text-white active:translate-y-0"
                          >
                            <FaEdit className="text-base" />
                          </button>
                          <button
                            onClick={(e) => {
                              handleDelete(e, item.id);
                            }}
                            aria-label="Delete todo"
                            className="icon-button inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-200 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-rose-400/40 hover:bg-rose-500/20 hover:text-white active:translate-y-0"
                          >
                            <MdDelete className="text-lg" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default App;
