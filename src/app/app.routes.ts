import { Routes } from '@angular/router';
import { GenerateComponent } from './features/generate/generate.component';
import { resultGuard } from './features/generate/guards/result.guard';
import { ResultComponent } from './features/result/result.component';
import { MyBriefsComponent } from './features/my-briefs/my-briefs.component';

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
  {
    path: 'my-briefs',
    component: MyBriefsComponent,
  },
];
