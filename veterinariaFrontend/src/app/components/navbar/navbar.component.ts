import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Guard, loginGuard } from '../../guards/login.guard';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
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
