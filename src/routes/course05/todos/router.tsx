import ErrorPage from '../../error-page';
import Index from './index';

const router = [
  {
    path: '/zustand/todos',
    element: <Index />,
    errorElement: <ErrorPage />,
  },
];

export default router;
