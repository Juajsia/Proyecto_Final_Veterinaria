import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup,FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonaService } from '../../services/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../../interfaces/persona';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-formulario-persona',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, FormsModule],
  templateUrl: './formulario-persona.component.html',
  styleUrl: './formulario-persona.component.css'
})
export class FormularioPersonaComponent {
  guardar = faFloppyDisk
  cancelar = faArrowLeft

  textRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/
  numberRegex = /^\d+(\.\d{1,2})?$/
  cedRegex = /^[0-9]\d{7,9}$/

  form =  new FormGroup({
    cedula: new FormControl('', [Validators.required, Validators.pattern(this.cedRegex)]),
    Primer_nombre: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    Segundo_nombre: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    Primer_Apellido: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    Segundo_Apellido: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    edad: new FormControl('', [Validators.required, Validators.pattern(this.numberRegex)])
  })

  id: number
  operacion: string = 'Agregar '
  rolSeleccionado: string = ''
  isEditable = true
  private router: Router = inject(Router)

  constructor(private _personaService: PersonaService, private aRouter: ActivatedRoute, private toastr: ToastrService){
    this.id = Number(aRouter.snapshot.paramMap.get('id'))!
    // console.log(this.id)
  }

  ngOnInit(): void {
    if (this.id != 0){
      this.operacion = 'Editar '
      this.isEditable = false
      this.getPersona(this.id)
    } else {
      this.isEditable = true
    }
  }

  CUPersona(){
    // console.log(this.form)
    // console.log(this.rolSeleccionado)
    const persona: Persona = {
    cedula: Number(this.form.value.cedula!),
    Primer_nombre: this.form.value.Primer_nombre!,
    Segundo_nombre: this.form.value.Segundo_nombre!,
    Primer_Apellido: this.form.value.Primer_Apellido!,
    Segundo_Apellido: this.form.value.Segundo_Apellido!,
    edad: Number(this.form.value.edad!),
    IdRol: Number(this.rolSeleccionado),
    }

    // console.log("per.rol: " + persona.IdRol)

    if(this.id != 0){ //editar
      persona.cedula = this.id
      this._personaService.updatePersona(this.id, persona).subscribe({
        next: () => {
        console.log('Persona agregada')
        this.volver()
        this.toastr.info(`Persona ${persona.Primer_Apellido} Actualizada Con Exito!`, 'Persona Actualizada')
      }, error: (e: HttpErrorResponse) => {
        this.toastr.error(`No se pudo Actualizar la Persona: Asegurese de ingresar los datos Adecuadamente`, 'Error Actualizando Persona')
      }
    })
    } else {  //crear
      this._personaService.agregar(persona).subscribe( {
        next:() => {
        // console.log('Persona agregada')
        this.volver()
        this.toastr.success(`Persona ${persona.Primer_Apellido} Creada Con Exito!`, 'Persona Creada')
      }, error: (e: HttpErrorResponse) => {
        this.toastr.error(`No se pudo Crear la Persona: Asegurese de ingresar los datos Adecuadamente`, 'Error Cerando Persona')
      }
    })
    }
  }

  getPersona(id: number){
    this._personaService.getById(id).subscribe((res: Persona[]) => {
      const data = res[0]
      // console.log(data)
      this.form.setValue({
        cedula: String(data.cedula),
        Primer_nombre: data.Primer_nombre,
        Segundo_nombre: data.Segundo_nombre,
        Primer_Apellido: data.Primer_Apellido,
        Segundo_Apellido: data.Segundo_Apellido,
        edad: String(data.edad)
      })
    })
  }

  volver(){
    this.router.navigate(['persona'])
  }  

  capturarRol(event: Event): void {
    const valorSeleccionado = (event.target as HTMLSelectElement).value;
    this.rolSeleccionado = valorSeleccionado
    // console.log(valorSeleccionado);
  }
}
