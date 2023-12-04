import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { faArrowLeft, faMagnifyingGlass, faPenToSquare, faPlus, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { HistoriaClinica } from '../../interfaces/historiaClinica';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HistoriaClinicaService } from '../../services/historia-clinica.service';
import { ToastrService } from 'ngx-toastr';
import { MascotaService } from '../../services/mascota.service';

@Component({
  selector: 'app-historial-clinico',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FontAwesomeModule, FormsModule, RouterLink],
  templateUrl: './historial-clinico.component.html',
  styleUrl: './historial-clinico.component.css'
})
export class HistorialClinicoComponent {
  faTrash = faTrash
  faPenToSquare = faPenToSquare
  faPlus = faPlus
  lupa = faMagnifyingGlass
  cerrar = faXmark
  cancelar = faArrowLeft
  buscar = false
  filtrado = false
  listHistCli: HistoriaClinica[] = []
  idMascota: string = ''
  nombre: string = localStorage.getItem('nombre')!
  private router: Router = inject(Router)

  constructor (private _HistoriaClinicaService: HistoriaClinicaService, private _petService: MascotaService, private aRouter: ActivatedRoute, private toastr: ToastrService) {
    this.idMascota = aRouter.snapshot.paramMap.get('id')!
    this.getHistoriaClinica(this.idMascota)
    this._petService.getById(this.idMascota).subscribe((data) => {
      this.nombre = data[0].Nombre
    })
  }


  getHistoriaClinica(idMascota: string){
    this._HistoriaClinicaService.getByPetId(idMascota).subscribe((data) => {
      if (Array.isArray(data)) {
        this.listHistCli = data        
      } else {
          this.listHistCli = []
      }
      console.log(this.listHistCli)
    })  
  }

  Buscar(){
    this.buscar = true
  }

  mostrarForm(id: number, idMascota: string){
    this.router.navigate([`mascota/historialClinico/formulario/${id}`])
    localStorage.setItem('idMascota', idMascota)
    localStorage.setItem('nombre', this.nombre)
  }
  eliminarRegistro(id:number, NombreMascota: string, Procedimiento: string) {
    this._HistoriaClinicaService.deleteHistoriaClinica(id).subscribe(() => {
      this.getHistoriaClinica(this.idMascota)
      this.toastr.warning(`Registro de mascota ${NombreMascota}  y procedimiento ${Procedimiento} Eliminado con Exito!`, 'Registro Eliminado')
    })
  }

  filtrarFecha: string = ''
  filtarIdVet: number = 0
  filtrarHisCli(): void{
    console.log(this.filtrarFecha, this.filtarIdVet)
    if (this.filtrado){ //llenar la lista de nuevo si ya fue filtrada
      this.getHistoriaClinica(this.idMascota)
      this.filtrado = false
    }  
    const filteredlistHistCli: HistoriaClinica[] = []
    if(this.filtarIdVet === 0 && this.filtrarFecha === ''){
      this.getHistoriaClinica(this.idMascota)
    }
    if (this.filtarIdVet !== 0 && this.filtrarFecha === '') {
      this.listHistCli.forEach(item => {
        if(Number(item.IdVeterinario) == this.filtarIdVet){
          filteredlistHistCli.push(item)
        }
      });
      this.listHistCli = filteredlistHistCli
      this.filtrado = true
    }
    if (this.filtarIdVet === 0 && this.filtrarFecha !== '') {
      this.listHistCli.forEach(item => {
        const fecha = this.FormatoFecha(String(item.Fecha))
        console.log(fecha)
        if(fecha == this.filtrarFecha){
          filteredlistHistCli.push(item)
        }
      });
      this.listHistCli = filteredlistHistCli
      this.filtrado = true
    }
    if (this.filtarIdVet !== 0 && this.filtrarFecha !== '') {
      this.listHistCli.forEach(item => {
        if(item.Fecha == this.filtrarFecha && Number(item.IdVeterinario) == this.filtarIdVet){
          filteredlistHistCli.push(item)
        }
      });
      this.listHistCli = filteredlistHistCli
      this.filtrado = true
    }
    this.filtrarFecha = ''
    this.filtarIdVet = 0
    return
  }

  FormatoFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    const formatoDeseado: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'America/New_York',
    };
  
    return fecha.toLocaleString('es-ES', formatoDeseado);
  }

  volver(){
    this.router.navigate(['mascota'])
    }
}
