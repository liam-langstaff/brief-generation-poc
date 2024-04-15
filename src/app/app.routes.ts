import { Routes } from '@angular/router';
import {GenerateComponent} from "./features/generate/generate.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'generate',
    pathMatch: 'full'
  },
  {
    path: 'generate',
    component: GenerateComponent
  }
];
