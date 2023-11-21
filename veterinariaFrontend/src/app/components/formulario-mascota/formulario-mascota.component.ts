import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-formulario-mascota',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './formulario-mascota.component.html',
  styleUrl: './formulario-mascota.component.css'
})
export class FormularioMascotaComponent {
  guardar = faFloppyDisk
  cancelar = faArrowLeft
}
