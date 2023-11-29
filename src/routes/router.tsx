import { createBrowserRouter } from 'react-router-dom';
// import contactsRouters from './course01/contacts/router';
import course02Routers from './course02/query-page/router';
import course03Routers from './course03/todos/router';
import course04Routers from './course04/user/router';
import course05Routers from './course05/todos/router';

const router = createBrowserRouter([...course02Routers, ...course03Routers, ...course04Routers, ...course05Routers]);

export default router;
