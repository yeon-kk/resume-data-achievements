import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Redirect from '../pages/Redirect';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div />,
  },
  {
    path: '/redirect',
    element: <Redirect />,
  },
  {
    path: '*',
    element: <Navigate replace to="/" />,
  },
]);

export default router;
