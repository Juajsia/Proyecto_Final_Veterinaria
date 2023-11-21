import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { faTrash, faPenToSquare, faPlus, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FontAwesomeModule],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css'
})
export class PersonaComponent {
  faTrash = faTrash
  faPenToSquare = faPenToSquare
  faPlus = faPlus
  lupa = faMagnifyingGlass
  buscar = false

  Buscar(){
    this.buscar = true
  }
}
