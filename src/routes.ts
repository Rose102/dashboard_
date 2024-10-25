import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

import Home from './pages/home';
import AboutData from './pages/about.data';
import login from './pages/login';


export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: lazy(() => import('./pages/login')),
  },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
];
