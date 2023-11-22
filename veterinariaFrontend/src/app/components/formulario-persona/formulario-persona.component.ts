import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-persona',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule,ReactiveFormsModule],
  templateUrl: './formulario-persona.component.html',
  styleUrl: './formulario-persona.component.css'
})
export class FormularioPersonaComponent {
  guardar = faFloppyDisk
  cancelar = faArrowLeft

  form =  new FormGroup({
    cedula: new FormControl(['', [Validators.required, Validators.pattern(/^[1-9]\d{7,9}$/)]]),
    Primer_nombre: new FormControl(['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/)]]),
    Segundo_nombre: new FormControl(['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/)]]),
    Primer_Apellido: new FormControl(['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/)]]),
    Segundo_Apellido: new FormControl(['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/)]]),
    edad: new FormControl(['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]),
    IdRol: new FormControl('', [Validators.required])
  })
}
