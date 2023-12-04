import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { faTrash, faPenToSquare, faPlus, faMagnifyingGlass , faXmark} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { Persona } from '../../interfaces/persona';
import { PersonaService } from '../../services/persona.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FontAwesomeModule, FormsModule],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css'
})
export class PersonaComponent {
  faTrash = faTrash
  faPenToSquare = faPenToSquare
  faPlus = faPlus
  lupa = faMagnifyingGlass
  buscar = false
  cerrar = faXmark
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

  mostrarForm(id: number){
    this.router.navigate([`persona/formulario/${id}`])
  }

  filtrarCed: string = ''
  filtrado = false
  filtrarPersona() :void {
    if(this.filtrarCed === '') {
      this.getPersonas()
      this.filtrado = false
    } else {
      const Personafiltrada = this.listPerson.find(d => d.cedula === Number(this.filtrarCed))
      this.listPerson = []
      if(Personafiltrada !== undefined){
        this.listPerson.push(Personafiltrada)
        this.filtrado = true
      }
    }
    this.filtrarCed = ''
  }
}
