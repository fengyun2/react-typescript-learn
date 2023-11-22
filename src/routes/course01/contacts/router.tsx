import Root, { loader as rootLoader, action as rootAction } from './root';
import ErrorPage from '../../error-page';
import Index from './index';
import Contact, { loader as contactLoader } from './contact';
import EditContact, { action as editAction } from './edit';
import { action as destroyAction } from './destroy';

const router = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: 'contacts/:contactId',
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: 'contacts/:contactId/edit',
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: 'contacts/:contactId/destroy',
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
];

export default router;
