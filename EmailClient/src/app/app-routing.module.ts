import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/Guard/auth.guard';
import { SigninComponent } from './auth/signin/signin.component';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./auth/auth.module').then(x=>x.AuthModule)
  },
  {
    path:'inbox',
    canLoad:[AuthGuard],
    loadChildren:()=>import('./inbox/inbox.module').then(x=>x.InboxModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
