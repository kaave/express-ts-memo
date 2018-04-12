import { RouteConfig } from 'react-router-config';

import Index from '~/containers/index.tsx';
import About from '~/containers/about.tsx';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Index,
    exact: true,
  },
  {
    path: '/about',
    component: About,
    exact: true,
  },
];

export default routes;
