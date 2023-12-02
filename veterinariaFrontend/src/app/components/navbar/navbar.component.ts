import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Guard, loginGuard } from '../../guards/login.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  barra = faBars
  loginStatus = Guard()
  router = inject(Router)
  rol = localStorage.getItem('rol')

  logOut(){
    this.loginStatus = false
    this.rol = ''
    localStorage.removeItem('token')
    localStorage.removeItem('rol')
    this.router.navigate([''])
  }
}
