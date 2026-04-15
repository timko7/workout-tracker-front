import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/workouts',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => 
      import('./features/auth/components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => 
      import('./features/auth/components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'workouts',
    canActivate: [authGuard],
    loadComponent: () => 
      import('./features/workouts/components/workout-list/workout-list.component').then(m => m.WorkoutListComponent)
  },
  {
    path: 'progress',
    canActivate: [authGuard],
    loadComponent: () => 
      import('./features/progress/components/progress-view/progress-view.component').then(m => m.ProgressViewComponent)
  },
  {
    path: '**',
    redirectTo: '/workouts'
  }
];
