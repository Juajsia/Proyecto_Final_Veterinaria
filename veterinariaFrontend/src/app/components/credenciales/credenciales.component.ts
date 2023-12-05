import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredencialesService } from '../../services/credenciales.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Credenciales } from '../../interfaces/credenciales';

@Component({
  selector: 'app-credenciales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './credenciales.component.html',
  styleUrl: './credenciales.component.css'
})
export class CredencialesComponent {
  cedula: number = Number(localStorage.getItem('cedula'))
  usuario: string = ''
  oldPassword: string = ''
  newPassword: string = ''
  repeatPassword: string = ''
  boton = 'Registrar'

  constructor(private _credencialesService: CredencialesService, private tsr: ToastrService) {
    this.buscarCred(this.cedula)
  }
  

  buscarCred(id: number){
    this._credencialesService.getByCedula(id).subscribe(data => {
      if (Array.isArray(data)) {
        const res = data[0]
        this.usuario = res.Usuario
        this.boton = 'Actualizar'
      } else {
        this.usuario = ''
      }
    })
  }

  closeCredenciales(){
    this._credencialesService.$modal.emit(false)
  }


  enviarForm(){
    if(this.boton === 'Registrar') {
      this.crearCred()
    }
  }

  crearCred(){
    if(this.validateForm()) {

      const data: Credenciales = {
        Usuario: this.usuario,
        Contrasenia: this.newPassword,
        idPersona: this.cedula
      }
      this._credencialesService.agregar(data).subscribe({
        next: () => {
          this._credencialesService.$modal.emit(false)
          this.tsr.success(`Credenciales ${this.usuario} resgistrada con exito!`, 'Formulario Enviado!')
        },
        error: (e: HttpErrorResponse) => {
          this.tsr.error(`No se pudo crear la Credencial: Asegurese de ingresar los datos Adecuadamente`, 'Error Formulario')
        }
      })
    }
  }

  validateForm (){
    if (!this.usuario || !this.newPassword || !this.repeatPassword) {
      this.tsr.error(`Intresar Todos los Campos`, 'Error Formulario!')
      return false 
    }
    const regrex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!regrex.test(this.newPassword)) {
      this.tsr.error(`Ingresar Una contraseña Valida`, 'Error Formulario!')
      return false
    }

    if (this.repeatPassword !== this.newPassword) {
      this.tsr.warning(`Contraseñas no coinciden, verifique los Datos`, 'Error Formulario!')
      return false
    }
    return true
  }
}
