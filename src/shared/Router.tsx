import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div />,
  },
  {
    path: '*',
    element: <Navigate replace to="/" />,
  },
]);

export default router;
