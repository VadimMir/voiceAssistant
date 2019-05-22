import {Routes, RouterModule} from '@angular/router';

import {InputVoiceComponent} from './main/input-voice/input-voice.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './user/user.component';

import {StartPageComponent} from './start-page/start-page.component';
import {SmartphoneComponent} from './smartphone/smartphone.component';
import {HederComponent} from './heder/heder.component';

import {ProductPhoneComponent} from './product-phone/product-phone.component';


import {AuthGuard} from './_guards';
import {from} from 'rxjs';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'input', component: InputVoiceComponent},
  {path: 'phone', component: SmartphoneComponent},
  {path: 'heder', component: HederComponent},
  {path: 'product-phone', component: ProductPhoneComponent},
  {path: '', component: StartPageComponent},
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
