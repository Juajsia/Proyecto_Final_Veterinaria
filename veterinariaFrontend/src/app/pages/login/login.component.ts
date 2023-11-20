import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { CredencialesService } from '../../services/credenciales.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private _userService = inject(CredencialesService)
  private router: Router = inject(Router)
  Usuario: string = ''
  Contrasenia: string = ''
  Error: string = ''

  login() {
    if (this.validateForm()) {
      const user:User = {Usuario: this.Usuario, Contrasenia: this.Contrasenia}
    this._userService.login(user).subscribe({
      next: (data) => {   
        localStorage.setItem('token', data.token)
        this.router.navigate([''])
      },
      error: (e: HttpErrorResponse) => {
        this.Error = 'Contraseña o Usuario Erroneos'
      }
    })
    }
    
  }

  validateForm (){
    if (!this.Usuario || !this.Contrasenia) {
      this.Error = 'Ingresar Todos los Campos'
      return false 
    }
    const regrex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!regrex.test(this.Contrasenia)) {
      this.Error = 'Ingresar una contraseña Válida'
      return false
    }
    return true
  }
}

