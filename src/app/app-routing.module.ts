import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemsetComponent } from './problemset/problemset.component';
import { AuthComponent } from './auth/auth.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminProblemsetComponent } from './admin-problemset/admin-problemset.component';

const routes: Routes = [
  { path: 'problemset', component:AdminProblemsetComponent},
  {path: 'auth', component:AuthComponent},
  {path: 'home', component:HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
