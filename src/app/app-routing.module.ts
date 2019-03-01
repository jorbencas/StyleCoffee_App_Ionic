import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},
  { path: 'details/:id', loadChildren: './details/details.module#DetailsPageModule'},
  { path: 'login', loadChildren:'./login/login.module#LoginPageModule'},
  { path: 'xat', loadChildren:'./xat/xat.module#xatPageModule'},
  { path: 'list', loadChildren: './list/list.module#ListPageModule'},
  { path: 'profile', loadChildren: './profile/profile.module#ProfileModule'},
  { path: 'edit', loadChildren: './edit/edit.module#EditPageModule'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
