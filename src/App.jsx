import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { LiaEditSolid } from "react-icons/lia";
import { v4 as uuidv4 } from 'uuid';
import { MdDeleteForever } from "react-icons/md";

function App() {
  // input text
  const [todo, setTodo] = useState("")
  // ek array jo todo hold krega
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  // Stats
  const totalCount     = todos.length
  const doneCount      = todos.filter(t => t.isCompleted).length
  const pendingCount   = totalCount - doneCount
  const progressPct    = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100)

  return (
    <div className="app-wrapper" style={{ minHeight: '100vh' }}>
      <Navbar />

      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-16">

        {/* ── Hero Header ── */}
        <div className="text-center mb-8" style={{ animation: 'fadeInUp 0.5s ease both' }}>
          <p className="hero-subtitle mb-2">Your Personal Planner</p>
          <h1 className="hero-title">What's on your mind? 🧠</h1>
          <p className="mt-2 text-sm" style={{ color: 'rgba(167,139,250,0.4)', fontWeight: 500 }}>
            Stay focused. Stay productive. Crush your goals.
          </p>
        </div>

        {/* ── Main Card ── */}
        <div className="main-card p-6 sm:p-8">

          {/* ── Input Row ── */}
          <div className="input-row flex gap-3 mb-6">
            <div className="input-wrapper">
              <span className="input-icon">✏️</span>
              <input
                onChange={handleChange}
                value={todo}
                type="text"
                placeholder="What do you need to do today?"
                className="todo-input"
                onKeyDown={e => e.key === 'Enter' && todo.length > 3 && handleAdd()}
              />
            </div>
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="save-btn"
            >
              + Add
            </button>
          </div>

          {/* ── Stats Bar ── */}
          {totalCount > 0 && (
            <div className="mb-5" style={{ animation: 'fadeIn 0.4s ease' }}>
              <div className="stats-bar mb-3">
                <div className="stat-chip">
                  <span className="dot dot-pending" /> {pendingCount} pending
                </div>
                <div className="stat-chip">
                  <span className="dot dot-done" /> {doneCount} done
                </div>
                <div className="stat-chip" style={{ marginLeft: 'auto' }}>
                  🔥 {progressPct}% complete
                </div>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
            </div>
          )}

          {/* ── Divider ── */}
          <div className="divider mb-5" />

          {/* ── Controls Row ── */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <span className="section-title">📋 Your Tasks</span>
            <div className="toggle-row">
              <input
                type="checkbox"
                onChange={toggleFinished}
                checked={showFinished}
                id="show"
                className="custom-toggle"
              />
              <label htmlFor="show" className="toggle-label">Show completed</label>
            </div>
          </div>

          {/* ── Todo List ── */}
          <div className="flex flex-col gap-3">

            {/* Empty state */}
            {todos.length === 0 && (
              <div className="empty-state">
                <span className="empty-emoji">🎯</span>
                <p className="empty-text">No tasks yet — you're all clear!</p>
                <p className="empty-hint">Add your first task above to get started</p>
              </div>
            )}

            {/* If all tasks are done and showFinished is off */}
            {todos.length > 0 && !showFinished && todos.every(t => t.isCompleted) && (
              <div className="empty-state">
                <span className="empty-emoji">🎉</span>
                <p className="empty-text">All tasks completed!</p>
                <p className="empty-hint">Toggle "Show completed" to view them</p>
              </div>
            )}

            {todos.map((item, idx) => {
              return (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className={`todo-item ${item.isCompleted ? 'completed' : ''}`}
                  style={{ animationDelay: `${idx * 0.04}s` }}
                >
                  {/* Left: checkbox + text */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      className="todo-checkbox"
                      checked={item.isCompleted}
                    />
                    <span className={`todo-text ${item.isCompleted ? 'done' : ''}`}>
                      {item.todo}
                    </span>
                  </div>

                  {/* Right: action buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="action-btn edit-btn"
                      title="Edit task"
                    >
                      <LiaEditSolid />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="action-btn delete-btn"
                      title="Delete task"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

        {/* ── Footer hint ── */}
        <p className="text-center mt-6 text-xs" style={{ color: 'rgba(167,139,250,0.25)', letterSpacing: '0.5px' }}>
          Press <kbd style={{ background: 'rgba(139,92,246,0.15)', padding: '1px 6px', borderRadius: '5px', border: '1px solid rgba(139,92,246,0.2)', color: 'rgba(167,139,250,0.5)' }}>Enter</kbd> to quickly add a task
        </p>
      </div>
    </div>
  )
}

export default App
