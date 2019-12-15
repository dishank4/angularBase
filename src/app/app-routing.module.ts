import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './scenes/login/login.component';
import { DashboardComponent } from './scenes/dashboard/dashboard.component';
import { AuthGuard } from './core/services/authGuard.service';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, //write resolver and check if user already athenticated then do location.back
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
