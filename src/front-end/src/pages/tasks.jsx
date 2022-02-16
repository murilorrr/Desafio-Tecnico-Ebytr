import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/css/tasksPage.css';
import { CreateTask, TaskList, FilterTask } from '../components';

function Tasks() {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.clear();
      history.push('/');
    }
  }, [history]);

  return (
    <div className="tasksPage">
      <CreateTask />
      <FilterTask />
      <TaskList />
    </div>
  );
}

export default Tasks;
