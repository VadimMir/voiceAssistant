import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {ManageUsersComponent} from './manage-users/manage-users.component';
import {ManagePhonesComponent} from './manage-phones/manage-phones.component';
import {ManagePhoneComponent} from './manage-phone/manage-phone.component';


const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, children: [
      {path: '', component: ManageUsersComponent},
      {path: 'manage-phones', component: ManagePhonesComponent},
      {path: 'manage-phone', component: ManagePhoneComponent},

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
