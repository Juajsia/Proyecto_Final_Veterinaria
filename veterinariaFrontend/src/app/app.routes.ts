import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [{
    title: 'Home',
    path: '',
    component: HomeComponent
}, {
    title: 'About Us',
    path: 'about',
    component: AboutUsComponent
},{
    title: 'Login',
    path: 'login',
    component: LoginComponent
}];
    