import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare, faPlus, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { MascotaService } from '../../services/mascota.service';
import { Pet } from '../../interfaces/pet';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mascota',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FontAwesomeModule, FormsModule],
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

  constructor (private _petService: MascotaService, private toastr: ToastrService) {
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
  eliminarMascota(id:string, Nombre: string) {
    this._petService.deletePet(id).subscribe(() => {
      this.getMascotas()
      this.toastr.warning(`Mascota ${Nombre} Eliminada con Exito!`, 'Mascota Eliminada')
    })
  }
  filtarNombre: string = ''
  filtarCed: string = ''
  filtrarMascota(): void{
    const filteredListPet: Pet[] = []
    if(this.filtarCed === '' && this.filtarNombre === ''){
      this.getMascotas()
    }
    if (this.filtarCed !== '' && this.filtarNombre === '') {
      this.listPets.forEach(item => {
        if(String(item.IdDuenio) == this.filtarCed){
          filteredListPet.push(item)
        }
      });
      this.listPets = filteredListPet
    }
    if (this.filtarCed === '' && this.filtarNombre !== '') {
      this.listPets.forEach(item => {
        if(item.Nombre == this.filtarNombre){
          filteredListPet.push(item)
        }
      });
      this.listPets = filteredListPet
    }
    if (this.filtarCed !== '' && this.filtarNombre !== '') {
      this.listPets.forEach(item => {
        if(item.Nombre == this.filtarNombre && String(item.IdDuenio) == this.filtarCed){
          filteredListPet.push(item)
        }
      });
      this.listPets = filteredListPet
    }
    this.filtarNombre = ''
    this.filtarCed = ''
    return
  }
}
