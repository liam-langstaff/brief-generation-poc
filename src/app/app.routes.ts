import { Routes } from '@angular/router';
import { GenerateComponent } from './features/generate/generate.component';
import { resultGuard } from './features/generate/guards/result.guard';
import { ResultComponent } from './features/generate/result/result.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'generate',
    pathMatch: 'full',
  },
  {
    path: 'generate',
    component: GenerateComponent,
  },
  {
    path: 'result',
    component: ResultComponent,
    canActivate: [resultGuard],
  },
];
