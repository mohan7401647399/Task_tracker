import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/authContext';
import { AlertProvider } from './context/alertContext';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProjectList from './components/projects/ProjectList';
import ProjectForm from './components/projects/ProjectForm';
import ProjectDetails from './components/projects/ProjectDetails';
import TaskForm from './components/tasks/TaskForm';
import PrivateRoute from './components/routing/PrivateRoute';
import TaskDetails from './components/tasks/TaskDetails';

function App() {

  const { isAuthenticated } = useAuth();

  return (
      <AlertProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Alert />
            <Routes>
              {/* Public routes */ }
              <Route path="/" element={ isAuthenticated ? <Dashboard /> : <Home /> } />
              <Route path="/login" element={ <LoginPage /> } />
              <Route path="/register" element={ <RegisterPage /> } />

              {/* Protected routes */ }
              <Route element={ <PrivateRoute /> }>
                <Route path="/dashboard" element={ <Dashboard /> } />
                <Route path="/projects" element={ <ProjectList /> } />
                <Route path="/projects/new" element={ <ProjectForm /> } />
                <Route path="/projects/:id" element={ <ProjectDetails /> } />
                <Route path="/projects/:id/edit" element={ <ProjectForm /> } />
                <Route
                  path="/projects/:projectId/tasks/new"
                  element={ <TaskForm /> }
                />
                <Route
                  path="/projects/:projectId/tasks/:taskId"
                  element={ <TaskDetails /> }
                />
                <Route
                  path="/projects/:projectId/tasks/:taskId/edit"
                  element={ <TaskForm edit /> }
                />
              </Route>

              {/* Catch-all route */ }
              <Route path="*" element={ <Navigate to="/" replace /> } />
            </Routes>
          </main>
        </div>
      </AlertProvider>
  );
}

export default App;