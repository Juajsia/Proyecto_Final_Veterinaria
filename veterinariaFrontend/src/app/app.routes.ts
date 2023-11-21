import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LoginComponent } from './pages/login/login.component';
import { MascotaComponent } from './pages/mascota/mascota.component';
import { loginGuard, rolVeterinario } from './guards/login.guard';
import { FormularioMascotaComponent } from './components/formulario-mascota/formulario-mascota.component';

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
},{
    title: 'Mascota',
    path: 'mascota',
    component: MascotaComponent,
    canActivate: [loginGuard, rolVeterinario]
},{
    title: 'Formulario',
    path: 'mascota/formulario',
    component: FormularioMascotaComponent,
    canActivate: [loginGuard, rolVeterinario]
}];