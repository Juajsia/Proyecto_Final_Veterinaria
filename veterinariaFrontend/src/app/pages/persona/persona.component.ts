import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { faTrash, faPenToSquare, faPlus, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { Persona } from '../../interfaces/persona';
import { PersonaService } from '../../services/persona.service';
import { ToastrService } from 'ngx-toastr';

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
  private router: Router = inject(Router)
  listPerson: Persona[] = []
  listAdmin: Persona[] = []
  listVeterinario: Persona[] = []
  listVendedor: Persona[] = []
  listDuenio: Persona[] = []

  constructor(private _personService: PersonaService, private toastr: ToastrService) {
    this.getPersonas()
  }

  filtrarRol(){
    this.listAdmin = []
    this.listVeterinario = []
    this.listVendedor = []
    this.listDuenio = []
    this.listPerson.forEach(item => {
      switch (item.IdRol) {
        case 1:
          this.listAdmin.push(item)
          break;
        case 2:
          this.listVeterinario.push(item)
          break;
        case 3:
          this.listVendedor.push(item)
          break;
        case 4:
          this.listDuenio.push(item)
          break;
      
        default:
          break;
      }
    });
  }

  getPersonas() {
    this._personService.getAllPerson().subscribe(data => {
      if (Array.isArray(data)) {
        this.listPerson = data
      } else {
          this.listPerson = []
        }
        this.filtrarRol()
    })
  }

  eliminarPersona(id:number, Nombre: string){
    console.log(id)
    this._personService.deletePerson(id).subscribe(()=>{
      this.getPersonas()
      this.toastr.warning(`Persona ${Nombre} Eliminada con Exito!`, 'Persona Eliminada')
    })
  }

  Buscar(){
    this.buscar = true
  }

   mostrarForm(){
    this.router.navigate(['persona/formulario'])
  }
}
