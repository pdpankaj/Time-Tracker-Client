import { RouterModule, Routes } from '@angular/router';
import { EmployeeSearchComponent } from './employee-search.component';

const routes: Routes = [
  { path: '', component: EmployeeSearchComponent }
];

export const EmployeeRoutes = RouterModule.forChild(routes);

