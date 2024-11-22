import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState({ name: '', email: '', dateJoined: '' });
  const [activeTasks, setActiveTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulates API calls to fetch user data and tasks
    setUser({ name: 'User', email: 'user@example.com', dateJoined: 'May 15, 2023' });
    setActiveTasks([
      { id: 1, title: 'Complete project proposal', status: 'In Progress' },
      { id: 2, title: 'Review team performance', status: 'Pending' },
    ]);
    setArchivedTasks([
      { id: 3, title: 'Quarterly report submission', status: 'Completed' },
      { id: 4, title: 'Team building event planning', status: 'Completed' },
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleEditProfilePic = () => {
    // Implements profile picture edit functionality
    console.log('Edit profile picture');
  };

  const toggleSettingsPanel = () => {
    setIsSettingsPanelOpen(!isSettingsPanelOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <div className={`dashboard ${isDarkMode ? 'dark-mode' : ''}`}>

      <header>
      <nav>
        <h1>TaskMaster</h1>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      </header>


      <div className="dashboard-container">
        <aside className="dashboard-aside">
          <div className="profile-section">
            <div className="profile-picture">
              <img src="https://via.placeholder.com/150" alt="Profile" id="profilePic" />
              <button onClick={handleEditProfilePic} className="edit-profile-pic">
                <i className="fas fa-edit"></i>
              </button>
            </div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>Joined: <span>{user.dateJoined}</span></p>
          </div>
          <div className="task-stats">
            <div className="stat">
              <h3>Created Tasks</h3>
              <p>{activeTasks.length}</p>
            </div>
            <div className="stat">
              <h3>Archived Tasks</h3>
              <p>{archivedTasks.length}</p>
            </div>
          </div>
        </aside>
        <main className="dashboard-main">
          <section className="tasks-section">
            <h2>Your Active Tasks</h2>
            <ul className="task-list">
              {activeTasks.map(task => (
                <li key={task.id} className="task-item">
                  {task.title} - {task.status}
                </li>
              ))}
            </ul>
          </section>
          <section className="tasks-section">
            <h2>Archived Tasks</h2>
            <ul className="task-list">
              {archivedTasks.map(task => (
                <li key={task.id} className="task-item">
                  {task.title} - {task.status}
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
      <div className={`settings-panel ${isSettingsPanelOpen ? 'open' : ''}`}>
        <h2>Settings</h2>
        <div className="setting">
          <label htmlFor="darkModeToggle">Dark Mode</label>
          <input
            type="checkbox"
            id="darkModeToggle"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
        </div>
      </div>
      <button onClick={toggleSettingsPanel} className="floating-btn">
        <i className="fas fa-cog"></i>
      </button>
    </div>
  );
}

export default Dashboard;