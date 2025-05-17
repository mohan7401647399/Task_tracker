import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';
import Spinner from '../ui/Spinner';
import { useEffect, useState } from 'react';

const ProjectForm = ({ edit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(edit);

  useEffect(() => {
    if (edit) {
      const fetchProject = async () => {
        try {
          const res = await api.get(`/projects/${id}`);
          setInitialValues({
            title: res.data.data.title,
            description: res.data.data.description || ''
          });
          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [edit, id]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string()
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      if (edit) {
        await api.put(`/projects/${id}`, values);
      } else {
        await api.post('/projects', values);
      }
      navigate('/projects');
    } catch (err) {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;

    return (
      <div className="container mx-auto p-4 max-w-md">
        <h1 className="text-2xl font-bold mb-6">
          { edit ? 'Edit Project' : 'Add Project' }
        </h1>

        <Formik
          initialValues={ initialValues }
          validationSchema={ validationSchema }
          onSubmit={ onSubmit }
          enableReinitialize
        >
          { ({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <Field
                  name="title"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={ () => navigate('/projects') }
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={ isSubmitting }
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  { isSubmitting ? 'Saving...' : 'Save' }
                </button>
              </div>
            </Form>
          ) }
        </Formik>
      </div>
    );
};

export default ProjectForm;