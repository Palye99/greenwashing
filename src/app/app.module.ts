import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {AuthService} from './services/auth';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './components/login/login.component';
import { PasswordComponent } from './components/password/password.component';
import { EmailComponent } from './components/email/email.component';
import {NgParticlesModule} from 'ng-particles';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupComponent } from './components/popup/popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './components/home/home.component';
import {NgTerminalModule} from 'ng-terminal';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PasswordComponent,
    EmailComponent,
    PopupComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    NgParticlesModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    HttpClientModule,
    NgTerminalModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
