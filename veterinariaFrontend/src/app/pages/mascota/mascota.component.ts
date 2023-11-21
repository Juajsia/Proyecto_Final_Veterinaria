import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare, faPlus, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { MascotaService } from '../../services/mascota.service';
import { Pet } from '../../interfaces/pet';

@Component({
  selector: 'app-mascota',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FontAwesomeModule],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.css'
})
export class MascotaComponent {
  faTrash = faTrash
  faPenToSquare = faPenToSquare
  faPlus = faPlus
  lupa = faMagnifyingGlass
  buscar = false
  listPets: Pet[] = []

  constructor (private _petService: MascotaService) {
    this.getMascotas()
  }

  getMascotas(){
    this._petService.getAllPets().subscribe(data => {
      this.listPets = data
    })
  }

  Buscar(){
    this.buscar = true
  }
}
