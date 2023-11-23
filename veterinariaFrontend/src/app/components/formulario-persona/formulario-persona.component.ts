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

  textRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/
  numberRegex = /^\d+(\.\d{1,2})?$/
  cedRegex = /^[0-9]\d{7,9}$/

  form =  new FormGroup({
    cedula: new FormControl('', [Validators.required, Validators.pattern(this.cedRegex)]),
    Primer_nombre: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    Segundo_nombre: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    Primer_Apellido: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    Segundo_Apellido: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    edad: new FormControl('', [Validators.required, Validators.pattern(this.numberRegex)]),
    IdRol: new FormControl('', [Validators.required])
  })
}
