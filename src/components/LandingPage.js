import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [searchTask, setSearchTask] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      deadline: taskDeadline,
      priority: taskPriority
    };
    setTasks([...tasks, newTask]);
    setTaskTitle('');
    setTaskDescription('');
    setTaskDeadline('');
    setTaskPriority('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredAndSortedTasks = tasks
    .filter(task => !filterPriority || task.priority === filterPriority)
    .filter(task => task.title.toLowerCase().includes(searchTask.toLowerCase()) || 
                    task.description.toLowerCase().includes(searchTask.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline);
      } else if (sortBy === 'priority') {
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

  return (
    <div>
      <header>
        <h1>TaskMaster</h1>
        <nav className="nav-dash">
          <div> 
            <Link to="/register">
            <button>Register</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
          </div>
        </nav>
      </header>
      
      <main>
        <section id="taskForm">
          <h2>Add New Task</h2>
          <form onSubmit={addTask}>
            <input
              type="text"
              placeholder="Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            ></textarea>
            <input
              type="date"
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
              required
            />
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              required
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button type="submit">Add Task</button>
          </form>
        </section>
        <section id="taskList">
          <h2>Your Tasks</h2>
          <div id="filterSort">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">Filter by Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="deadline">Deadline</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTask}
            onChange={(e) => setSearchTask(e.target.value)}
          />
          <ul id="tasks">
            {filteredAndSortedTasks.map(task => (
              <li key={task.id} className="task">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Deadline: {task.deadline}</p>
                <p>Priority: {task.priority}</p>
                <div className="task-actions">
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;