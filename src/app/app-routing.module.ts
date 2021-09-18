import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {PasswordComponent} from './components/password/password.component';
import {AuthGuard} from './services/guard/auth.guard';
import {EmailComponent} from './components/email/email.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'email',
        component: EmailComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'password',
        component: PasswordComponent
    },
    {
        path: 'home',
        component: HomeComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        useHash: false,
        onSameUrlNavigation: 'reload',
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
