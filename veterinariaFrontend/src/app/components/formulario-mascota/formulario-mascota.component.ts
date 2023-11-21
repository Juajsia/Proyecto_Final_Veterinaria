import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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
    nombre: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    especie: new FormControl('', Validators.required),
    raza: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    tamaño: new FormControl('', Validators.required),
    peso: new FormControl('', Validators.required),
    cedulaDueño: new FormControl('', Validators.required)
  })

  agregarMascota(){
    console.log(this.form)
  }
    
}
