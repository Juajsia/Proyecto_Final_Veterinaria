import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LoginComponent } from './pages/login/login.component';
import { MascotaComponent } from './pages/mascota/mascota.component';
import { loginGuard, rolAdmin, rolVeterinario } from './guards/login.guard';
import { FormularioMascotaComponent } from './components/formulario-mascota/formulario-mascota.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { FormularioPersonaComponent } from './components/formulario-persona/formulario-persona.component';

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
    title: 'FormularioAgregar',
    path: 'mascota/formulario',
    component: FormularioMascotaComponent,
    canActivate: [loginGuard, rolVeterinario]
},{
    title: 'FormularioEditarMascota',
    path: 'mascota/formulario/:id',
    component: FormularioMascotaComponent,
    canActivate: [loginGuard, rolVeterinario]
},{
    title: 'Persona',
    path: 'persona',
    component: PersonaComponent,
    canActivate: [loginGuard, rolAdmin]
},{
    title: 'Formulario',
    path: 'persona/formulario',
    component: FormularioPersonaComponent,
    canActivate: [loginGuard, rolAdmin]
},{
    title: 'FormularioEditarPersona',
    path: 'persona/formulario/:id',
    component: FormularioPersonaComponent,
    canActivate: [loginGuard, rolVeterinario]
}];