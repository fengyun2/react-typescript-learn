import { createBrowserRouter } from 'react-router-dom';
import contactsRouters from './course01/contacts/router';
// import Root, { loader as rootLoader, action as rootAction } from './course01/contacts/root';
// import ErrorPage from './error-page';
// import Index from './course01/contacts/index';
// import Contact, { loader as contactLoader } from './course01/contacts/contact';
// import EditContact, { action as editAction } from './course01/contacts/edit';
// import { action as destroyAction } from './course01/contacts/destroy';

const router = createBrowserRouter([
  ...contactsRouters,
  // {
  //   path: '/',
  //   element: <Root />,
  //   errorElement: <ErrorPage />,
  //   loader: rootLoader,
  //   action: rootAction,
  //   children: [
  //     { index: true, element: <Index /> },
  //     {
  //       path: 'contacts/:contactId',
  //       element: <Contact />,
  //       loader: contactLoader,
  //     },
  //     {
  //       path: 'contacts/:contactId/edit',
  //       element: <EditContact />,
  //       loader: contactLoader,
  //       action: editAction,
  //     },
  //     {
  //       path: 'contacts/:contactId/destroy',
  //       action: destroyAction,
  //       errorElement: <div>Oops! There was an error.</div>,
  //     },
  //   ],
  // },
]);

export default router;
