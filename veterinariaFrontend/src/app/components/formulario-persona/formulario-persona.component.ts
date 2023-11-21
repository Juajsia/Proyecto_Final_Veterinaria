import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-formulario-persona',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './formulario-persona.component.html',
  styleUrl: './formulario-persona.component.css'
})
export class FormularioPersonaComponent {
  guardar = faFloppyDisk
  cancelar = faArrowLeft
}
