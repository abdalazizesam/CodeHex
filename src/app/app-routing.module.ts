import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemsetComponent } from './problemset/problemset.component';
import { AuthComponent } from './auth/auth.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminProblemsetComponent } from './admin-problemset/admin-problemset.component';
import { ContestPageComponent } from './contest-page/contest-page.component';

const routes: Routes = [
  { path: 'problemset', component:ProblemsetComponent},
  {path: 'auth', component:AuthComponent},
  {path: 'home', component:HomepageComponent},
  {path: 'createcontenst', component:AdminProblemsetComponent},
  {path: 'contestpage', component:ContestPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
