import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare, faPlus, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { MascotaService } from '../../services/mascota.service';
import { Pet, msg } from '../../interfaces/pet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascota',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FontAwesomeModule],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.css'
})
export class MascotaComponent{
  faTrash = faTrash
  faPenToSquare = faPenToSquare
  faPlus = faPlus
  lupa = faMagnifyingGlass
  buscar = false
  listPets: Pet[] = []
  private router: Router = inject(Router)

  constructor (private _petService: MascotaService) {
    this.getMascotas()
  }


  getMascotas(){
    this._petService.getAllPets().subscribe((data) => {
      if (Array.isArray(data)) {
        this.listPets = data
      } else {
          this.listPets = []
        }
    })  
  }

  Buscar(){
    this.buscar = true
  }

  mostrarForm(id: string){
    this.router.navigate([`mascota/formulario/${id}`])
  }
  eliminarMascota(id:string) {
    this._petService.deletePet(id).subscribe(() => {
      this.getMascotas()
    })
  }
}
