import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-mascota',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './formulario-mascota.component.html',
  styleUrl: './formulario-mascota.component.css'
})
export class FormularioMascotaComponent {
  //iconos
  guardar = faFloppyDisk
  cancelar = faArrowLeft
  //formulario
  form =  new FormGroup({
    nombre: new FormControl(['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/)]]),
    edad: new FormControl(['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]),
    especie: new FormControl(['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/)]]),
    raza: new FormControl(['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/)]]),
    color: new FormControl(['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/)]]),
    tamaño: new FormControl(['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]),
    peso: new FormControl(['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]),
    cedulaDueño: new FormControl(['', [Validators.required, Validators.pattern(/^[1-9]\d{7,9}$/)]])
  })

  agregarMascota(){
    console.log(this.form)
  }
    
}
