import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare, faPlus, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { HistorialVacuna } from '../../interfaces/historialVacuna';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialVacunaService } from '../../services/historial-vacuna.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-historial-vacuna',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FontAwesomeModule, FormsModule],
  templateUrl: './historial-vacuna.component.html',
  styleUrl: './historial-vacuna.component.css'
})
export class HistorialVacunaComponent {
  faTrash = faTrash
  faPenToSquare = faPenToSquare
  faPlus = faPlus
  lupa = faMagnifyingGlass
  buscar = false
  listHistorialVacunas: HistorialVacuna[] = []
  listHistorialVacunasfiltrado: HistorialVacuna[] = []
  private router: Router = inject(Router)
  id: string
  constructor (private _historialVacunaService: HistorialVacunaService, private toastr: ToastrService, private aRouter: ActivatedRoute) {
    this.id = aRouter.snapshot.paramMap.get('id')!
    this.getHistorialVacuna()
  }
  
  
  getHistoriasfiltradas() {
    console.log(this.id)
    console.log(this.listHistorialVacunas)
  }

  getHistorialVacuna(){
    this._historialVacunaService.getAllHistorialVacuna().subscribe((data) => {
      if (Array.isArray(data)) {
        this.listHistorialVacunas = data.reverse()

        this.listHistorialVacunas.forEach(element => {
          if (element.IdMascota === this.id) {
            this.listHistorialVacunasfiltrado.push(element)
          }
        });
      } else {
          this.listHistorialVacunas = []
          this.listHistorialVacunasfiltrado = []
        }
    })  
  }

  Buscar(){
    this.buscar = true
  }

  mostrarForm(id: number){
    // this.router.navigate([`mascota/formulario/${id}`])
  }

  eliminarMascota(id:number) {
    this._historialVacunaService.deleteHistorialVacuna(String(id)).subscribe(() => {
      this.getHistorialVacuna()
      this.toastr.warning(`Historial de Vacuna Eliminada con Exito!`, 'Historial Eliminado')
    })
  }

  filtarNombre: string = ''
  filtarCed: string = ''
  filtrar () {

  }
}
