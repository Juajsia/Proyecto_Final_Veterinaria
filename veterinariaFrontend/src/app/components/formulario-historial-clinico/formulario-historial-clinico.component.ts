import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { faArrowLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoriaClinicaService } from '../../services/historia-clinica.service';
import { ToastrService } from 'ngx-toastr';
import { HistoriaClinica } from '../../interfaces/historiaClinica';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-formulario-historial-clinico',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, FormsModule],
  templateUrl: './formulario-historial-clinico.component.html',
  styleUrl: './formulario-historial-clinico.component.css'
})
export class FormularioHistorialClinicoComponent {
  guardar = faFloppyDisk
  cancelar = faArrowLeft

  textRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/
  numberRegex = /^\d+(\.\d{1,2})?$/
  cedRegex = /^[0-9]\d{7,9}$/

  form =  new FormGroup({
    Motivo: new FormControl('', Validators.required),
    Sintomatologia: new FormControl('', Validators.required),
    Diagnostico: new FormControl('', Validators.required),
    //Procedimiento: new FormControl('', Validators.required),
    MedicamentosAlergia: new FormControl(''),
    //NombreMascota: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    CedulaDueño: new FormControl('', [Validators.required, Validators.pattern(this.cedRegex)]),
    IdVeterinario: new FormControl('', [Validators.required, Validators.pattern(this.cedRegex)]),
    NombreVacunas: new FormControl(''),
  })

  id: number
  idMascota: string
  nombre: string
  operacion: string = 'Agregar '
  ProcedimientoSeleccionado: string = ''
  isEditable = true
  orden = false
  private router: Router = inject(Router)

  constructor(private _HistoriaClinicaService: HistoriaClinicaService, private aRouter: ActivatedRoute, private toastr: ToastrService){
    this.id = Number(aRouter.snapshot.paramMap.get('id'))!
    this.idMascota = localStorage.getItem('idMascota')!
    this.nombre = localStorage.getItem('nombre')!
  }

  ngOnInit(): void {
    if (this.id != 0){
      this.operacion = 'Editar '
      this.isEditable = false
      this.getHistoriaClinica(this.id)
    } else {
      this.isEditable = true
    }
  }

  CUHistoriaClinica(){
    console.log(this.form.value.NombreVacunas!.split(','))
    const HistoriaClinica: HistoriaClinica = {
      Motivo: this.form.value.Motivo!,
      Sintomatologia: this.form.value.Sintomatologia!,
      Diagnostico: this.form.value.Diagnostico!,
      Procedimiento: this.ProcedimientoSeleccionado,
      MedicamentosAlergia: this.form.value.MedicamentosAlergia!,
      NombreMascota: this.nombre!,
      CedulaDueño: Number(this.form.value.CedulaDueño!),
      IdVeterinario: Number(this.form.value.IdVeterinario!),
      NombreVacunas: this.form.value.NombreVacunas!.split(','),
    }

    if(this.id != 0){ //editar
      HistoriaClinica.IdHistoria_Clinica = this.id
      this._HistoriaClinicaService.updateHistoriaClinica(this.id, HistoriaClinica).subscribe({
        next: () => {
        console.log('HistoriaClinica agregada')
        this.volver()
        this.toastr.info(`Registro con procedimiento ${HistoriaClinica.Procedimiento} y motivo ${HistoriaClinica.Motivo} actualizado con éxito!`, 'Registro de historia clinica actualizada')
      }, error: (e: HttpErrorResponse) => {
        this.toastr.error(`No se pudo Actualizar la Historia Clinica: Asegurese de ingresar los datos Adecuadamente`, 'Error Actualizando Historia Clinica')
      }
    })
    } else {  //crear
      console.log('crear')
      this._HistoriaClinicaService.agregar(HistoriaClinica).subscribe( {
        next:() => {
        console.log('Historia Clinica actualizada')
        this.volver()
        this.toastr.success(`Registro con procedimiento ${HistoriaClinica.Procedimiento} y motivo ${HistoriaClinica.Motivo} creado Con Exito!`, 'Registro de historia clinica creado con éxito')
      }, error: (e: HttpErrorResponse) => {
        this.toastr.error(`No se pudo Crear la Historia Clinica: Asegurese de ingresar los datos Adecuadamente`, 'Error Cerando Historia Clinica')
      }
    })
    }
  }

  getHistoriaClinica(id: number){
    this._HistoriaClinicaService.getById(id).subscribe((res: HistoriaClinica[]) => {
      const data = res[0]
      // console.log(data)
      const NombreVacunas = data.NombreVacunas || ''

      this.form.setValue({
        Motivo: data.Motivo,
        Sintomatologia: data.Sintomatologia,
        Diagnostico: data.Diagnostico,
        //Procedimiento: data.Procedimiento,
        MedicamentosAlergia: data.MedicamentosAlergia,
        CedulaDueño: String(data.CedulaDueño),
        IdVeterinario: String(data.IdVeterinario),
        NombreVacunas: NombreVacunas.toString(),
      })
    })
  }

  volver(){
    this.router.navigate([`/mascota/historialClinico/${this.idMascota}`])
    localStorage.removeItem('nombre')
    localStorage.removeItem('idMascota')
  }  

  capturarProcedimiento(event: Event): void {
    const valorSeleccionado = (event.target as HTMLSelectElement).value;
    this.ProcedimientoSeleccionado = valorSeleccionado
    // console.log(valorSeleccionado);
  }

  click(){
    console.log('click')
  }
}
