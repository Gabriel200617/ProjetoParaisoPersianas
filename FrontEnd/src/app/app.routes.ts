import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Paraíso das Persianas | Persianas e Cortinas em Salvador',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
    title: 'Entrar | Paraíso das Persianas',
  },
  { path: '**', redirectTo: '' },
];