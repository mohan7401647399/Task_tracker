import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import TaskItem from './TaskItem';
import Spinner from '../ui/Spinner';

const TaskList = ({ projectId }) => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get(`/projects/${projectId || id}/tasks`);
        setTasks(res.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId, id]);

  if (loading) return <Spinner />;

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tasks found. Create your first task!
        </div>
      ) : (
        tasks.map(task => (
          <TaskItem key={task._id} task={task} />
        ))
      )}
    </div>
  );
};

export default TaskList;