import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotesContainerComponent } from './components/notes-container/notes-container.component';
import { ArchiveContainerComponent } from './components/archive-container/archive-container.component';
import { TrashContainerComponent } from './components/trash-container/trash-container.component';
import { DashboardGuard } from './guard/dashboard.guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';



const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path :'signup',component:SignUpComponent},
  {path:'resetpassword',component:ResetPasswordComponent},
  {path : 'dashboard',component:DashboardComponent,children: [
    {path: "notes", component: NotesContainerComponent,canActivate:[DashboardGuard]},
    {path: "archive", component: ArchiveContainerComponent },
    {path: "trash", component: TrashContainerComponent}
  ]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
