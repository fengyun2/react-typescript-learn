import ErrorPage from '../../error-page';
import Index from './index';
import Detail from './detail';

const router = [
  {
    path: '/user',
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/user/:userId',
    element: <Detail />,
    errorElement: <ErrorPage />,
  },
];

export default router;
