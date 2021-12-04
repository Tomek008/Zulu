import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BoardComponent } from './components/board/board.component';
import { RegisterComponent } from './components/register/register.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'board',
    component: BoardComponent
  },
  {
    path: 'overview',
    component: OverviewComponent
  },
  //if user provides a wrong path (f.ex localhost:4200/saaewgas) it will take him to login page.
  {path: '**', 
  redirectTo: '/login', 
  pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
