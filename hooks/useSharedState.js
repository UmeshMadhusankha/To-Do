import { useState } from 'react';

export const useSharedState = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [updateMode, setUpdateMode] = useState(0);
  const [idOfUpdatingData, setIdOfUpdatingData] = useState(0);

  return {
    tasks,
    setTasks,
    task,
    setTask,
    updateMode,
    setUpdateMode,
    idOfUpdatingData,
    setIdOfUpdatingData
  };
};
