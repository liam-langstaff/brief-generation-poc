import { Routes } from '@angular/router';
import { GenerateComponent } from './features/generate/generate.component';
import { resultGuard } from './features/generate/guards/result.guard';
import { ResultComponent } from './features/result/result.component';
import { MyBriefsComponent } from './features/my-briefs/my-briefs.component';
import { AuthComponent } from './core/auth/features/auth/auth.component';
import { authGuard } from './core/guards/auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'generate',
        component: GenerateComponent,
      },
      {
        path: 'result',
        component: ResultComponent,
        canActivate: [resultGuard],
      },
      {
        path: 'my-briefs',
        component: MyBriefsComponent,
        canActivate: [authGuard],
      },
    ],
  },
];
