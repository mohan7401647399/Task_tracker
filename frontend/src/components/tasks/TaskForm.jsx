import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../utils/api';
import Spinner from '../ui/Spinner';

const TaskForm = ({ edit }) => {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(edit);
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    status: 'Not Started',
  });

  useEffect(() => {
    if (edit) {
      const fetchTask = async () => {
        try {
          const res = await api.get(`/tasks/${taskId}`);
          setInitialValues({
            title: res.data.data.title,
            description: res.data.data.description || '',
            status: res.data.data.status,
          });
          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      };
      fetchTask();
    }
  }, [edit, taskId]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    status: Yup.string().required('Status is required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      if (edit) {
        await api.put(`/tasks/${taskId}`, values);
      } else {
        await api.post(`/projects/${projectId}/tasks`, values);
      }
      navigate(`/projects/${projectId}`);
    } catch (err) {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">
        {edit ? 'Edit Task' : 'Add New Task'}
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Field
                type="text"
                name="title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <Field
                as="select"
                name="status"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </Field>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate(`/projects/${projectId}`)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;