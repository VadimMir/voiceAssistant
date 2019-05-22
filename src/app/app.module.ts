import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';


import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {AlertComponent} from './_directives';
import {AuthGuard} from './_guards';
import {JwtInterceptor, ErrorInterceptor} from './_helpers';
import {AlertService, AuthenticationService, UserService} from './_services';

import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {InputVoiceComponent} from './main/input-voice/input-voice.component';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './user/user.component';
import {StartPageComponent} from './start-page/start-page.component';

import {HederComponent} from './heder/heder.component';
import {SmartphoneComponent} from './smartphone/smartphone.component';
import {PhoneService} from './_services/phone.service';
import {BrandService} from './_services/brand.service';
import {ProductPhoneComponent} from './product-phone/product-phone.component';

import {ChatModule} from './chat/chat.module';
import {ChatService} from "./chat/chat.service";
import {ChatDialogComponent} from './chat/chat-dialog/chat-dialog.component';
import {FooterComponent} from './footer/footer.component';


import {environment} from "../environments/environment";
import {enableProdMode} from "@angular/core";
import {WordsService} from "./_services/words.service"

if (environment.production) {
  enableProdMode();
}

import {ManagePhonesComponent} from './admin/manage-phones/manage-phones.component';

import {ManageUsersComponent} from './admin/manage-users/manage-users.component';
import {AdminRoutingModule} from './admin/admin-routing.module';
import {SidebarComponent} from './admin/sidebar/sidebar.component';

import {ManagePhoneComponent} from './admin/manage-phone/manage-phone.component';

import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    routing,
    ChatModule,
    AdminRoutingModule,
    NgxPaginationModule,

  ],
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    InputVoiceComponent,
    AdminComponent,
    UserComponent,
    StartPageComponent,
    HederComponent,
    SmartphoneComponent,
    ProductPhoneComponent,
    FooterComponent,
    ManagePhonesComponent,
    ManageUsersComponent,
    SidebarComponent,
    ManagePhoneComponent,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    PhoneService,
    BrandService,
    ChatService,
    StartPageComponent,
    SmartphoneComponent,
    InputVoiceComponent,
    HederComponent,
    RegisterComponent,
    WordsService,
    ProductPhoneComponent,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},


    // provider used to create fake backend

  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
