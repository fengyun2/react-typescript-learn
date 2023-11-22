import ErrorPage from '../../error-page';
import Index from './index';

const router = [
  {
    path: '/course02',
    element: <Index />,
    errorElement: <ErrorPage />,
  },
];

export default router;
