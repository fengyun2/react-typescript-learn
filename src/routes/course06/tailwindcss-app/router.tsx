import ErrorPage from '../../error-page';
import Index from './index';

const router = [
  {
    path: '/notes',
    element: <Index />,
    errorElement: <ErrorPage />,
  },
];

export default router;
